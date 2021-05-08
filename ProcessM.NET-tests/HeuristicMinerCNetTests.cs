using System;
using System.IO;
using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using ProcessM.NET.Discovery.HeuristicMiner;
using ProcessM.NET.Import;
using ProcessM.NET.Model;
using ProcessM.NET.Model.CausalNet;
using ProcessM.NET.Model.DataAnalysis;

namespace ProcessM.NETtests
{
    [TestClass]
    public class HeuristicMinerCNetTests : TestBase
    {
        [TestMethod]
        public void MakeCNetEasyDefaultSettings()
        {
            // Arrange
            ImportedEventLog elog = CSVImport.MakeDataFrame(heuristicCsv);
            elog.SetActivity("act");
            elog.SetCaseId("id");
            WorkflowLog wlog = new WorkflowLog(elog);
            var successorMatrix = new SuccessorMatrix(wlog);

            // Act
            CNet causalNet = HeuristicMiner.MineCNet(wlog);

            // Assert
            Assert.AreEqual(0, causalNet.StartActivity.Id);
            Assert.AreEqual(1, causalNet.EndActivity.Id);
            //ACTIVITY OCCURRENCE
            Assert.AreEqual(5, causalNet.Activities.Count);
            Assert.AreEqual(40, causalNet.Activities[0].Frequency);
            Assert.AreEqual(40, causalNet.Activities[1].Frequency);
            Assert.AreEqual(21, causalNet.Activities[2].Frequency);
            Assert.AreEqual(21, causalNet.Activities[3].Frequency);
            Assert.AreEqual(17, causalNet.Activities[4].Frequency);
            //Number of bindings
            Assert.AreEqual(0, causalNet.InputBindings[0].Count);
            Assert.AreEqual(4, causalNet.InputBindings[1].Count);
            Assert.AreEqual(1, causalNet.InputBindings[2].Count);
            Assert.AreEqual(1, causalNet.InputBindings[3].Count);
            Assert.AreEqual(1, causalNet.InputBindings[4].Count);
            Assert.AreEqual(4, causalNet.OutputBindings[0].Count);
            Assert.AreEqual(0, causalNet.OutputBindings[1].Count);
            Assert.AreEqual(1, causalNet.OutputBindings[2].Count);
            Assert.AreEqual(1, causalNet.OutputBindings[3].Count);
            Assert.AreEqual(1, causalNet.OutputBindings[4].Count);

            //A&B BIND FREQUENCY
            Assert.AreEqual(20, causalNet.OutputBindings[0].First(u => u.Activities.Count == 2).Frequency);
            Assert.AreEqual(20, causalNet.InputBindings[1].First(b => b.Activities.Count == 2).Frequency);
        }

        [TestMethod]
        public void MakeCNetEasyCustomSettings()
        {
            // Arrange
            ImportedEventLog elog = CSVImport.MakeDataFrame(heuristicCsv);
            elog.SetActivity("act");
            elog.SetCaseId("id");
            WorkflowLog wlog = new WorkflowLog(elog);
            var successorMatrix = new SuccessorMatrix(wlog);

            // Act
            HeuristicMinerSettings settings = new HeuristicMinerSettings
            {
                DependencyThreshold = 0.7, RelativeToBestThreshold = 0.15, L1LThreshold = 0.7
            };
            CNet causalNet = HeuristicMiner.MineCNet(wlog, settings);

            // Assert
            Assert.AreEqual(0, causalNet.StartActivity.Id);
            Assert.AreEqual(1, causalNet.EndActivity.Id);
            //ACTIVITY OCCURRENCE
            Assert.AreEqual(5, causalNet.Activities.Count);
            Assert.AreEqual(40, causalNet.Activities[0].Frequency);
            Assert.AreEqual(40, causalNet.Activities[1].Frequency);
            Assert.AreEqual(21, causalNet.Activities[2].Frequency);
            Assert.AreEqual(21, causalNet.Activities[3].Frequency);
            Assert.AreEqual(17, causalNet.Activities[4].Frequency);
            //Number of bindings
            Assert.AreEqual(0, causalNet.InputBindings[0].Count);
            //NEW ARC A->C
            Assert.AreEqual(5, causalNet.InputBindings[1].Count);
            Assert.AreEqual(1, causalNet.InputBindings[2].Count);
            Assert.AreEqual(1, causalNet.InputBindings[3].Count);
            //NEW ARC D->D
            Assert.AreEqual(2, causalNet.InputBindings[4].Count);
            //NEW ARC A->C
            Assert.AreEqual(5, causalNet.OutputBindings[0].Count);
            Assert.AreEqual(0, causalNet.OutputBindings[1].Count);
            Assert.AreEqual(1, causalNet.OutputBindings[2].Count);
            Assert.AreEqual(1, causalNet.OutputBindings[3].Count);
            //NEW ARC D->D
            Assert.AreEqual(2, causalNet.OutputBindings[4].Count);

            //A&B BIND FREQUENCY
            Assert.AreEqual(20, causalNet.OutputBindings[0].First(u => u.Activities.Count == 2).Frequency);
            Assert.AreEqual(20, causalNet.InputBindings[1].First(b => b.Activities.Count == 2).Frequency);
        }

        [TestMethod]
        public void MakeCNetHardDefaultSettings()
        {
            // Arrange
            ImportedEventLog elog = CSVImport.MakeDataFrame(hardCsv);
            elog.SetActivity("act");
            elog.SetCaseId("id");
            WorkflowLog wlog = new WorkflowLog(elog);

            // Act
            CNet causalNet = HeuristicMiner.MineCNet(wlog);

            //Arrange
            Assert.AreEqual(0, causalNet.StartActivity.Id);
            Assert.AreEqual(6, causalNet.EndActivity.Id);
            //ACTIVITY OCCURRENCE
            Assert.AreEqual(9, causalNet.Activities.Count);
            Assert.AreEqual(129, causalNet.Activities[0].Frequency);
            Assert.AreEqual(130, causalNet.Activities[1].Frequency);
            Assert.AreEqual(130, causalNet.Activities[2].Frequency);
            Assert.AreEqual(57, causalNet.Activities[3].Frequency);
            Assert.AreEqual(100, causalNet.Activities[4].Frequency);
            Assert.AreEqual(57, causalNet.Activities[5].Frequency);
            Assert.AreEqual(100, causalNet.Activities[6].Frequency);
            Assert.AreEqual(43, causalNet.Activities[7].Frequency);
            Assert.AreEqual(43, causalNet.Activities[8].Frequency);
            //BINDINGS
            Assert.AreEqual(1, causalNet.InputBindings[0].Count);
            Assert.AreEqual(2, causalNet.InputBindings[1].Count);
            Assert.AreEqual(1, causalNet.InputBindings[2].Count);
            Assert.AreEqual(1, causalNet.InputBindings[3].Count);
            Assert.AreEqual(2, causalNet.InputBindings[4].Count);
            Assert.AreEqual(1, causalNet.InputBindings[5].Count);
            Assert.AreEqual(2, causalNet.InputBindings[6].Count);
            Assert.AreEqual(1, causalNet.InputBindings[7].Count);
            Assert.AreEqual(1, causalNet.InputBindings[8].Count);
            Assert.AreEqual(2, causalNet.OutputBindings[0].Count);
            Assert.AreEqual(1, causalNet.OutputBindings[1].Count);
            Assert.AreEqual(3, causalNet.OutputBindings[2].Count);
            Assert.AreEqual(1, causalNet.OutputBindings[3].Count);
            Assert.AreEqual(2, causalNet.OutputBindings[4].Count);
            Assert.AreEqual(1, causalNet.OutputBindings[5].Count);
            Assert.AreEqual(0, causalNet.OutputBindings[6].Count);
            Assert.AreEqual(1, causalNet.OutputBindings[7].Count);
            Assert.AreEqual(1, causalNet.OutputBindings[8].Count);
        }

        [TestMethod]
        public void MakeCNetHardLongDistanceSettings()
        {
            // Arrange
            ImportedEventLog elog = CSVImport.MakeDataFrame(hardCsv);
            elog.SetActivity("act");
            elog.SetCaseId("id");
            WorkflowLog wlog = new WorkflowLog(elog);

            // Act
            HeuristicMinerSettings settings = new HeuristicMinerSettings {UseLongDistance = true};
            CNet causalNet = HeuristicMiner.MineCNet(wlog, settings);

            // Assert
            Assert.AreEqual(2, causalNet.LongDependencies.Count);

            Assert.AreEqual(0, causalNet.StartActivity.Id);
            Assert.AreEqual(6, causalNet.EndActivity.Id);
            //ACTIVITY OCCURRENCE
            Assert.AreEqual(9, causalNet.Activities.Count);
            Assert.AreEqual(129, causalNet.Activities[0].Frequency);
            Assert.AreEqual(130, causalNet.Activities[1].Frequency);
            Assert.AreEqual(130, causalNet.Activities[2].Frequency);
            Assert.AreEqual(57, causalNet.Activities[3].Frequency);
            Assert.AreEqual(100, causalNet.Activities[4].Frequency);
            Assert.AreEqual(57, causalNet.Activities[5].Frequency);
            Assert.AreEqual(100, causalNet.Activities[6].Frequency);
            Assert.AreEqual(43, causalNet.Activities[7].Frequency);
            Assert.AreEqual(43, causalNet.Activities[8].Frequency);
            //BINDINGS
            Assert.AreEqual(1, causalNet.InputBindings[0].Count);
            Assert.AreEqual(2, causalNet.InputBindings[1].Count);
            Assert.AreEqual(1, causalNet.InputBindings[2].Count);
            Assert.AreEqual(1, causalNet.InputBindings[3].Count);
            Assert.AreEqual(2, causalNet.InputBindings[4].Count);
            Assert.AreEqual(1, causalNet.InputBindings[5].Count);
            Assert.AreEqual(2, causalNet.InputBindings[6].Count);
            Assert.AreEqual(1, causalNet.InputBindings[7].Count);
            Assert.AreEqual(1, causalNet.InputBindings[8].Count);
            Assert.AreEqual(2, causalNet.OutputBindings[0].Count);
            Assert.AreEqual(1, causalNet.OutputBindings[1].Count);
            Assert.AreEqual(3, causalNet.OutputBindings[2].Count);
            Assert.AreEqual(1, causalNet.OutputBindings[3].Count);
            Assert.AreEqual(2, causalNet.OutputBindings[4].Count);
            Assert.AreEqual(1, causalNet.OutputBindings[5].Count);
            Assert.AreEqual(0, causalNet.OutputBindings[6].Count);
            Assert.AreEqual(1, causalNet.OutputBindings[7].Count);
            Assert.AreEqual(1, causalNet.OutputBindings[8].Count);
        }
    }
}
