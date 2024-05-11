using LogImport.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using ProcessM.NET.ConformanceChecking.CausalFootprint;
using ProcessM.NET.Discovery.Alpha;
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
    public class FootprintComparerTests
    {
        static readonly string workingDirectory = Environment.CurrentDirectory;
        static readonly string projectDirectory = Directory.GetParent(workingDirectory).Parent.Parent.FullName;

        static readonly string separator = System.IO.Path.DirectorySeparatorChar.ToString();
        readonly string hardCsv = projectDirectory + separator + "Files" + separator + "alpha.csv";
        readonly string easyCsv = projectDirectory + separator + "Files" + separator + "alpha2.csv";

        readonly int easyCsvCaseIdCol = 0;
        readonly int easyCsvActivityCol = 1;
        readonly int hardCsvCaseIdCol = 0;
        readonly int hardCsvActivityCol = 1;

        private RelationMatrix MakeEasyRelationMatrix()
        {
            using FileStream fs = File.Open(easyCsv, FileMode.Open);
            var elog = CSVImport.MakeDataFrame(fs);
            elog.Activity = easyCsvActivityCol;
            elog.CaseId = easyCsvCaseIdCol;
            WorkflowLog wlog = new WorkflowLog(elog);
            return new RelationMatrix(wlog);
        }

        private RelationMatrix MakeEasyNonMatchingIndicesMatrix()
        {
            List<string> activities = new List<string>() { "c", "b", "a", "d" };
            HashSet<string> startActivities = new HashSet<string>() { "a" };
            HashSet<string> endActivities = new HashSet<string>() { "c" };
            RelationMatrix matrix = new RelationMatrix(activities, startActivities, endActivities);

            matrix.Footprint[0, 1] = Relation.Predecession; // d <- c
            matrix.Footprint[0, 3] = Relation.Predecession; // b <- c
            matrix.Footprint[1, 0] = Relation.Succession; // d -> c
            matrix.Footprint[1, 2] = Relation.Predecession; // a <- d
            matrix.Footprint[2, 1] = Relation.Succession; // a -> d
            matrix.Footprint[2, 3] = Relation.Succession; // a -> b
            matrix.Footprint[3, 0] = Relation.Succession; // b -> c
            matrix.Footprint[3, 2] = Relation.Predecession; // a <- b

            return matrix;
        }

        private RelationMatrix MakeHardRelationMatrix()
        {
            using FileStream fs = File.Open(hardCsv, FileMode.Open);
            var elog = CSVImport.MakeDataFrame(fs);
            elog.Activity = hardCsvActivityCol;
            elog.CaseId = hardCsvCaseIdCol;
            WorkflowLog wlog = new WorkflowLog(elog);
            return new RelationMatrix(wlog);
        }

        private IPetriNet MakeEasyPetriNet()
        {
            RelationMatrix matrix = MakeEasyRelationMatrix();

            return Alpha.MakePetriNet(matrix);
        }


        [TestMethod]
        public void CompareEasyPetriNetWithSameMatrixTest()
        {
            // Arrange
            RelationMatrix matrixA = MakeEasyRelationMatrix();
            IPetriNet net = MakeEasyPetriNet();
            RelationMatrix matrixB = PetriNetAnalyzer.MakeRelationMatrix(net);

            // Act
            double fitness = FootprintComparer.Compare(matrixA, matrixB);

            // Assert
            Assert.AreEqual(1.0, fitness);
        }

        [TestMethod]
        public void CompareDifferentMatricesTest()
        {
            // Arrange
            RelationMatrix matrixA = MakeEasyRelationMatrix();
            RelationMatrix matrixB = MakeHardRelationMatrix();

            // Act
            double fitness = FootprintComparer.Compare(matrixA, matrixB);

            // Assert
            Assert.AreNotEqual(1.0, fitness);
        }

        [TestMethod]
        public void AnalyzeMatricesWithNonMatchingIndicesTest()
        {
            // Arrange
            RelationMatrix matrixA = MakeEasyRelationMatrix();
            RelationMatrix matrixB = MakeEasyNonMatchingIndicesMatrix();

            // Act
            double fitness = FootprintComparer.Compare(matrixA, matrixB);

            // Assert
            Assert.AreEqual(1.0, fitness);

        }
    }
}
