using Microsoft.VisualStudio.TestTools.UnitTesting;
using ProcessM.NET.Export;
using ProcessM.NET.Import;
using ProcessM.NET.Model;
using ProcessM.NET.Model.BasicPetriNet;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace ProcessM.NETtests
{
    [TestClass]
    public class ImportAndExportTests
    {
        static readonly string workingDirectory = Environment.CurrentDirectory;
        static readonly string projectDirectory = Directory.GetParent(workingDirectory).Parent.Parent.FullName;

        static readonly string separator = System.IO.Path.DirectorySeparatorChar.ToString();
        readonly string CSVPath = projectDirectory + separator + "Files" + separator + "alpha2.csv";
        readonly string CSVPathSemicolon = projectDirectory + separator + "Files" + separator + "alpha1.csv";
        readonly string PNMLpath = projectDirectory + separator + "Files" + separator + "easynet.xml";
        
        private string MakeEasyDOT()
        {
            return "digraph G{\n\tsubgraph place {\n\t\tgraph [shape = circle, color = gray];\n\t\tnode [shape = circle, fixedsize = true, width = 2];\n\t\t"
                    + "\"p0\";\n\t\t\"p1\";\n\t\t\"p2\";\n\t\t\"p3\";\n\t}\n\tsubgraph transitions {\n\t\tnode [shape = rect, height = 0.2, width = 2];\n\t\t"
                    + "\"a\";\n\t\t\"b\";\n\t\t\"c\";\n\t\t\"d\";\n\t}\n\t\"p0\" -> \"a\";\n\t\"a\" -> \"p1\";\n\t\"p1\" -> \"b\";\n\t\"b\" -> \"p2\";\n\t"
                    + "\"p2\" -> \"c\";\n\t\"c\" -> \"p3\";\n\t\"p1\" -> \"d\";\n\t\"d\" -> \"p2\";\n}";
        }

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

            // Act
            importedEventLog = CSVImport.MakeDataFrame(CSVPath);

            // Assert
            Assert.IsNotNull(importedEventLog);
        }

        [TestMethod]
        public void CSVImportInvalidTest()
        {
            // Arrange
            string path = "." + separator + "thisFileDoesNotExist.csv";

            // Act and Assert
            Assert.ThrowsException<ArgumentException>(() => CSVImport.MakeDataFrame(path));
        }

        [TestMethod]
        public void CSVImportValidNoHeadersTest()
        {
            // Arrange
            ImportedEventLog importedEventLog;

            // Act
            importedEventLog = CSVImport.MakeDataFrame(CSVPath, hasHeaders: false);

            // Assert
            Assert.IsNotNull(importedEventLog);
            Assert.AreEqual(importedEventLog.Contents.GetRow<string>(0).GetAt(0), "id");
        }

        [TestMethod]
        public void CSVImportValidDefinedCultureTest()
        {
            // Arrange
            ImportedEventLog importedEventLog;

            // Act
            importedEventLog = CSVImport.MakeDataFrame(CSVPath, culture: "en-US");

            // Assert
            Assert.IsNotNull(importedEventLog);
        }

        [TestMethod]
        public void CSVImportValidNoInferenceTest()
        {
            // Arrange
            ImportedEventLog importedEventLog;

            // Act
            importedEventLog = CSVImport.MakeDataFrame(CSVPath, inferTypes: false);

            // Assert
            Assert.IsNotNull(importedEventLog);
            Assert.AreEqual(importedEventLog.Contents.GetRow<string>(0).GetAt(0), "1");
        }

        [TestMethod]
        public void CSVImportValidSemicolonSeparatorTest()
        {
            // Arrange
            ImportedEventLog importedEventLog;

            // Act
            importedEventLog = CSVImport.MakeDataFrame(CSVPathSemicolon, separatorsString: ";");

            // Assert
            Assert.IsNotNull(importedEventLog);
        }

        [TestMethod]
        public void CSVImportValidLimitedRowsTest()
        {
            // Arrange
            ImportedEventLog importedEventLog;

            // Act
            importedEventLog = CSVImport.MakeDataFrame(CSVPath, maxRows: 2);

            // Assert
            Assert.IsNotNull(importedEventLog);
            Assert.AreEqual(importedEventLog.Contents.RowCount, 2);
        }

        [TestCategory("PNMLImport/Export tests")]
        [TestMethod]
        public void PNMLImportTest()
        {
            // Arrange
            IPetriNet loadedNet;
            IPetriNet exampleNet = MakeEasyPetriNet();

            // Act
            loadedNet = PNMLImport.Deserialize(PNMLpath);

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
        public void PNMLExportTest()
        {
            // Arrange
            IPetriNet loadedNet;
            IPetriNet exampleNet = MakeEasyPetriNet();

            // Act
            string filepath = "." + separator + PNMLExport.Serialize(exampleNet);
            loadedNet = PNMLImport.Deserialize(filepath);

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

            // Cleanup
            File.Delete(filepath);
        }

        [TestCategory("DOTExport tests")]
        [TestMethod]
        public void DOTExportImportTest()
        {
            // Arrange
            IPetriNet exampleNet = MakeEasyPetriNet();
            string exampleDot = MakeEasyDOT();

            // Act
            string filepath = DOTExport.Serialize(exampleNet);
            string loadedDot = File.ReadAllText("." + separator + filepath);

            // Assert
            Assert.AreEqual(exampleDot, loadedDot);

            // Cleanup
            File.Delete(filepath);
        }
    }
}
