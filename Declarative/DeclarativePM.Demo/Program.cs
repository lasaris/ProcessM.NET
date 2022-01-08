using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using DeclarativePM.Lib.Discovery;
using DeclarativePM.Lib.Enums;
using DeclarativePM.Lib.IO.Export;
using DeclarativePM.Lib.IO.Import;
using DeclarativePM.Lib.Models.DeclareModels;
using DeclarativePM.Lib.Utils;

namespace DeclarativePM.Demo
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            var pathSeparator = Path.DirectorySeparatorChar;
            var sampleDataLocation = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location) + pathSeparator +
                                     ".."
                                     + pathSeparator + ".." + pathSeparator + ".." + pathSeparator + ".."
                                     + pathSeparator + "SampleData";

            var pathToLog = $"{sampleDataLocation}{pathSeparator}logs{pathSeparator}importLogTest.csv";

            //Instantiate workers
            CsvLogImporter logImporter = new();
            Discovery discovery = new();
            ConformanceEvaluator conformanceEvaluator = new();
            JsonModelExporter jsonModelExporter = new();
            JsonModelImporter jsonModelImporter = new();
            ConstraintEvaluator constraintEvaluator = new();

            //To import log from csv, you can use method LoadLog from CsvLogImporter 
            var importedEventLog = logImporter.LoadLog(pathToLog);

            //You can read headers from imported log
            var thirdColumnHeader = importedEventLog.Headers[2];

            //You can set different case types to different columns using their header.
            //Note that case and activity are obligatory 
            importedEventLog.ChangeTimestamp(thirdColumnHeader);

            //After successfully set all column types, build the log
            var eventLog = importedEventLog.BuildEventLog("Test log");

            //Set the templates which you would like to discover from the log
            var templatesToDiscover = new List<ParametrizedTemplate>();

            var exactly = new ParametrizedTemplate(TemplateInstanceType.Existence, 90, 90);
            var respondedExistence = new ParametrizedTemplate(TemplateInstanceType.RespondedExistence);
            var notChainSuccession = new ParametrizedTemplate(TemplateInstanceType.NotChainSuccession);

            templatesToDiscover.Add(exactly);
            templatesToDiscover.Add(respondedExistence);
            templatesToDiscover.Add(notChainSuccession);

            //To discover log, you can use method DiscoverModel from Discovery.cs
            //Note that the method has multiple overrides and you do not have to provide 
            //list of templates, in such case all of them will be discovered
            var model = discovery.DiscoverModel(eventLog, templatesToDiscover);

            var longestTrace = eventLog.GetAllTraces()
                .Aggregate((t1, t2) => t1.Count > t2.Count ? t1 : t2);

            //Different constraints are saved in list of instances of corresponding template
            var reExistence = respondedExistence.TemplateInstances[1];

            //You can use method EvaluateConstraint from ConstraintEvaluator.cs which
            //checks compliance of the trace with provided constraint
            if (constraintEvaluator.EvaluateConstraint(longestTrace, reExistence))
                Console.WriteLine($"longest trace is compliant with responded existence constraint {reExistence}");

            //You can use method EvaluateTrace from ConformanceEvaluator.cs to conform check the trace
            //with respect to some Declare model
            //Note that you can also conform check with respect to a given template or just a constraint
            var traceEvaluation = conformanceEvaluator.EvaluateTrace(model, longestTrace);

            //Trace evaluation also consists of health indicators
            if (traceEvaluation.Healthiness.FulfillmentRation > 0.95)
                Console.WriteLine("Trace is healthy");

            //Export model into json can be done using method ExportModel from JsonModelExporter.cs
            var jsonModel = jsonModelExporter.ExportModel(model);

            //Import model from json can be done using method LoadModelFromString from JsonModelExporter.cs
            //Note that you can also provide path to the file in your system
            var importedModel = jsonModelImporter.LoadModelFromString(jsonModel);
        }
    }
}