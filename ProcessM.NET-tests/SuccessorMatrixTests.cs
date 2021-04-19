using Microsoft.VisualStudio.TestTools.UnitTesting;
using ProcessM.NET.Import;
using ProcessM.NET.Model;
using ProcessM.NET.Model.DataAnalysis;
using System;
using System.IO;
using System.Linq;

namespace ProcessM.NETtests
{
    [TestClass]
    public class SuccessorMatrixTests : TestBase
    {
        private int[,] MakeExpectedSuccessorMatrix()
        {
            var successorMatrix = new int[5, 5];
            successorMatrix[0, 1] = 5;
            successorMatrix[0, 2] = 11;
            successorMatrix[0, 3] = 11;
            successorMatrix[0, 4] = 13;
            successorMatrix[2, 1] = 11;
            successorMatrix[2, 3] = 10;
            successorMatrix[3, 1] = 11;
            successorMatrix[3, 2] = 10;
            successorMatrix[4, 1] = 13;
            successorMatrix[4, 4] = 4;
            return successorMatrix;
        }

        private int[,] MakeExpectedHardSuccessorMatrix()
        {
            var successorMatrix = new int[9, 9];
            successorMatrix[0, 0] = 29;
            successorMatrix[0, 1] = 100;
            successorMatrix[1, 2] = 130;
            successorMatrix[2, 1] = 30;
            successorMatrix[2, 3] = 57;
            successorMatrix[2, 7] = 43;
            successorMatrix[3, 4] = 57;
            successorMatrix[4, 5] = 57;
            successorMatrix[4, 8] = 43;
            successorMatrix[5, 6] = 57;
            successorMatrix[7, 4] = 43;
            successorMatrix[8, 6] = 43;
            return successorMatrix;
        }

        private int[,] MakeExpectedHardL2LMatrix()
        {
            var L2LMatrix = new int[9, 9];
            L2LMatrix[1, 2] = 30;
            L2LMatrix[2, 1] = 30;
            return L2LMatrix;
        }

        private int[,] MakeExpectedLongDistance()
        {
            var longMatrix = new int[9, 9];
            longMatrix[0, 1] = 129;
            longMatrix[0, 2] = 129;
            longMatrix[0, 3] = 69;
            longMatrix[0, 4] = 129;
            longMatrix[0, 5] = 69;
            longMatrix[0, 6] = 129;
            longMatrix[0, 7] = 60;
            longMatrix[0, 8] = 60;
            longMatrix[1, 2] = 100;
            longMatrix[1, 3] = 76;
            longMatrix[1, 4] = 130;
            longMatrix[1, 5] = 76;
            longMatrix[1, 6] = 130;
            longMatrix[1, 7] = 54;
            longMatrix[1, 8] = 54;
            longMatrix[2, 3] = 76;
            longMatrix[2, 4] = 130;
            longMatrix[2, 5] = 76;
            longMatrix[2, 6] = 130;
            longMatrix[2, 7] = 54;
            longMatrix[2, 8] = 54;
            longMatrix[3, 4] = 57;
            longMatrix[3, 5] = 57;
            longMatrix[3, 6] = 57;
            longMatrix[4, 5] = 57;
            longMatrix[4, 6] = 100;
            longMatrix[4, 8] = 43;
            longMatrix[5, 6] = 57;
            longMatrix[7, 8] = 43;
            return longMatrix;
        }


        [TestMethod]
        public void MakeSuccessorMatrixFromEventLogTest()
        {
            // Arrange
            ImportedEventLog elog = CSVImport.MakeDataFrame(heuristicCsv);
            elog.SetActivity("act");
            elog.SetCaseId("id");
            WorkflowLog wlog = new WorkflowLog(elog);
            var expectedSuccessor = MakeExpectedSuccessorMatrix();
            MakeExpectedHardL2LMatrix();

            // Act
            SuccessorMatrix successorMatrix = new SuccessorMatrix(wlog);

            // Assert
            Assert.AreEqual(expectedSuccessor.GetLength(1), successorMatrix.Activities.Count);
            CollectionAssert.AreEqual(expectedSuccessor, successorMatrix.DirectMatrix);
            CollectionAssert.AreEqual(new int[5, 5], successorMatrix.L2LMatrix);
            CollectionAssert.AreEqual(new int[] {40, 40, 21, 21, 17}, successorMatrix.ActivityOccurrences);
            Assert.AreEqual(1, successorMatrix.StartActivities.Count);
            Assert.AreEqual(1, successorMatrix.EndActivities.Count);
            Assert.AreEqual("a", successorMatrix.StartActivities.First());
            Assert.AreEqual("e", successorMatrix.EndActivities.First());
        }

        [TestMethod]
        public void MakeSuccessorMatrixFromHardEventLogTest()
        {
            // Arrange
            ImportedEventLog elog = CSVImport.MakeDataFrame(hardCsv);
            elog.SetActivity("act");
            elog.SetCaseId("id");
            WorkflowLog wlog = new WorkflowLog(elog);
            var expectedSuccessor = MakeExpectedHardSuccessorMatrix();
            var expectedL2L = MakeExpectedHardL2LMatrix();
            var expectedLong = MakeExpectedLongDistance();

            //Act
            SuccessorMatrix successorMatrix = new SuccessorMatrix(wlog);

            Assert.AreEqual(expectedSuccessor.GetLength(0), successorMatrix.Activities.Count);
            CollectionAssert.AreEqual(expectedSuccessor, successorMatrix.DirectMatrix);
            CollectionAssert.AreEqual(expectedL2L, successorMatrix.L2LMatrix);
            CollectionAssert.AreEqual(new int[]{129, 130, 130, 57, 100, 57, 100, 43, 43}, successorMatrix.ActivityOccurrences);
            CollectionAssert.AreEqual(expectedLong, successorMatrix.LongDistanceMatrix);
            Assert.AreEqual(1, successorMatrix.StartActivities.Count);
            Assert.AreEqual(1, successorMatrix.EndActivities.Count);
            Assert.AreEqual("a", successorMatrix.StartActivities.First());
            Assert.AreEqual("i", successorMatrix.EndActivities.First());
        }

    }
}
