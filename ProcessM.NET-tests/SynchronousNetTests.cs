using System;
using System.Collections;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using ProcessM.NET.ConformanceChecking.Alignments;
using ProcessM.NET.Discovery.HeuristicMiner;
using ProcessM.NET.Import;
using ProcessM.NET.Model;
using ProcessM.NET.Model.BasicPetriNet;
using ProcessM.NET.Model.CausalNet;
using ProcessM.NET.Model.DataAnalysis;
using ProcessM.NET.Model.SynchronousProductNet;

namespace ProcessM.NETtests
{
    [TestClass]
    public class SynchronousNetTests : TestBase
    {
        [TestMethod]
        public void SyncNetEasy()
        {
            // Arrange
            ImportedEventLog elog = CSVImport.MakeDataFrame(heuristicCsv);
            elog.SetActivity("act");
            elog.SetCaseId("id");
            WorkflowLog wlog = new WorkflowLog(elog);
            var tNet = AlignmentUtils.MakePNetFromTrace(wlog.WorkflowTraces[23]);
            var pNet = CNetUtils.ConvertCNetToPetriNet(HeuristicMiner.MineCNet(wlog));

            // Act
            var syncNet = new SynchronousProductNet(tNet, pNet);

            // Assert
            Assert.AreEqual(syncNet.Places.Count, pNet.Places.Count + tNet.Places.Count);
            Assert.AreEqual(pNet.Transitions.Count + 2 * tNet.Transitions.Count, syncNet.Transitions.Count);
            Assert.IsTrue(syncNet.EndPlaces.SetEquals(new HashSet<IPlace> { tNet.EndPlace, pNet.EndPlace }));
            Assert.IsTrue(syncNet.StartPlaces.SetEquals(new HashSet<IPlace> { tNet.StartPlace, pNet.StartPlace }));
        }

        [TestMethod]
        public void SyncNetHard()
        {
            // Arrange
            ImportedEventLog elog = CSVImport.MakeDataFrame(hardCsv);
            elog.SetActivity("act");
            elog.SetCaseId("id");
            WorkflowLog wlog = new WorkflowLog(elog);
            var tNet = AlignmentUtils.MakePNetFromTrace(wlog.WorkflowTraces[23]);
            var pNet = CNetUtils.ConvertCNetToPetriNet(HeuristicMiner.MineCNet(wlog));

            // Act
            var syncNet = new SynchronousProductNet(tNet, pNet);

            // Assert
            Assert.AreEqual(syncNet.Places.Count, pNet.Places.Count + tNet.Places.Count);
            Assert.AreEqual(pNet.Transitions.Count + 2 * tNet.Transitions.Count, syncNet.Transitions.Count);
            Assert.IsTrue(syncNet.EndPlaces.SetEquals(new HashSet<IPlace> { tNet.EndPlace, pNet.EndPlace }));
            Assert.IsTrue(syncNet.StartPlaces.SetEquals(new HashSet<IPlace> { tNet.StartPlace, pNet.StartPlace }));
        }

        [TestMethod]
        public void SyncNetAdvancedCustom()
        {
            // Arrange
            var trace = new WorkflowTrace("0");
            trace.Activities.Add("register");
            trace.Activities.Add("decide");
            trace.Activities.Add("register");
            trace.Activities.Add("send money");
            trace.Activities.Add("inform acceptance");
            var tNet = AlignmentUtils.MakePNetFromTrace(trace);

            List<ITransition> transitions = new List<ITransition>();
            List<IPlace> places = new List<IPlace>();
            for(int i = 1; i < 13; i++)
                places.Add(new Place("p" + i));
            
            transitions.Add(new Transition("t1", "register"));
            transitions[^1].InputPlaces.Add(places[0]);
            transitions[^1].OutputPlaces.Add(places[1]);
            transitions[^1].OutputPlaces.Add(places[3]);

            transitions.Add(new Transition("t2", "check history"));
            transitions[^1].InputPlaces.Add(places[1]);
            transitions[^1].OutputPlaces.Add(places[2]);

            transitions.Add(new Transition("t3", "check cause"));
            transitions[^1].InputPlaces.Add(places[3]);
            transitions[^1].OutputPlaces.Add(places[4]);

            transitions.Add(new Transition("t4", "decide"));
            transitions[^1].InputPlaces.Add(places[2]);
            transitions[^1].InputPlaces.Add(places[4]);
            transitions[^1].OutputPlaces.Add(places[5]);

            transitions.Add(new Transition("t5", ""));
            transitions[^1].ChangeVisibility();
            transitions[^1].InputPlaces.Add(places[5]);
            transitions[^1].OutputPlaces.Add(places[6]);
            transitions[^1].OutputPlaces.Add(places[8]);

            transitions.Add(new Transition("t6", "send money"));
            transitions[^1].InputPlaces.Add(places[6]);
            transitions[^1].OutputPlaces.Add(places[7]);

            transitions.Add(new Transition("t7", "inform acceptance"));
            transitions[^1].InputPlaces.Add(places[8]);
            transitions[^1].OutputPlaces.Add(places[9]);

            transitions.Add(new Transition("t8", "inform rejection"));
            transitions[^1].InputPlaces.Add(places[5]);
            transitions[^1].OutputPlaces.Add(places[10]);

            transitions.Add(new Transition("t9", ""));
            transitions[^1].ChangeVisibility();
            transitions[^1].InputPlaces.Add(places[7]);
            transitions[^1].InputPlaces.Add(places[9]);
            transitions[^1].OutputPlaces.Add(places[10]);

            transitions.Add(new Transition("t10", "archive"));
            transitions[^1].InputPlaces.Add(places[10]);
            transitions[^1].OutputPlaces.Add(places[^1]);

            PetriNet pNet = new PetriNet(transitions, places, places[0], places[^1]);

            // Act
            SynchronousProductNet syncNet = new SynchronousProductNet(tNet, pNet);

            // Assert
            Assert.AreEqual(syncNet.Places.Count, pNet.Places.Count + tNet.Places.Count);
            Assert.AreEqual(pNet.Transitions.Count + 2 * tNet.Transitions.Count, syncNet.Transitions.Count);
            Assert.IsTrue(syncNet.EndPlaces.SetEquals(new HashSet<IPlace> {tNet.EndPlace, pNet.EndPlace}));
            Assert.IsTrue(syncNet.StartPlaces.SetEquals(new HashSet<IPlace> { tNet.StartPlace, pNet.StartPlace }));
        }
    }
}
