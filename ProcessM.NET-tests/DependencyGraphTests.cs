using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using ProcessM.NET.Discovery.HeuristicMiner;
using ProcessM.NET.Import;
using ProcessM.NET.Model;
using ProcessM.NET.Model.DataAnalysis;

namespace ProcessM.NETtests
{
    [TestClass]
    public class DependencyGraphTests : TestBase
    {
        [TestMethod]
        public void SimpleDependencyGraphDefaultSettings()
        {
            // Arrange
            ImportedEventLog elog = CSVImport.MakeDataFrame(heuristicCsv);
            elog.SetActivity("act");
            elog.SetCaseId("id");
            WorkflowLog wlog = new WorkflowLog(elog);
            var successorMatrix = new SuccessorMatrix(wlog);

            // Act
            DependencyGraph dependencyGraph = new DependencyGraph(successorMatrix);

            // Assert
            Assert.AreEqual(successorMatrix.Activities.Count, dependencyGraph.Activities.Count);
            var start = successorMatrix.ActivityIndices[successorMatrix.StartActivities.First()];
            var end = successorMatrix.ActivityIndices[successorMatrix.EndActivities.First()];
            Assert.AreEqual(start, dependencyGraph.StartActivity);
            Assert.AreEqual(end, dependencyGraph.EndActivity);
            Assert.IsTrue(dependencyGraph.LongDependencies.Count == 0);
            //NO INPUT FOR START ACT
            Assert.IsTrue(dependencyGraph.InputActivities[start].Count == 0);
            //NO OUTPUT FOR END ACT
            Assert.IsTrue(dependencyGraph.OutputActivities[end].Count == 0);
            //ARCS CORRECT IN
            Assert.IsTrue(dependencyGraph.InputActivities[1].SetEquals(new HashSet<int>{ 2, 3, 4 }));
            Assert.IsTrue(dependencyGraph.InputActivities[2].SetEquals(new HashSet<int> { 0 }));
            Assert.IsTrue(dependencyGraph.InputActivities[3].SetEquals(new HashSet<int> { 0 }));
            Assert.IsTrue(dependencyGraph.InputActivities[4].SetEquals(new HashSet<int> { 0 }));
            //ARCS CORRECT OUT
            Assert.IsTrue(dependencyGraph.OutputActivities[0].SetEquals(new HashSet<int> { 2, 3, 4 }));
            Assert.IsTrue(dependencyGraph.OutputActivities[2].SetEquals(new HashSet<int> { 1 }));
            Assert.IsTrue(dependencyGraph.OutputActivities[3].SetEquals(new HashSet<int> { 1 }));
            Assert.IsTrue(dependencyGraph.OutputActivities[4].SetEquals(new HashSet<int> { 1 }));
        }

        [TestMethod]
        public void SimpleDependencyGraphWithL1LLoop()
        {
            // Arrange
            ImportedEventLog elog = CSVImport.MakeDataFrame(heuristicCsv);
            elog.SetActivity("act");
            elog.SetCaseId("id");
            WorkflowLog wlog = new WorkflowLog(elog);
            var successorMatrix = new SuccessorMatrix(wlog);

            // Act
            HeuristicMinerSettings settings = new HeuristicMinerSettings {L1LThreshold = 0.7};
            DependencyGraph dependencyGraph = new DependencyGraph(successorMatrix, settings);

            // Assert
            Assert.AreEqual(successorMatrix.Activities.Count, dependencyGraph.Activities.Count);
            var start = successorMatrix.ActivityIndices[successorMatrix.StartActivities.First()];
            var end = successorMatrix.ActivityIndices[successorMatrix.EndActivities.First()];
            Assert.AreEqual(start, dependencyGraph.StartActivity);
            Assert.AreEqual(end, dependencyGraph.EndActivity);
            Assert.IsTrue(dependencyGraph.LongDependencies.Count == 0);
            //NO INPUT FOR START ACT
            Assert.IsTrue(dependencyGraph.InputActivities[start].Count == 0);
            //NO OUTPUT FOR END ACT
            Assert.IsTrue(dependencyGraph.OutputActivities[end].Count == 0);
            //ARCS CORRECT IN
            Assert.IsTrue(dependencyGraph.InputActivities[1].SetEquals(new HashSet<int> { 2, 3, 4 }));
            Assert.IsTrue(dependencyGraph.InputActivities[2].SetEquals(new HashSet<int> { 0 }));
            Assert.IsTrue(dependencyGraph.InputActivities[3].SetEquals(new HashSet<int> { 0 }));
            //SELF LOOP
            Assert.IsTrue(dependencyGraph.InputActivities[4].SetEquals(new HashSet<int> { 0 , 4 }));
            //ARCS CORRECT OUT
            Assert.IsTrue(dependencyGraph.OutputActivities[0].SetEquals(new HashSet<int> { 2, 3, 4 }));
            Assert.IsTrue(dependencyGraph.OutputActivities[2].SetEquals(new HashSet<int> { 1 }));
            Assert.IsTrue(dependencyGraph.OutputActivities[3].SetEquals(new HashSet<int> { 1 }));
            //SELF LOOP
            Assert.IsTrue(dependencyGraph.OutputActivities[4].SetEquals(new HashSet<int> { 1 , 4 }));
        }

        [TestMethod]
        public void HardDependencyGraphDefaultSettings()
        {
            // Arrange
            ImportedEventLog elog = CSVImport.MakeDataFrame(hardCsv);
            elog.SetActivity("act");
            elog.SetCaseId("id");
            WorkflowLog wlog = new WorkflowLog(elog);
            var successorMatrix = new SuccessorMatrix(wlog);

            // Act
            DependencyGraph dependencyGraph = new DependencyGraph(successorMatrix);

            // Assert
            Assert.AreEqual(successorMatrix.Activities.Count, dependencyGraph.Activities.Count);
            var start = successorMatrix.ActivityIndices[successorMatrix.StartActivities.First()];
            var end = successorMatrix.ActivityIndices[successorMatrix.EndActivities.First()];
            Assert.AreEqual(start, dependencyGraph.StartActivity);
            Assert.AreEqual(end, dependencyGraph.EndActivity);
            Assert.IsTrue(dependencyGraph.LongDependencies.Count == 0);
            //1 IN ARC TO START ACT (SELF LOOP)
            Assert.IsTrue(dependencyGraph.InputActivities[start].Count == 1);
            //NO OUTPUT FOR END ACT
            Assert.IsTrue(dependencyGraph.OutputActivities[end].Count == 0);
            //IN
            Assert.IsTrue(dependencyGraph.InputActivities[1].SetEquals(new HashSet<int> { 0, 2 }));
            Assert.IsTrue(dependencyGraph.InputActivities[2].SetEquals(new HashSet<int> { 1 }));
            Assert.IsTrue(dependencyGraph.InputActivities[3].SetEquals(new HashSet<int> { 2 }));
            Assert.IsTrue(dependencyGraph.InputActivities[4].SetEquals(new HashSet<int> { 3, 7 }));
            Assert.IsTrue(dependencyGraph.InputActivities[5].SetEquals(new HashSet<int> { 4 }));
            Assert.IsTrue(dependencyGraph.InputActivities[6].SetEquals(new HashSet<int> { 5, 8 }));
            Assert.IsTrue(dependencyGraph.InputActivities[7].SetEquals(new HashSet<int> { 2 }));
            Assert.IsTrue(dependencyGraph.InputActivities[8].SetEquals(new HashSet<int> { 4 }));
            //OUT
            Assert.IsTrue(dependencyGraph.OutputActivities[0].SetEquals(new HashSet<int> { 0, 1 }));
            Assert.IsTrue(dependencyGraph.OutputActivities[1].SetEquals(new HashSet<int> { 2 }));
            Assert.IsTrue(dependencyGraph.OutputActivities[2].SetEquals(new HashSet<int> { 1, 7, 3 }));
            Assert.IsTrue(dependencyGraph.OutputActivities[3].SetEquals(new HashSet<int> { 4 }));
            Assert.IsTrue(dependencyGraph.OutputActivities[4].SetEquals(new HashSet<int> { 5, 8 }));
            Assert.IsTrue(dependencyGraph.OutputActivities[5].SetEquals(new HashSet<int> { 6 }));
            Assert.IsTrue(dependencyGraph.OutputActivities[7].SetEquals(new HashSet<int> { 4 }));
            Assert.IsTrue(dependencyGraph.OutputActivities[8].SetEquals(new HashSet<int> { 6 }));
        }


        [TestMethod]
        public void HardDependencyGraphLongDistance()
        {
            // Arrange
            ImportedEventLog elog = CSVImport.MakeDataFrame(hardCsv);
            elog.SetActivity("act");
            elog.SetCaseId("id");
            WorkflowLog wlog = new WorkflowLog(elog);
            var successorMatrix = new SuccessorMatrix(wlog);

            // Act
            HeuristicMinerSettings settings = new HeuristicMinerSettings {UseLongDistance = true};
            DependencyGraph dependencyGraph = new DependencyGraph(successorMatrix, settings);

            // Assert
            Assert.AreEqual(successorMatrix.Activities.Count, dependencyGraph.Activities.Count);
            var start = successorMatrix.ActivityIndices[successorMatrix.StartActivities.First()];
            var end = successorMatrix.ActivityIndices[successorMatrix.EndActivities.First()];
            Assert.AreEqual(start, dependencyGraph.StartActivity);
            Assert.AreEqual(end, dependencyGraph.EndActivity);
            Assert.IsTrue(dependencyGraph.LongDependencies.Count == 2);
            //1 IN ARC TO START ACT (SELF LOOP)
            Assert.IsTrue(dependencyGraph.InputActivities[start].Count == 1);
            //NO OUTPUT FOR END ACT
            Assert.IsTrue(dependencyGraph.OutputActivities[end].Count == 0);
            //IN
            Assert.IsTrue(dependencyGraph.InputActivities[1].SetEquals(new HashSet<int> { 0, 2 }));
            Assert.IsTrue(dependencyGraph.InputActivities[2].SetEquals(new HashSet<int> { 1 }));
            Assert.IsTrue(dependencyGraph.InputActivities[3].SetEquals(new HashSet<int> { 2 }));
            Assert.IsTrue(dependencyGraph.InputActivities[4].SetEquals(new HashSet<int> { 3, 7 }));
            //LONG DISTANCE
            Assert.IsTrue(dependencyGraph.InputActivities[5].SetEquals(new HashSet<int> { 4, 3 }));
            Assert.IsTrue(dependencyGraph.InputActivities[6].SetEquals(new HashSet<int> { 5, 8 }));
            Assert.IsTrue(dependencyGraph.InputActivities[7].SetEquals(new HashSet<int> { 2 }));
            //LONG DISTANCE
            Assert.IsTrue(dependencyGraph.InputActivities[8].SetEquals(new HashSet<int> { 4, 7 }));
            //OUT
            Assert.IsTrue(dependencyGraph.OutputActivities[0].SetEquals(new HashSet<int> { 0, 1 }));
            Assert.IsTrue(dependencyGraph.OutputActivities[1].SetEquals(new HashSet<int> { 2 }));
            Assert.IsTrue(dependencyGraph.OutputActivities[2].SetEquals(new HashSet<int> { 1, 7, 3 }));
            //LONG DISTANCE
            Assert.IsTrue(dependencyGraph.OutputActivities[3].SetEquals(new HashSet<int> { 4, 5 }));
            Assert.IsTrue(dependencyGraph.OutputActivities[4].SetEquals(new HashSet<int> { 5, 8 }));
            Assert.IsTrue(dependencyGraph.OutputActivities[5].SetEquals(new HashSet<int> { 6 }));
            //LONG DISTANCE
            Assert.IsTrue(dependencyGraph.OutputActivities[7].SetEquals(new HashSet<int> { 4, 8 }));
            Assert.IsTrue(dependencyGraph.OutputActivities[8].SetEquals(new HashSet<int> { 6 }));
        }


        [TestMethod]
        public void HardDependencyGraphNoL1L()
        {
            // Arrange
            ImportedEventLog elog = CSVImport.MakeDataFrame(hardCsv);
            elog.SetActivity("act");
            elog.SetCaseId("id");
            WorkflowLog wlog = new WorkflowLog(elog);
            var successorMatrix = new SuccessorMatrix(wlog);

            // Act
            HeuristicMinerSettings settings = new HeuristicMinerSettings {L1LThreshold = 1};
            DependencyGraph dependencyGraph = new DependencyGraph(successorMatrix, settings);

            // Assert
            Assert.AreEqual(successorMatrix.Activities.Count, dependencyGraph.Activities.Count);
            var start = successorMatrix.ActivityIndices[successorMatrix.StartActivities.First()];
            var end = successorMatrix.ActivityIndices[successorMatrix.EndActivities.First()];
            Assert.AreEqual(start, dependencyGraph.StartActivity);
            Assert.AreEqual(end, dependencyGraph.EndActivity);
            //1 NO SELF LOOP => 0
            Assert.AreEqual(0, dependencyGraph.InputActivities[start].Count);
            //NO OUTPUT FOR END ACT
            Assert.AreEqual(0, dependencyGraph.OutputActivities[end].Count);
            //IN
            Assert.IsTrue(dependencyGraph.InputActivities[1].SetEquals(new HashSet<int> { 0, 2 }));
            Assert.IsTrue(dependencyGraph.InputActivities[2].SetEquals(new HashSet<int> { 1 }));
            Assert.IsTrue(dependencyGraph.InputActivities[3].SetEquals(new HashSet<int> { 2 }));
            Assert.IsTrue(dependencyGraph.InputActivities[4].SetEquals(new HashSet<int> { 3, 7 }));
            Assert.IsTrue(dependencyGraph.InputActivities[5].SetEquals(new HashSet<int> { 4 }));
            Assert.IsTrue(dependencyGraph.InputActivities[6].SetEquals(new HashSet<int> { 5, 8 }));
            Assert.IsTrue(dependencyGraph.InputActivities[7].SetEquals(new HashSet<int> { 2 }));
            Assert.IsTrue(dependencyGraph.InputActivities[8].SetEquals(new HashSet<int> { 4 }));
            //OUT
            Assert.IsTrue(dependencyGraph.OutputActivities[0].SetEquals(new HashSet<int> { 1 }));
            Assert.IsTrue(dependencyGraph.OutputActivities[1].SetEquals(new HashSet<int> { 2 }));
            Assert.IsTrue(dependencyGraph.OutputActivities[2].SetEquals(new HashSet<int> { 1, 7, 3 }));
            Assert.IsTrue(dependencyGraph.OutputActivities[3].SetEquals(new HashSet<int> { 4 }));
            Assert.IsTrue(dependencyGraph.OutputActivities[4].SetEquals(new HashSet<int> { 5, 8 }));
            Assert.IsTrue(dependencyGraph.OutputActivities[5].SetEquals(new HashSet<int> { 6 }));
            Assert.IsTrue(dependencyGraph.OutputActivities[7].SetEquals(new HashSet<int> { 4 }));
            Assert.IsTrue(dependencyGraph.OutputActivities[8].SetEquals(new HashSet<int> { 6 }));
        }


        [TestMethod]
        public void HardDependencyGraphNoL2LWithAllTaskConnected()
        {
            // Arrange
            ImportedEventLog elog = CSVImport.MakeDataFrame(hardCsv);
            elog.SetActivity("act");
            elog.SetCaseId("id");
            WorkflowLog wlog = new WorkflowLog(elog);
            var successorMatrix = new SuccessorMatrix(wlog);

            // Act
            HeuristicMinerSettings settings = new HeuristicMinerSettings {L2LThreshold = 1};
            DependencyGraph dependencyGraph = new DependencyGraph(successorMatrix, settings);

            // Assert
            Assert.AreEqual(successorMatrix.Activities.Count, dependencyGraph.Activities.Count);
            var start = successorMatrix.ActivityIndices[successorMatrix.StartActivities.First()];
            var end = successorMatrix.ActivityIndices[successorMatrix.EndActivities.First()];
            Assert.AreEqual(start, dependencyGraph.StartActivity);
            Assert.AreEqual(end, dependencyGraph.EndActivity);
            Assert.IsTrue(dependencyGraph.LongDependencies.Count == 0);
            //1 IN ARC TO START ACT (SELF LOOP)
            Assert.IsTrue(dependencyGraph.InputActivities[start].Count == 1);
            //NO OUTPUT FOR END ACT
            Assert.IsTrue(dependencyGraph.OutputActivities[end].Count == 0);
            //IN
            //NO BACK ARC FROM C->B
            Assert.IsTrue(dependencyGraph.InputActivities[1].SetEquals(new HashSet<int> { 0 }));
            Assert.IsTrue(dependencyGraph.InputActivities[2].SetEquals(new HashSet<int> { 1 }));
            Assert.IsTrue(dependencyGraph.InputActivities[3].SetEquals(new HashSet<int> { 2 }));
            Assert.IsTrue(dependencyGraph.InputActivities[4].SetEquals(new HashSet<int> { 3, 7 }));
            Assert.IsTrue(dependencyGraph.InputActivities[5].SetEquals(new HashSet<int> { 4 }));
            Assert.IsTrue(dependencyGraph.InputActivities[6].SetEquals(new HashSet<int> { 5, 8 }));
            Assert.IsTrue(dependencyGraph.InputActivities[7].SetEquals(new HashSet<int> { 2 }));
            Assert.IsTrue(dependencyGraph.InputActivities[8].SetEquals(new HashSet<int> { 4 }));
            //OUT
            Assert.IsTrue(dependencyGraph.OutputActivities[0].SetEquals(new HashSet<int> { 0, 1 }));
            Assert.IsTrue(dependencyGraph.OutputActivities[1].SetEquals(new HashSet<int> { 2 }));
            //NO BACK ARC FROM C->B
            Assert.IsTrue(dependencyGraph.OutputActivities[2].SetEquals(new HashSet<int> { 7, 3 }));
            Assert.IsTrue(dependencyGraph.OutputActivities[3].SetEquals(new HashSet<int> { 4 }));
            Assert.IsTrue(dependencyGraph.OutputActivities[4].SetEquals(new HashSet<int> { 5, 8 }));
            Assert.IsTrue(dependencyGraph.OutputActivities[5].SetEquals(new HashSet<int> { 6 }));
            Assert.IsTrue(dependencyGraph.OutputActivities[7].SetEquals(new HashSet<int> { 4 }));
            Assert.IsTrue(dependencyGraph.OutputActivities[8].SetEquals(new HashSet<int> { 6 }));
        }

        [TestMethod]
        public void HardDependencyGraphNoL2LL1LWithoutAllTaskConnected()
        {
            // Arrange
            ImportedEventLog elog = CSVImport.MakeDataFrame(hardCsv);
            elog.SetActivity("act");
            elog.SetCaseId("id");
            WorkflowLog wlog = new WorkflowLog(elog);
            var successorMatrix = new SuccessorMatrix(wlog);

            // Act
            HeuristicMinerSettings settings = new HeuristicMinerSettings
            {
                L2LThreshold = 1, L1LThreshold = 1, AllTasksConnected = false
            };
            DependencyGraph dependencyGraph = new DependencyGraph(successorMatrix, settings);

            // Assert
            Assert.AreEqual(successorMatrix.Activities.Count, dependencyGraph.Activities.Count);
            var start = successorMatrix.ActivityIndices[successorMatrix.StartActivities.First()];
            var end = successorMatrix.ActivityIndices[successorMatrix.EndActivities.First()];
            Assert.AreEqual(start, dependencyGraph.StartActivity);
            Assert.AreEqual(end, dependencyGraph.EndActivity);
            Assert.IsTrue(dependencyGraph.LongDependencies.Count == 0);
            //1 IN NO ARC A->A
            Assert.IsTrue(dependencyGraph.InputActivities[start].Count == 0);
            //NO OUTPUT FOR END ACT
            Assert.IsTrue(dependencyGraph.OutputActivities[end].Count == 0);
            //IN
            //NO BACK ARC FROM C->B and A->A
            Assert.IsTrue(dependencyGraph.InputActivities[1].SetEquals(new HashSet<int> { 0 }));
            //NO ARC FROM B->C
            Assert.IsTrue(dependencyGraph.InputActivities[2].SetEquals(new HashSet<int> {  }));
            Assert.IsTrue(dependencyGraph.InputActivities[3].SetEquals(new HashSet<int> { 2 }));
            Assert.IsTrue(dependencyGraph.InputActivities[4].SetEquals(new HashSet<int> { 3, 7 }));
            Assert.IsTrue(dependencyGraph.InputActivities[5].SetEquals(new HashSet<int> { 4 }));
            Assert.IsTrue(dependencyGraph.InputActivities[6].SetEquals(new HashSet<int> { 5, 8 }));
            Assert.IsTrue(dependencyGraph.InputActivities[7].SetEquals(new HashSet<int> { 2 }));
            Assert.IsTrue(dependencyGraph.InputActivities[8].SetEquals(new HashSet<int> { 4 }));
            //OUT
            //NO ARC A->A
            Assert.IsTrue(dependencyGraph.OutputActivities[0].SetEquals(new HashSet<int> { 1 }));
            //NO ARC B->C
            Assert.IsTrue(dependencyGraph.OutputActivities[1].SetEquals(new HashSet<int> {  }));
            //NO BACK ARC FROM C->B
            Assert.IsTrue(dependencyGraph.OutputActivities[2].SetEquals(new HashSet<int> { 7, 3 }));
            Assert.IsTrue(dependencyGraph.OutputActivities[3].SetEquals(new HashSet<int> { 4 }));
            Assert.IsTrue(dependencyGraph.OutputActivities[4].SetEquals(new HashSet<int> { 5, 8 }));
            Assert.IsTrue(dependencyGraph.OutputActivities[5].SetEquals(new HashSet<int> { 6 }));
            Assert.IsTrue(dependencyGraph.OutputActivities[7].SetEquals(new HashSet<int> { 4 }));
            Assert.IsTrue(dependencyGraph.OutputActivities[8].SetEquals(new HashSet<int> { 6 }));
        }
    }
}