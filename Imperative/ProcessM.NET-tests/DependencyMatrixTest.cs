using System.IO;
using LogImport.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using ProcessM.NET.Discovery.HeuristicMiner;
using ProcessM.NET.Import;
using ProcessM.NET.Model.DataAnalysis;

namespace ProcessM.NETtests
{
    [TestClass]
    public class DependencyMatrixTest : TestBase
    {
        [TestMethod]
        public void MakeDependencyMatrixFromSuccessorMatrix()
        {
            // Arrange
            using FileStream fs = File.Open(heuristicCsv, FileMode.Open);
            ImportedEventLog elog = CSVImport.MakeDataFrame(fs);
            elog.Activity = heuristicCsvActivity;
            elog.CaseId = heuristicCsvActivity;
            WorkflowLog wlog = new WorkflowLog(elog);
            SuccessorMatrix successorMatrix = new SuccessorMatrix(wlog);

            // Act
            DependencyMatrix dependencyMatrix = new DependencyMatrix(successorMatrix);

            // Assert
            Assert.AreEqual(successorMatrix.Activities.Count, dependencyMatrix.L1LDependencyMatrix.Length);
            for (int i = 0; i < 4; i++)
                Assert.IsTrue(dependencyMatrix.L1LDependencyMatrix[i] == 0);
            //1 self loop with dependency 0.8
            Assert.IsTrue(dependencyMatrix.L1LDependencyMatrix[4] == 0.8);
            foreach (var dependency in dependencyMatrix.L2LDependencyMatrix)
                Assert.IsTrue(dependency == 0);
            //Each dependency is in range <-1, 1>
            foreach (var dependency in dependencyMatrix.DirectDependencyMatrix)
                Assert.IsTrue(dependency >= -1 && dependency <= 1);
        }

        [TestMethod]
        public void MakeHardDependencyMatrixFromSuccessorMatrix()
        {
            // Arrange
            using FileStream fs = File.Open(hardCsv, FileMode.Open);
            ImportedEventLog elog = CSVImport.MakeDataFrame(fs);
            elog.Activity = hardCsvActivity;
            elog.CaseId = hardCsvActivity;
            WorkflowLog wlog = new WorkflowLog(elog);
            SuccessorMatrix successorMatrix = new SuccessorMatrix(wlog);

            //Act
            DependencyMatrix dependencyMatrix = new DependencyMatrix(successorMatrix);

            //Assert
            Assert.AreEqual(successorMatrix.Activities.Count, dependencyMatrix.L1LDependencyMatrix.Length);
            //Each dependency is in range <-1, 1>
            foreach (var dependency in dependencyMatrix.DirectDependencyMatrix)
                Assert.IsTrue(dependency >= -1 && dependency <= 1);
            Assert.IsTrue(dependencyMatrix.L1LDependencyMatrix[0] > 0.9 && dependencyMatrix.L1LDependencyMatrix[0] < 1);
            //Check L2L dependency on BCB and CBC
            Assert.IsTrue(dependencyMatrix.L2LDependencyMatrix[1, 2] > 0.9 && dependencyMatrix.L2LDependencyMatrix[1, 2] < 1);
            Assert.IsTrue(dependencyMatrix.L2LDependencyMatrix[2, 1] > 0.9 && dependencyMatrix.L2LDependencyMatrix[2, 1] < 1);
        }
    }
}
