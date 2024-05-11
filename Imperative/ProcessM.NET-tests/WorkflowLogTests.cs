using LogImport.Exceptions;
using LogImport.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using ProcessM.NET.Import;
using ProcessM.NET.Model.DataAnalysis;
using System.IO;

namespace ProcessM.NETtests
{
    [TestClass]
    public class WorkflowLogTests : TestBase
    {
        [TestMethod]
        public void ImportedEventLogSetInvalidValuesTest()
        {
            // Arrange
            using FileStream fs = File.Open(timestampedCsv, FileMode.Open);
            ImportedEventLog elog = CSVImport.MakeDataFrame(fs);

            // Act and assert
            Assert.ThrowsException<IncorrectIndexException>(() => elog.Activity = 4);
            Assert.ThrowsException<IncorrectIndexException>(() => elog.CaseId = 4);
            Assert.ThrowsException<IncorrectIndexException>(() => elog.Timestamp = 4);
            Assert.IsNull(elog.Timestamp);
        }

        [TestMethod]
        public void WorkflowLogBasicTest()
        {
            // Arrange
            using FileStream fs = File.Open(easyCsv, FileMode.Open);
            ImportedEventLog elog = CSVImport.MakeDataFrame(fs);
            elog.Activity = easyCsvActivity;
            elog.CaseId = easyCsvCaseId;

            // Act
            WorkflowLog wlog = new WorkflowLog(elog);

            // Assert
            Assert.AreEqual(wlog.WorkflowTraces[0].CaseId, "1");
            Assert.AreEqual(wlog.WorkflowTraces[1].CaseId, "2");
            Assert.AreEqual(wlog.WorkflowTraces[0].Activities[0], "a");
            Assert.AreEqual(wlog.WorkflowTraces[0].Activities[1], "b");
            Assert.AreEqual(wlog.WorkflowTraces[0].Activities[2], "c");
            Assert.AreEqual(wlog.WorkflowTraces[1].Activities[0], "a");
            Assert.AreEqual(wlog.WorkflowTraces[1].Activities[1], "d");
            Assert.AreEqual(wlog.WorkflowTraces[1].Activities[2], "c");
        }

        [TestMethod]
        public void WorkflowLogTimestampedTest()
        {
            // Arrange
            using FileStream fs = File.Open(timestampedCsv, FileMode.Open);
            ImportedEventLog elog = CSVImport.MakeDataFrame(fs);
            elog.Activity = timestampedCsvActivity;
            elog.CaseId = timestampedCsvCaseId;
            elog.Timestamp = timestampedCsvTimestamp;

            // Act
            WorkflowLog wlog = new WorkflowLog(elog);

            // Assert
            Assert.AreEqual(wlog.WorkflowTraces[0].CaseId, "1");
            Assert.AreEqual(wlog.WorkflowTraces[1].CaseId, "2");
            Assert.AreEqual(wlog.WorkflowTraces[0].Activities[0], "a");
            Assert.AreEqual(wlog.WorkflowTraces[0].Activities[1], "b");
            Assert.AreEqual(wlog.WorkflowTraces[0].Activities[2], "c");
            Assert.AreEqual(wlog.WorkflowTraces[1].Activities[0], "a");
            Assert.AreEqual(wlog.WorkflowTraces[1].Activities[1], "d");
            Assert.AreEqual(wlog.WorkflowTraces[1].Activities[2], "c");
        }
    }
}
