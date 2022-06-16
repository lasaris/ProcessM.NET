using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using ProcessM.NET.ConformanceChecking.Alignments;
using ProcessM.NET.Discovery.HeuristicMiner;
using ProcessM.NET.Import;
using ProcessM.NET.Model;
using ProcessM.NET.Model.BasicPetriNet;
using ProcessM.NET.Model.CausalNet;
using ProcessM.NET.Model.DataAnalysis;

namespace ProcessM.NETtests
{
    [TestClass]
    public class AlignmentOnTraceTests : TestBase
    {
        [TestMethod]
        public void AlignmentOnTraceEasy()
        {
            // Arrange
            using FileStream fs = File.Open(heuristicCsv, FileMode.Open);
            ImportedEventLog elog = CSVImport.MakeDataFrame(fs);
            elog.SetActivity("act");
            elog.SetCaseId("id");
            WorkflowLog wlog = new WorkflowLog(elog);
            PetriNet pNet = CNetUtils.ConvertCNetToPetriNet(HeuristicMiner.MineCNet(wlog));

            // Act
            // trace "AE" -> Doesn't fit
            var traceAlignment1 = new AlignmentOnTrace(wlog.WorkflowTraces[0], pNet);
            // trace "ACBE" fits perfectly
            var traceAlignment2 = new AlignmentOnTrace(wlog.WorkflowTraces[10], pNet);

            // Assert
            Assert.AreEqual(0.8, traceAlignment1.Fitness);
            Assert.AreEqual(1, traceAlignment1.OptimalCost);
            Assert.AreEqual(1, traceAlignment2.Fitness);
            Assert.AreEqual(0, traceAlignment2.OptimalCost);
        }

        [TestMethod]
        public void AlignmentOnTraceHard()
        {
            // Arrange
            using FileStream fs = File.Open(hardCsv, FileMode.Open);
            ImportedEventLog elog = CSVImport.MakeDataFrame(fs);
            elog.SetActivity("act");
            elog.SetCaseId("id");
            WorkflowLog wlog = new WorkflowLog(elog);
            PetriNet pNet = CNetUtils.ConvertCNetToPetriNet(HeuristicMiner.MineCNet(wlog));

            // Act (EACH TRACE FITS TO THE MODEL)
            foreach (var trace in wlog.WorkflowTraces)
            {
                var alignment = new AlignmentOnTrace(trace, pNet);
                //Assert
                Assert.AreEqual(1, alignment.Fitness);
                Assert.AreEqual(0, alignment.OptimalCost);
            }
        }

        [TestMethod]
        public void AlignmentOnTraceHardNoL2LLoop()
        {
            // Arrange
            using FileStream fs = File.Open(hardCsv, FileMode.Open);
            ImportedEventLog elog = CSVImport.MakeDataFrame(fs);
            elog.SetActivity("act");
            elog.SetCaseId("id");
            WorkflowLog wlog = new WorkflowLog(elog);
            PetriNet pNet = CNetUtils.ConvertCNetToPetriNet(HeuristicMiner.MineCNet(wlog, new HeuristicMinerSettings(){L2LThreshold = 1}));

            // Act unfitting trace abcbcdfgi (deleted L2L loop B->C->B)
            var alignment = new AlignmentOnTrace(wlog.WorkflowTraces[61], pNet);

            // Assert 
            Assert.AreEqual(0.875, alignment.Fitness);
            // two moves (model and trace) for B and one for C
            Assert.AreEqual(2, alignment.OptimalCost);

        }
    }
}
