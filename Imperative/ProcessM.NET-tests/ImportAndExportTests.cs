using LogImport.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using ProcessM.NET.Export;
using ProcessM.NET.Import;
using ProcessM.NET.Model;
using ProcessM.NET.Model.BasicPetriNet;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace ProcessM.NETtests
{
    [TestClass]
    public class ImportAndExportTests : TestBase
    {
        readonly string PNMLpath = projectDirectory + separator + "Files" + separator + "easynet.xml";

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

        [TestCategory("CSVImport tests")]
        [TestMethod]
        public void CSVImportValidTest()
        {
            // Arrange
            ImportedEventLog importedEventLog;
            using FileStream fs = File.Open(easyCsv, FileMode.Open);

            // Act
            importedEventLog = CSVImport.MakeDataFrame(fs);

            // Assert
            Assert.IsNotNull(importedEventLog);
        }

        [TestMethod]
        public void CSVImportValidNoHeadersTest()
        {
            // Arrange
            ImportedEventLog importedEventLog;
            using FileStream fs = File.Open(easyCsv, FileMode.Open);

            // Act
            importedEventLog = CSVImport.MakeDataFrame(fs, hasHeaders: false);

            // Assert
            Assert.IsNotNull(importedEventLog);
            Assert.AreEqual(importedEventLog.GetNthColumn(0)[0], "id");
        }

        [TestMethod]
        public void CSVImportValidSemicolonSeparatorTest()
        {
            // Arrange
            ImportedEventLog importedEventLog;
            using FileStream fs = File.Open(semicolonCsv, FileMode.Open);

            // Act
            importedEventLog = CSVImport.MakeDataFrame(fs);

            // Assert
            Assert.IsNotNull(importedEventLog);
        }


        [TestCategory("PNMLImport/Export tests")]
        [TestMethod]
        public void PNMLImportTest()
        {
            // Arrange
            IPetriNet loadedNet;
            IPetriNet exampleNet = MakeEasyPetriNet();
            using FileStream fs = File.Open(PNMLpath, FileMode.Open);

            // Act
            loadedNet = PNMLImport.Deserialize(fs);

            // Assert
            Assert.IsNotNull(loadedNet);
            Assert.AreEqual(loadedNet.EndPlace.Id, exampleNet.EndPlace.Id);
            Assert.AreEqual(loadedNet.StartPlace.Id, exampleNet.StartPlace.Id);
            Assert.AreEqual(loadedNet.Places.Count, exampleNet.Places.Count);
            Assert.AreEqual(loadedNet.Transitions.Count, exampleNet.Transitions.Count);

            foreach (IPlace p in loadedNet.Places)
            {
                Assert.IsTrue(exampleNet.Places.Exists(a => a.Id == p.Id));
            }
            foreach (ITransition t in loadedNet.Transitions)
            {
                Assert.IsTrue(exampleNet.Transitions.Exists(a => a.Id == t.Id &&
                a.Activity == t.Activity &&
                a.InputPlaces.Count == t.InputPlaces.Count &&
                a.OutputPlaces.Count == t.OutputPlaces.Count));
            }
        }

        [TestMethod]
        public void PNMLExportImportTest()
        {
            // Arrange
            IPetriNet loadedNet;
            IPetriNet exampleNet = MakeEasyPetriNet();

            // Act
            string pnmlString = PNMLExport.Serialize(exampleNet);
            var stream = new MemoryStream(Encoding.UTF8.GetBytes(pnmlString));
            loadedNet = PNMLImport.Deserialize(stream);

            // Assert
            Assert.IsNotNull(loadedNet);
            Assert.AreEqual(loadedNet.EndPlace.Id, exampleNet.EndPlace.Id);
            Assert.AreEqual(loadedNet.StartPlace.Id, exampleNet.StartPlace.Id);
            Assert.AreEqual(loadedNet.Places.Count, exampleNet.Places.Count);
            Assert.AreEqual(loadedNet.Transitions.Count, exampleNet.Transitions.Count);

            foreach (IPlace p in loadedNet.Places)
            {
                exampleNet.Places.Exists(a => a.Id == p.Id);
            }
            foreach (ITransition t in loadedNet.Transitions)
            {
                exampleNet.Transitions.Exists(a => a.Id == t.Id &&
                a.Activity == t.Activity &&
                a.InputPlaces.Count == t.InputPlaces.Count &&
                a.OutputPlaces.Count == t.OutputPlaces.Count);
            }
        }
    }
}
