using Microsoft.VisualStudio.TestTools.UnitTesting;
using ProcessM.NET.Import;
using ProcessM.NET.Model;
using ProcessM.NET.Model.DataAnalysis;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace ProcessM.NETtests
{
    [TestClass]
    public class RelationMatrixTests
    {
        static readonly string workingDirectory = Environment.CurrentDirectory;
        static readonly string projectDirectory = Directory.GetParent(workingDirectory).Parent.Parent.FullName;

        static readonly string separator = System.IO.Path.DirectorySeparatorChar.ToString();
        readonly string hardCsv = projectDirectory + separator + "Files" + separator + "alpha.csv";
        readonly string easyCsv = projectDirectory + separator + "Files" + separator + "alpha2.csv";

        private Relation[,] MakeEasyRelationMatrix()
        {
            Relation[,] exampleMatrix = new Relation[4, 4];
            exampleMatrix[0, 1] = Relation.Succession; // a -> b
            exampleMatrix[1, 0] = Relation.Predecession; // b <- a
            exampleMatrix[1, 2] = Relation.Succession; // b -> c
            exampleMatrix[2, 1] = Relation.Predecession; // c <- b
            exampleMatrix[0, 3] = Relation.Succession; // a -> d
            exampleMatrix[3, 0] = Relation.Predecession; // d <- a
            exampleMatrix[3, 2] = Relation.Succession; // d -> c
            exampleMatrix[2, 3] = Relation.Predecession; // c <- d

            return exampleMatrix;
        }

        private Relation[,] MakeHardRelationMatrix()
        {
            Relation[,] exampleMatrix = new Relation[7, 7];

            exampleMatrix[0, 1] = Relation.Succession; // a -> b
            exampleMatrix[1, 0] = Relation.Predecession; // b <- a
            exampleMatrix[0, 2] = Relation.Succession; // a -> c
            exampleMatrix[2, 0] = Relation.Predecession; // c <- a
            exampleMatrix[1, 2] = Relation.Parallelism; // b || c
            exampleMatrix[2, 1] = Relation.Parallelism; // c || b
            exampleMatrix[1, 3] = Relation.Succession; // b -> d
            exampleMatrix[3, 1] = Relation.Predecession; // d <- b
            exampleMatrix[2, 3] = Relation.Succession; // c -> d
            exampleMatrix[3, 2] = Relation.Predecession; // d <- c
            exampleMatrix[3, 4] = Relation.Succession; // d -> e
            exampleMatrix[4, 3] = Relation.Predecession; // e <- d
            exampleMatrix[4, 5] = Relation.Succession; // e -> g
            exampleMatrix[5, 4] = Relation.Predecession; // g <- e
            exampleMatrix[3, 6] = Relation.Succession; // d -> f
            exampleMatrix[6, 3] = Relation.Predecession; // f <- d
            exampleMatrix[6, 5] = Relation.Succession; // f -> g
            exampleMatrix[5, 6] = Relation.Predecession; // g <- f

            return exampleMatrix;
        }

        [TestMethod]
        public void MakeRelationMatrixFromEventLogTest()
        {
            // Arrange
            ImportedEventLog elog = CSVImport.MakeDataFrame(easyCsv);
            elog.SetActivity("act");
            elog.SetCaseId("id");
            WorkflowLog wlog = new WorkflowLog(elog);
            List<string> exampleActivities = new List<string>() { "a", "b", "c", "d" };
            Relation[,] exampleFootprint = MakeEasyRelationMatrix();

            // Act
            RelationMatrix matrix = new RelationMatrix(wlog);

            // Assert
            Assert.AreEqual(matrix.Activities.Count, 4);
            for (int i = 0; i < matrix.Activities.Count; i++)
            {
                Assert.AreEqual(exampleActivities[i], matrix.Activities[i]);
                Assert.AreEqual(i, matrix.ActivityIndices[matrix.Activities[i]]);
            }
            Assert.AreEqual(1, matrix.StartActivities.Count);
            Assert.IsTrue(matrix.StartActivities.Contains("a"));
            Assert.AreEqual(1, matrix.EndActivities.Count);
            Assert.IsTrue(matrix.EndActivities.Contains("c"));

            for (int i = 0; i < matrix.Activities.Count; i++)
            {
                for (int j = 0; j < matrix.Activities.Count; j++)
                {
                    Assert.AreEqual(exampleFootprint[i, j], matrix.Footprint[i, j]);
                }
            }
        }

        [TestMethod]
        public void MakeRelationMatrixFromHardEventLogTest()
        {
            // Arrange
            ImportedEventLog elog = CSVImport.MakeDataFrame(hardCsv);
            elog.SetActivity("act");
            elog.SetCaseId("id");
            WorkflowLog wlog = new WorkflowLog(elog);
            List<string> exampleActivities = new List<string>() { "a", "b", "c", "d", "e", "g", "f" };
            Relation[,] exampleFootprint = MakeHardRelationMatrix();

            // Act
            RelationMatrix matrix = new RelationMatrix(wlog);

            // Assert
            Assert.AreEqual(matrix.Activities.Count, 7);
            for (int i = 0; i < matrix.Activities.Count; i++)
            {
                Assert.AreEqual(exampleActivities[i], matrix.Activities[i]);
                Assert.AreEqual(i, matrix.ActivityIndices[matrix.Activities[i]]);
            }
            Assert.AreEqual(1, matrix.StartActivities.Count);
            Assert.IsTrue(matrix.StartActivities.Contains("a"));
            Assert.AreEqual(1, matrix.EndActivities.Count);
            Assert.IsTrue(matrix.EndActivities.Contains("g"));

            for (int i = 0; i < matrix.Activities.Count; i++)
            {
                for (int j = 0; j < matrix.Activities.Count; j++)
                {
                    Assert.AreEqual(exampleFootprint[i, j], matrix.Footprint[i, j]);
                }
            }
        }

        [TestMethod]
        public void MakeRelationMatrixFromActivitiesTest()
        {
            // Arrange
            List<string> activities = new List<string>() { "wake up", "have coffee", "have tea", "work", "go home", "go sleep", "play witcher" };
            HashSet<string> startActivities = new HashSet<string>() { "wake up" };
            HashSet<string> endActivities = new HashSet<string>() { "go sleep", "play witcher" };
            Relation[,] exampleFootprint = new Relation[7, 7];

            // Act
            RelationMatrix matrix = new RelationMatrix(activities, startActivities, endActivities);

            // Assert
            Assert.AreEqual(matrix.Activities.Count, 7);
            for (int i = 0; i < matrix.Activities.Count; i++)
            {
                Assert.AreEqual(activities[i], matrix.Activities[i]);
                Assert.AreEqual(i, matrix.ActivityIndices[matrix.Activities[i]]);
            }
            Assert.AreEqual(1, matrix.StartActivities.Count);
            Assert.IsTrue(matrix.StartActivities.Contains("wake up"));
            Assert.AreEqual(2, matrix.EndActivities.Count);
            Assert.IsTrue(matrix.EndActivities.Contains("go sleep"));
            Assert.IsTrue(matrix.EndActivities.Contains("play witcher"));

            for (int i = 0; i < matrix.Activities.Count; i++)
            {
                for (int j = 0; j < matrix.Activities.Count; j++)
                {
                    Assert.AreEqual(exampleFootprint[i, j], matrix.Footprint[i, j]);
                }
            }
        }
    }
}