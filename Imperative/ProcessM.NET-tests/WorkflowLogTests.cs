using Microsoft.VisualStudio.TestTools.UnitTesting;
using ProcessM.NET.Import;
using ProcessM.NET.Model;
using ProcessM.NET.Model.DataAnalysis;
using System;
using System.IO;

namespace ProcessM.NETtests
{
    [TestClass]
    public class WorkflowLogTests
    {
        static readonly string workingDirectory = Environment.CurrentDirectory;
        static readonly string projectDirectory = Directory.GetParent(workingDirectory).Parent.Parent.FullName;

        static readonly string separator = System.IO.Path.DirectorySeparatorChar.ToString();
        readonly string easyCsv = projectDirectory + separator + "Files" + separator + "alpha2.csv";
        readonly string timestampedCsv = projectDirectory + separator + "Files" + separator + "alpha3.csv";

        [TestMethod]
        public void ImportedEventLogSetInvalidValuesTest()
        {
            // Arrange
            using FileStream fs = File.Open(timestampedCsv, FileMode.Open);
            ImportedEventLog elog = CSVImport.MakeDataFrame(fs);

            // Act and assert
            Assert.IsFalse(elog.SetActivity("thisIsNotValidActivity"));
            Assert.IsFalse(elog.SetCaseId("thisIsNotValidCaseId"));
            Assert.IsFalse(elog.SetTimestamp("thisIsNotValidTimestamp"));
            Assert.IsNull(elog.Activity);
            Assert.IsNull(elog.CaseId);
            Assert.IsNull(elog.Timestamp);
        }

        [TestMethod]
        public void WorkflowLogBasicTest()
        {
            // Arrange
            using FileStream fs = File.Open(easyCsv, FileMode.Open);
            ImportedEventLog elog = CSVImport.MakeDataFrame(fs);
            elog.SetActivity("act");
            elog.SetCaseId("id");

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
            elog.SetActivity("act");
            elog.SetCaseId("id");
            elog.SetTimestamp("time");

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
