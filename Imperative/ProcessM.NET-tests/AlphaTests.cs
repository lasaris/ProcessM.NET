using Microsoft.VisualStudio.TestTools.UnitTesting;
using ProcessM.NET.Discovery.Alpha;
using ProcessM.NET.Import;
using ProcessM.NET.Model.BasicPetriNet;
using ProcessM.NET.Model.DataAnalysis;
using System.Collections.Generic;
using System.IO;
using ProcessM.NET.Model;
using LogImport.Models;

namespace ProcessM.NETtests
{
    [TestClass]
    public class AlphaTests : TestBase
    {
        private IPetriNet MakeEasyPetriNet()
        {
            IPlace p0 = new Place("p0");
            IPlace p1 = new Place("p1");
            IPlace p2 = new Place("p2");
            IPlace p3 = new Place("p3");

            ITransition t0 = new Transition("t0", "a");
            ITransition t1 = new Transition("t1", "b");
            ITransition t2 = new Transition("t2", "c");
            ITransition t3 = new Transition("t3", "d");

            t0.InputPlaces.Add(p0);
            t0.OutputPlaces.Add(p1);
            t1.InputPlaces.Add(p1);
            t1.OutputPlaces.Add(p2);
            t2.InputPlaces.Add(p2);
            t2.OutputPlaces.Add(p3);
            t3.InputPlaces.Add(p1);
            t3.OutputPlaces.Add(p2);

            IPetriNet net = new PetriNet(new List<ITransition>() { t0, t1, t2, t3 },
                new List<IPlace>() { p0, p1, p2, p3 },
                p0, p3);
            return net;
        }

        [TestMethod]
        public void MakeEasyPetriNetTest()
        {
            // Arrange
            using FileStream fs = File.Open(easyCsv, FileMode.Open);
            ImportedEventLog elog = CSVImport.MakeDataFrame(fs);
            elog.Activity = easyCsvActivity;
            elog.CaseId = easyCsvCaseId;
            WorkflowLog wlog = new WorkflowLog(elog);
            RelationMatrix matrix = new RelationMatrix(wlog);
            IPetriNet exampleNet = MakeEasyPetriNet();

            // Act
            IPetriNet madeNet = Alpha.MakePetriNet(matrix);

            // Assert
            Assert.IsNotNull(exampleNet);
            Assert.AreEqual(exampleNet.EndPlace.Id, madeNet.EndPlace.Id);
            Assert.AreEqual(exampleNet.StartPlace.Id, madeNet.StartPlace.Id);
            Assert.AreEqual(exampleNet.Places.Count, madeNet.Places.Count);
            Assert.AreEqual(exampleNet.Transitions.Count, madeNet.Transitions.Count);

            foreach (IPlace p in exampleNet.Places)
            {
                Assert.IsTrue(madeNet.Places.Exists(a => a.Id == p.Id));
            }
            foreach (ITransition t in exampleNet.Transitions)
            {
                Assert.IsTrue(madeNet.Transitions.Exists(a => a.Id == t.Id &&
                a.Activity == t.Activity &&
                a.InputPlaces.Count == t.InputPlaces.Count &&
                a.OutputPlaces.Count == t.OutputPlaces.Count));
            }
        }

        [TestMethod]
        public void MakeHardPetriNetTest()
        {
            // Arrange
            using FileStream hardCsvFs = File.Open(hardCsv, FileMode.Open);
            ImportedEventLog elog = CSVImport.MakeDataFrame(hardCsvFs);
            elog.Activity = hardCsvActivity;
            elog.CaseId = hardCsvCaseId;
            WorkflowLog wlog = new WorkflowLog(elog);
            RelationMatrix matrix = new RelationMatrix(wlog);
            using FileStream hardPnmlFs = File.Open(hardPnml, FileMode.Open);
            IPetriNet exampleNet = PNMLImport.Deserialize(hardPnmlFs);

            // Act
            IPetriNet madeNet = Alpha.MakePetriNet(matrix);

            // Assert
            Assert.IsNotNull(exampleNet);
            Assert.AreEqual(exampleNet.EndPlace.Id, madeNet.EndPlace.Id);
            Assert.AreEqual(exampleNet.StartPlace.Id, madeNet.StartPlace.Id);
            Assert.AreEqual(exampleNet.Places.Count, madeNet.Places.Count);
            Assert.AreEqual(exampleNet.Transitions.Count, madeNet.Transitions.Count);

            foreach (IPlace p in exampleNet.Places)
            {
                Assert.IsTrue(madeNet.Places.Exists(a => a.Id == p.Id));
            }
            foreach (ITransition t in exampleNet.Transitions)
            {
                Assert.IsTrue(madeNet.Transitions.Exists(a => a.Id == t.Id &&
                a.Activity == t.Activity &&
                a.InputPlaces.Count == t.InputPlaces.Count &&
                a.OutputPlaces.Count == t.OutputPlaces.Count));
            }
        }

        [TestMethod]
        public void MakeEmptyPetriNetTest()
        {
            // Arrange
            List<string> activities = new List<string>() { "wake up", "have coffee", "have tea", "work", "go home", "go sleep", "play witcher" };
            HashSet<string> startActivities = new HashSet<string>() { "wake up" };
            HashSet<string> endActivities = new HashSet<string>() { "go sleep", "play witcher" };
            RelationMatrix matrix = new RelationMatrix(activities, startActivities, endActivities);

            // Act
            IPetriNet madeNet = Alpha.MakePetriNet(matrix);

            // Assert
            Assert.IsNotNull(madeNet);
            Assert.AreEqual("p1", madeNet.EndPlace.Id);
            Assert.AreEqual("p0", madeNet.StartPlace.Id);
            Assert.AreEqual(2, madeNet.Places.Count);
            Assert.AreEqual(7, madeNet.Transitions.Count);
        }

        [TestMethod]
        public void MakeVeryHardPetriNetTest()
        {
            // Arrange
            using FileStream csvFs = File.Open(veryHardCsv, FileMode.Open);
            ImportedEventLog elog = CSVImport.MakeDataFrame(csvFs);
            elog.Activity = veryHardCsvActivity;
            elog.CaseId = veryHardCsvCaseId;
            WorkflowLog wlog = new WorkflowLog(elog);
            RelationMatrix matrix = new RelationMatrix(wlog);
            using FileStream pnmlFs = File.Open(veryHardPnml, FileMode.Open);
            IPetriNet exampleNet = PNMLImport.Deserialize(pnmlFs);

            // Act
            IPetriNet madeNet = Alpha.MakePetriNet(matrix);

            // Assert
            Assert.IsNotNull(exampleNet);
            Assert.AreEqual(exampleNet.EndPlace.Id, madeNet.EndPlace.Id);
            Assert.AreEqual(exampleNet.StartPlace.Id, madeNet.StartPlace.Id);
            Assert.AreEqual(exampleNet.Places.Count, madeNet.Places.Count);
            Assert.AreEqual(exampleNet.Transitions.Count, madeNet.Transitions.Count);

            foreach (IPlace p in exampleNet.Places)
            {
                Assert.IsTrue(madeNet.Places.Exists(a => a.Id == p.Id));
            }
            foreach (ITransition t in exampleNet.Transitions)
            {
                Assert.IsTrue(madeNet.Transitions.Exists(a => a.Id == t.Id &&
                a.Activity == t.Activity &&
                a.InputPlaces.Count == t.InputPlaces.Count &&
                a.OutputPlaces.Count == t.OutputPlaces.Count));
            }
        }

        [TestMethod]
        public void MakePetriNetWithCycleTest()
        {
            // Arrange
            using FileStream cycleNetCsvfs = File.Open(cycleNetCsv, FileMode.Open);
            ImportedEventLog elog = CSVImport.MakeDataFrame(cycleNetCsvfs);
            elog.Activity = cycleNetCsvActivity;
            elog.CaseId = cycleNetCsvCaseId;
            WorkflowLog wlog = new WorkflowLog(elog);
            RelationMatrix matrix = new RelationMatrix(wlog);
            using FileStream cycleNetPnmlFs = File.Open(cycleNetPnml, FileMode.Open);
            IPetriNet exampleNet = PNMLImport.Deserialize(cycleNetPnmlFs);

            // Act
            IPetriNet madeNet = Alpha.MakePetriNet(matrix);

            // Assert
            Assert.IsNotNull(exampleNet);
            Assert.AreEqual(exampleNet.EndPlace.Id, madeNet.EndPlace.Id);
            Assert.AreEqual(exampleNet.StartPlace.Id, madeNet.StartPlace.Id);
            Assert.AreEqual(exampleNet.Places.Count, madeNet.Places.Count);
            Assert.AreEqual(exampleNet.Transitions.Count, madeNet.Transitions.Count);

            foreach (IPlace p in exampleNet.Places)
            {
                Assert.IsTrue(madeNet.Places.Exists(a => a.Id == p.Id));
            }
            foreach (ITransition t in exampleNet.Transitions)
            {
                Assert.IsTrue(madeNet.Transitions.Exists(a => a.Id == t.Id &&
                a.Activity == t.Activity &&
                a.InputPlaces.Count == t.InputPlaces.Count &&
                a.OutputPlaces.Count == t.OutputPlaces.Count));
            }
        }
    }
}
