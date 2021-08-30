using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using ProcessM.NET.ConformanceChecking.Alignments;
using ProcessM.NET.Discovery.HeuristicMiner;
using ProcessM.NET.Import;
using ProcessM.NET.Model;
using ProcessM.NET.Model.CausalNet;
using ProcessM.NET.Model.DataAnalysis;

namespace ProcessM.NETtests
{
    [TestClass] 
    public class AlignmentOnLogTests : TestBase
    {
        [TestMethod]
        public void AlignmentOnLogEasy()
        {
            // Arrange
            using FileStream fs = File.Open(heuristicCsv, FileMode.Open);
            ImportedEventLog elog = CSVImport.MakeDataFrame(fs);
            elog.SetActivity("act");
            elog.SetCaseId("id");
            WorkflowLog wlog = new WorkflowLog(elog);
            var pNet = CNetUtils.ConvertCNetToPetriNet(HeuristicMiner.MineCNet(wlog));

            // Act
            AlignmentOnLog alignment = new AlignmentOnLog(wlog, pNet);

            // Assert
            Assert.IsTrue(alignment.Fitness >= 0.96);
            Assert.AreEqual(wlog.GetTracesWithOccurrence().Count, alignment.AlignmentsOnLog.Count);
        }

        [TestMethod]
        public void AlignmentOnLogHard()
        {
            // Arrange
            using FileStream fs = File.Open(hardCsv, FileMode.Open);
            ImportedEventLog elog = CSVImport.MakeDataFrame(fs);
            elog.SetActivity("act");
            elog.SetCaseId("id");
            WorkflowLog wlog = new WorkflowLog(elog);
            var pNet = CNetUtils.ConvertCNetToPetriNet(HeuristicMiner.MineCNet(wlog));

            // Act
            AlignmentOnLog alignment = new AlignmentOnLog(wlog, pNet);

            // Assert
            //All traces fits
            Assert.IsTrue(alignment.Fitness == 1);
            Assert.AreEqual(wlog.GetTracesWithOccurrence().Count, alignment.AlignmentsOnLog.Count);
        }

        [TestMethod]
        public void AlignmentOnLogHardCustomSettings()
        {
            // Arrange
            using FileStream fs = File.Open(hardCsv, FileMode.Open);
            ImportedEventLog elog = CSVImport.MakeDataFrame(fs);
            elog.SetActivity("act");
            elog.SetCaseId("id");
            WorkflowLog wlog = new WorkflowLog(elog);
            var pNet = CNetUtils.ConvertCNetToPetriNet(HeuristicMiner.MineCNet(wlog, new HeuristicMinerSettings(){L2LThreshold = 1}));

            // Act
            AlignmentOnLog alignment = new AlignmentOnLog(wlog, pNet);

            // Assert
            // Now all traces doesn't fit, because L2L loop (B->C->B) is removed
            Assert.IsTrue(alignment.Fitness < 1);
            Assert.AreEqual(wlog.GetTracesWithOccurrence().Count, alignment.AlignmentsOnLog.Count);
        }
    }
}
