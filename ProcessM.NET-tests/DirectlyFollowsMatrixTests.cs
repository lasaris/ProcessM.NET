using Microsoft.VisualStudio.TestTools.UnitTesting;
using ProcessM.NET.Discovery.Heuristic_Miner;
using ProcessM.NET.Import;
using ProcessM.NET.Model;
using ProcessM.NET.Model.DataAnalysis;
using System;
using System.IO;
using ProcessM.NET.Model.CausalNet;

namespace ProcessM.NETtests
{


    [TestClass]
    public class DirectlyFollowsMatrixTests
    {
        //TODO
        static readonly string workingDirectory = Environment.CurrentDirectory;
        static readonly string projectDirectory = Directory.GetParent(workingDirectory).Parent.Parent.FullName;

        static readonly string separator = System.IO.Path.DirectorySeparatorChar.ToString();
        readonly string heuristicCsv = projectDirectory + separator + "Files" + separator + "heuristic.csv";
        readonly string easyCsv = projectDirectory + separator + "Files" + separator + "alpha2.csv";
        
        [TestMethod]
        public void test() {
            ImportedEventLog elog = CSVImport.MakeDataFrame(heuristicCsv);
            elog.SetActivity("act");
            elog.SetCaseId("id");
            WorkflowLog wlog = new WorkflowLog(elog);
            var a = new DirectlyFollowsMatrix(wlog);
            var b = new DependencyMatrix(a);
            var c = new DependencyGraph(a);
            var cnet = new CNet(wlog, 2, 0.7f, 2, 4);
        }
    }
}
