using Microsoft.VisualStudio.TestTools.UnitTesting;
using ProcessM.NET.ConformanceChecking.TokenBasedReplay;
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
    public class TokenBasedReplayTests
    {
        static readonly string workingDirectory = Environment.CurrentDirectory;
        static readonly string projectDirectory = Directory.GetParent(workingDirectory).Parent.Parent.FullName;

        static readonly string separator = System.IO.Path.DirectorySeparatorChar.ToString();
        readonly string hardCsv = projectDirectory + separator + "Files" + separator + "alpha.csv";
        readonly string tamperedHardCsv = projectDirectory + separator + "Files" + separator + "tamperedAlpha.csv";
        readonly string randomLog = projectDirectory + separator + "Files" + separator + "randomLog.csv";

        [TestMethod]
        public void CompareLogWithAccordingPetriNetTest()
        {
            // Arrange
            using FileStream fs = File.Open(hardCsv, FileMode.Open);
            ImportedEventLog elog = CSVImport.MakeDataFrame(fs);
            elog.SetActivity("act");
            elog.SetCaseId("id");
            WorkflowLog wlog = new WorkflowLog(elog);
            RelationMatrix matrix = new RelationMatrix(wlog);
            IPetriNet madeNet = Alpha.MakePetriNet(matrix);

            // Act
            double fitness = Computations.ComputeFitness(elog, madeNet);

            // Assert
            Assert.AreEqual(1.0, fitness);
        }

        [TestMethod]
        public void CompareMildlyTamperedLogWithHardPetriNetTest()
        {
            // Arrange
            using FileStream hardFs = File.Open(hardCsv, FileMode.Open);
            ImportedEventLog elog = CSVImport.MakeDataFrame(hardFs);
            elog.SetActivity("act");
            elog.SetCaseId("id");
            WorkflowLog wlog = new WorkflowLog(elog);
            RelationMatrix matrix = new RelationMatrix(wlog);
            IPetriNet madeNet = Alpha.MakePetriNet(matrix);

            using FileStream tamperedHardFs = File.Open(tamperedHardCsv, FileMode.Open);
            ImportedEventLog tamperedLog = CSVImport.MakeDataFrame(tamperedHardFs);
            tamperedLog.SetActivity("act");
            tamperedLog.SetCaseId("id");

            // Act
            double fitness = Computations.ComputeFitness(tamperedLog, madeNet);

            // Assert
            Assert.AreEqual(96, (int)(fitness*100));
        }

        [TestMethod]
        public void CompareCompletelyDifferentLogWithHardPetriNetTest()
        {
            // Arrange
            using FileStream fs = File.Open(hardCsv, FileMode.Open);
            ImportedEventLog elog = CSVImport.MakeDataFrame(fs);
            elog.SetActivity("act");
            elog.SetCaseId("id");
            WorkflowLog wlog = new WorkflowLog(elog);
            RelationMatrix matrix = new RelationMatrix(wlog);
            IPetriNet madeNet = Alpha.MakePetriNet(matrix);

            using FileStream randomLogFs = File.Open(randomLog, FileMode.Open);
            ImportedEventLog tamperedLog = CSVImport.MakeDataFrame(randomLogFs);
            tamperedLog.SetActivity("act");
            tamperedLog.SetCaseId("id");

            // Act
            double fitness = Computations.ComputeFitness(tamperedLog, madeNet);

            // Assert
            Assert.AreEqual(0.0, fitness);
        }

    }
}
