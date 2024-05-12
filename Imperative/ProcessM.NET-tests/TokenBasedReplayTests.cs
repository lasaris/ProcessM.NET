using LogImport.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using ProcessM.NET.ConformanceChecking.TokenBasedReplay;
using ProcessM.NET.Discovery.Alpha;
using ProcessM.NET.Import;
using ProcessM.NET.Model;
using ProcessM.NET.Model.DataAnalysis;
using System.IO;

namespace ProcessM.NETtests
{
    [TestClass]
    public class TokenBasedReplayTests : TestBase
    {

        [TestMethod]
        public void CompareLogWithAccordingPetriNetTest()
        {
            // Arrange
            using FileStream fs = File.Open(alphaCsv, FileMode.Open);
            ImportedEventLog elog = CSVImport.MakeDataFrame(fs);
            elog.Activity = alphaCsvActivity;
            elog.CaseId = alphaCsvCaseId;
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
            using FileStream hardFs = File.Open(alphaCsv, FileMode.Open);
            ImportedEventLog elog = CSVImport.MakeDataFrame(hardFs);
            elog.Activity = alphaCsvActivity;
            elog.CaseId = alphaCsvCaseId;
            WorkflowLog wlog = new WorkflowLog(elog);
            RelationMatrix matrix = new RelationMatrix(wlog);
            IPetriNet madeNet = Alpha.MakePetriNet(matrix);

            using FileStream tamperedHardFs = File.Open(tamperedHardCsv, FileMode.Open);
            ImportedEventLog tamperedLog = CSVImport.MakeDataFrame(tamperedHardFs);
            tamperedLog.Activity = tamperedHardCsvActivity;
            tamperedLog.CaseId = tamperedHardCsvCaseId;

            // Act
            double fitness = Computations.ComputeFitness(tamperedLog, madeNet);

            // Assert
            Assert.AreEqual(96, (int)(fitness * 100));
        }

        [TestMethod]
        public void CompareCompletelyDifferentLogWithHardPetriNetTest()
        {
            // Arrange
            using FileStream fs = File.Open(alphaCsv, FileMode.Open);
            ImportedEventLog elog = CSVImport.MakeDataFrame(fs);
            elog.Activity = alphaCsvActivity;
            elog.CaseId = alphaCsvCaseId;
            WorkflowLog wlog = new WorkflowLog(elog);
            RelationMatrix matrix = new RelationMatrix(wlog);
            IPetriNet madeNet = Alpha.MakePetriNet(matrix);

            using FileStream randomLogFs = File.Open(randomLog, FileMode.Open);
            ImportedEventLog tamperedLog = CSVImport.MakeDataFrame(randomLogFs);
            tamperedLog.Activity = tamperedHardCsvActivity;
            tamperedLog.CaseId = tamperedHardCsvCaseId;

            // Act
            double fitness = Computations.ComputeFitness(tamperedLog, madeNet);

            // Assert
            Assert.AreEqual(0.0, fitness);
        }

    }
}
