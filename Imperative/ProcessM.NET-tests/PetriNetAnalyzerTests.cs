using LogImport.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using ProcessM.NET.ConformanceChecking.CausalFootprint;
using ProcessM.NET.Discovery.Alpha;
using ProcessM.NET.Import;
using ProcessM.NET.Model;
using ProcessM.NET.Model.DataAnalysis;
using System.Collections.Generic;
using System.IO;

namespace ProcessM.NETtests
{
    [TestClass]
    public class PetriNetAnalyzerTests : TestBase
    {
        readonly string cycleNetCorrectPnml = projectDirectory + separator + "Files" + separator + "cycleNetCorrect.xml";

        private RelationMatrix MakeExtremelyEasyRelationMatrix()
        {
            using FileStream fs = File.Open(extremelyEasyCsv, FileMode.Open);
            ImportedEventLog elog = CSVImport.MakeDataFrame(fs);
            elog.Activity = extremelyEasyCsvActivity;
            elog.CaseId = extremelyEasyCsvCaseId;
            WorkflowLog wlog = new WorkflowLog(elog);
            return new RelationMatrix(wlog);
        }

        private RelationMatrix MakeEasyRelationMatrix()
        {
            using FileStream fs = File.Open(easyCsv, FileMode.Open);
            ImportedEventLog elog = CSVImport.MakeDataFrame(fs);
            elog.Activity = easyCsvActivity;
            elog.CaseId = easyCsvCaseId;
            WorkflowLog wlog = new WorkflowLog(elog);
            return new RelationMatrix(wlog);
        }

        private RelationMatrix MakeHardRelationMatrix()
        {
            using FileStream fs = File.Open(alphaCsv, FileMode.Open);
            ImportedEventLog elog = CSVImport.MakeDataFrame(fs);
            elog.Activity = alphaCsvActivity;
            elog.CaseId = alphaCsvCaseId;
            WorkflowLog wlog = new WorkflowLog(elog);
            return new RelationMatrix(wlog);
        }

        private RelationMatrix MakeVeryHardRelationMatrix()
        {
            using FileStream fs = File.Open(veryHardCsv, FileMode.Open);
            ImportedEventLog elog = CSVImport.MakeDataFrame(fs);
            elog.Activity = veryHardCsvActivity;
            elog.CaseId = veryHardCsvCaseId;
            WorkflowLog wlog = new WorkflowLog(elog);
            return new RelationMatrix(wlog);
        }

        private RelationMatrix MakeCycleNetRelationMatrix()
        {
            List<string> activities = new List<string>() { "a", "b", "c", "d", "e" };
            HashSet<string> startActivities = new HashSet<string>() { "a" };
            HashSet<string> endActivities = new HashSet<string>() { "e" };
            RelationMatrix matrix = new RelationMatrix(activities, startActivities, endActivities);

            matrix.Footprint[0, 1] = Relation.Succession; // a -> b
            matrix.Footprint[1, 0] = Relation.Predecession; // b <- a
            matrix.Footprint[1, 2] = Relation.Succession; // b -> c
            matrix.Footprint[2, 1] = Relation.Predecession; // c <- b
            matrix.Footprint[2, 3] = Relation.Succession; // c -> d
            matrix.Footprint[3, 2] = Relation.Predecession; // d <- c
            matrix.Footprint[3, 1] = Relation.Succession; // d -> b
            matrix.Footprint[1, 3] = Relation.Predecession; // d <- b
            matrix.Footprint[2, 4] = Relation.Succession; // c -> e
            matrix.Footprint[4, 2] = Relation.Predecession; // c <- e

            return matrix;
        }

        private IPetriNet MakeExtremelyEasyPetriNet()
        {
            RelationMatrix matrix = MakeExtremelyEasyRelationMatrix();

            return Alpha.MakePetriNet(matrix);
        }

        private IPetriNet MakeEasyPetriNet()
        {
            RelationMatrix matrix = MakeEasyRelationMatrix();

            return Alpha.MakePetriNet(matrix);
        }

        private IPetriNet MakeHardPetriNet()
        {
            RelationMatrix matrix = MakeHardRelationMatrix();

            return Alpha.MakePetriNet(matrix);
        }

        private IPetriNet MakeVeryHardPetriNet()
        {
            RelationMatrix matrix = MakeVeryHardRelationMatrix();

            return Alpha.MakePetriNet(matrix);
        }

        private IPetriNet MakeCycleNetPetriNet()
        {
            using FileStream fs = File.Open(cycleNetCorrectPnml, FileMode.Open);
            return PNMLImport.Deserialize(fs);
        }

        [TestMethod]
        public void AnalyzeEasyPetriNetTest()
        {
            // Arrange
            RelationMatrix originalMatrix = MakeEasyRelationMatrix();
            IPetriNet originalNet = MakeEasyPetriNet();

            // Act
            RelationMatrix matrix = PetriNetAnalyzer.MakeRelationMatrix(originalNet);

            // Assert
            Assert.AreEqual(4, matrix.Activities.Count);
            foreach (string act in matrix.Activities)
            {
                Assert.IsTrue(originalMatrix.Activities.Contains(act));
            }
            Assert.AreEqual(1, matrix.StartActivities.Count);
            Assert.IsTrue(matrix.StartActivities.Contains("a"));
            Assert.AreEqual(1, matrix.EndActivities.Count);
            Assert.IsTrue(matrix.EndActivities.Contains("c"));

            foreach (string actI in matrix.Activities)
            {
                foreach (string actJ in matrix.Activities)
                {
                    Assert.AreEqual(originalMatrix.Footprint[originalMatrix.ActivityIndices[actI], originalMatrix.ActivityIndices[actJ]],
                        matrix.Footprint[matrix.ActivityIndices[actI], matrix.ActivityIndices[actJ]]);
                }
            }
        }

        [TestMethod]
        public void AnalyzeExetremelyEasyPetriNetTest()
        {
            // Arrange
            RelationMatrix originalMatrix = MakeExtremelyEasyRelationMatrix();
            IPetriNet originalNet = MakeExtremelyEasyPetriNet();

            // Act
            RelationMatrix matrix = PetriNetAnalyzer.MakeRelationMatrix(originalNet);

            // Assert
            Assert.AreEqual(2, matrix.Activities.Count);
            foreach (string act in matrix.Activities)
            {
                Assert.IsTrue(originalMatrix.Activities.Contains(act));
            }
            Assert.AreEqual(1, matrix.StartActivities.Count);
            Assert.IsTrue(matrix.StartActivities.Contains("a"));
            Assert.AreEqual(1, matrix.EndActivities.Count);
            Assert.IsTrue(matrix.EndActivities.Contains("b"));

            foreach (string actI in matrix.Activities)
            {
                foreach (string actJ in matrix.Activities)
                {
                    Assert.AreEqual(originalMatrix.Footprint[originalMatrix.ActivityIndices[actI], originalMatrix.ActivityIndices[actJ]],
                        matrix.Footprint[matrix.ActivityIndices[actI], matrix.ActivityIndices[actJ]]);
                }
            }

        }

        [TestMethod, Timeout(1000)]
        public void AnalyzeHardPetriNetTest()
        {
            // Arrange
            RelationMatrix originalMatrix = MakeHardRelationMatrix();
            IPetriNet originalNet = MakeHardPetriNet();

            // Act
            RelationMatrix matrix = PetriNetAnalyzer.MakeRelationMatrix(originalNet);

            // Assert
            Assert.AreEqual(7, matrix.Activities.Count);
            foreach (string act in matrix.Activities)
            {
                Assert.IsTrue(originalMatrix.Activities.Contains(act));
            }
            Assert.AreEqual(1, matrix.StartActivities.Count);
            Assert.IsTrue(matrix.StartActivities.Contains("a"));
            Assert.AreEqual(1, matrix.EndActivities.Count);
            Assert.IsTrue(matrix.EndActivities.Contains("g"));

            foreach (string actI in matrix.Activities)
            {
                foreach (string actJ in matrix.Activities)
                {
                    Assert.AreEqual(originalMatrix.Footprint[originalMatrix.ActivityIndices[actI], originalMatrix.ActivityIndices[actJ]],
                        matrix.Footprint[matrix.ActivityIndices[actI], matrix.ActivityIndices[actJ]]);
                }
            }
        }

        [TestMethod, Timeout(1000)]
        public void AnalyzeVeryHardPetriNetTest()
        {
            // Arrange
            RelationMatrix originalMatrix = MakeVeryHardRelationMatrix();
            IPetriNet originalNet = MakeVeryHardPetriNet();

            // Act
            RelationMatrix matrix = PetriNetAnalyzer.MakeRelationMatrix(originalNet);

            // Assert
            Assert.AreEqual(6, matrix.Activities.Count);
            foreach (string act in matrix.Activities)
            {
                Assert.IsTrue(originalMatrix.Activities.Contains(act));
            }
            Assert.AreEqual(1, matrix.StartActivities.Count);
            Assert.IsTrue(matrix.StartActivities.Contains("a"));
            Assert.AreEqual(1, matrix.EndActivities.Count);
            Assert.IsTrue(matrix.EndActivities.Contains("f"));

            foreach (string actI in matrix.Activities)
            {
                foreach (string actJ in matrix.Activities)
                {
                    Assert.AreEqual(originalMatrix.Footprint[originalMatrix.ActivityIndices[actI], originalMatrix.ActivityIndices[actJ]],
                        matrix.Footprint[matrix.ActivityIndices[actI], matrix.ActivityIndices[actJ]]);
                }
            }
        }

        [TestMethod]
        public void AnalyzeCyclePetriNetTest()
        {
            // Arrange
            RelationMatrix originalMatrix = MakeCycleNetRelationMatrix();
            IPetriNet originalNet = MakeCycleNetPetriNet();

            // Act
            RelationMatrix matrix = PetriNetAnalyzer.MakeRelationMatrix(originalNet);

            // Assert
            Assert.AreEqual(5, matrix.Activities.Count);
            foreach (string act in matrix.Activities)
            {
                Assert.IsTrue(originalMatrix.Activities.Contains(act));
            }
            Assert.AreEqual(1, matrix.StartActivities.Count);
            Assert.IsTrue(matrix.StartActivities.Contains("a"));
            Assert.AreEqual(1, matrix.EndActivities.Count);
            Assert.IsTrue(matrix.EndActivities.Contains("e"));

            foreach (string actI in matrix.Activities)
            {
                foreach (string actJ in matrix.Activities)
                {
                    Assert.AreEqual(originalMatrix.Footprint[originalMatrix.ActivityIndices[actI], originalMatrix.ActivityIndices[actJ]],
                        matrix.Footprint[matrix.ActivityIndices[actI], matrix.ActivityIndices[actJ]]);
                }
            }
        }
    }
}
