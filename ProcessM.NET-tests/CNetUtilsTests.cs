using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using ProcessM.NET.Discovery.HeuristicMiner;
using ProcessM.NET.Import;
using ProcessM.NET.Model;
using ProcessM.NET.Model.BasicPetriNet;
using ProcessM.NET.Model.CausalNet;
using ProcessM.NET.Model.DataAnalysis;

namespace ProcessM.NETtests
{
    [TestClass]
    public class CNetUtilsTests : TestBase
    {
        [TestMethod]
        public void ConvertEasyCNetToPetriNetTest()
        {
            // Arrange
            ImportedEventLog elog = CSVImport.MakeDataFrame(heuristicCsv);
            elog.SetActivity("act");
            elog.SetCaseId("id");
            WorkflowLog wlog = new WorkflowLog(elog);
            CNet causalNet = new CNet(wlog, new HeuristicMinerSettings());

            // Act
            PetriNet petriNet = CNetUtils.ConvertCNetToPetriNet(causalNet);

            // Assert
            Assert.AreEqual("p0", petriNet.StartPlace.Id);
            Assert.AreEqual("p" + (2 * causalNet.EndActivity.Id + 1), petriNet.EndPlace.Id);
            Assert.AreEqual(10, petriNet.Places.Count);
            Assert.AreEqual(13, petriNet.Transitions.Count);
            // 8 invisible transitions
            Assert.AreEqual(8, petriNet.Transitions.Count(t => t.Invisible));
        }

        [TestMethod]
        public void ConvertHardCNetToPetriNetTest()
        {
            // Arrange
            ImportedEventLog elog = CSVImport.MakeDataFrame(hardCsv);
            elog.SetActivity("act");
            elog.SetCaseId("id");
            WorkflowLog wlog = new WorkflowLog(elog);
            CNet causalNet = new CNet(wlog, new HeuristicMinerSettings());

            // Act
            PetriNet petriNet = CNetUtils.ConvertCNetToPetriNet(causalNet);

            // Assert
            Assert.AreEqual("p0", petriNet.StartPlace.Id);
            Assert.AreEqual("p" + (2 * causalNet.EndActivity.Id + 1), petriNet.EndPlace.Id);
            Assert.AreEqual(18, petriNet.Places.Count);
            Assert.AreEqual(21, petriNet.Transitions.Count);
            // 12 invisible transitions
            Assert.AreEqual(12, petriNet.Transitions.Count(t => t.Invisible));
        }
    }
}
