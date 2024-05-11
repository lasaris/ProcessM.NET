using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using LogImport.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using ProcessM.NET.ConformanceChecking.Alignments;
using ProcessM.NET.Discovery.Alpha;
using ProcessM.NET.Discovery.HeuristicMiner;
using ProcessM.NET.Import;
using ProcessM.NET.Model;
using ProcessM.NET.Model.BasicPetriNet;
using ProcessM.NET.Model.CausalNet;
using ProcessM.NET.Model.DataAnalysis;

namespace ProcessM.NETtests
{


    [TestClass]
    public class AlignmentUtilsTests : TestBase
    {
        private WorkflowTrace MakeTrace()
        {
            // Arrange
            WorkflowTrace trace = new WorkflowTrace("1");
            trace.AddActivities(new List<string> { "act1", "act2", "act3", "act4", "act5" });
            return trace;
        }

        [TestMethod]
        public void MakePetriNetFromTraceTest()
        {
            // Act
            var traceNet = AlignmentUtils.MakePNetFromTrace(MakeTrace());

            // Asserts
            Assert.AreEqual("p0'", traceNet.StartPlace.Id);
            Assert.AreEqual("p5'", traceNet.EndPlace.Id);
            Assert.AreEqual(6, traceNet.Places.Count);
            Assert.AreEqual(5, traceNet.Transitions.Count);
            //EACH TRANSITION HAS 1 INPUT AND OUTPUT
            foreach (var t in traceNet.Transitions)
            {
                Assert.AreEqual(1, t.InputPlaces.Count);
                Assert.AreEqual(1, t.OutputPlaces.Count);
            }
        }

        [TestMethod]
        public void ComputeWorstAlignmentOnTrace()
        {
            // Act
            var trace = MakeTrace();

            //DEFAULT TRACE COST
            Assert.AreEqual(5, AlignmentUtils.ComputeWorstCostOfTrace(trace));
            //MODIFIED TRACE COST
            Assert.AreEqual(10, AlignmentUtils.ComputeWorstCostOfTrace(trace, 2));
        }

        [TestMethod]
        public void ComputeWorstAlignmentOnEasyModel()
        {
            // Arrange
            using FileStream fs = File.Open(heuristicCsv, FileMode.Open);
            ImportedEventLog elog = CSVImport.MakeDataFrame(fs);
            elog.Activity = heuristicCsvActivity;
            elog.CaseId = heuristicCsvCaseId;
            WorkflowLog wlog = new WorkflowLog(elog);
            PetriNet petriNet = CNetUtils.ConvertCNetToPetriNet(HeuristicMiner.MineCNet(wlog));

            // Act
            var cost = AlignmentUtils.ComputeWorstCostOfModel(petriNet, 1);

            // Assert
            Assert.AreEqual(3, cost);
        }

        [TestMethod]
        public void ComputeWorstAlignmentOnHardModel()
        {
            // Arrange
            using FileStream fs = File.Open(hardCsv, FileMode.Open);
            ImportedEventLog elog = CSVImport.MakeDataFrame(fs);
            elog.Activity = hardCsvActivity;
            elog.CaseId = hardCsvCaseId;
            WorkflowLog wlog = new WorkflowLog(elog);
            PetriNet petriNet = CNetUtils.ConvertCNetToPetriNet(HeuristicMiner.MineCNet(wlog));

            // Act
            var cost = AlignmentUtils.ComputeWorstCostOfModel(petriNet, 1);

            // Assert
            Assert.AreEqual(7, cost);
        }
    }
}
