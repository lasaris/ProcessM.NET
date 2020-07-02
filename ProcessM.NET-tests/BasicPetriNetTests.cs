using Microsoft.VisualStudio.TestTools.UnitTesting;
using ProcessM.NET.Model;
using ProcessM.NET.Model.BasicPetriNet;
using System;
using System.Collections.Generic;

namespace ProcessM.NETtests
{
    [TestClass]
    public class BasicPetriNetTests
    {
        private static PetriNet MakeExamplePetriNet()
        {
            IPlace p1 = new Place("start place");
            IPlace p2 = new Place("middle place");
            IPlace p3 = new Place("end place");
            ITransition t1 = new Transition("t1", "start transition");
            ITransition t2 = new Transition("t2", "end transition");
            t1.InputPlaces.Add(p1);
            t1.OutputPlaces.Add(p2);
            t2.InputPlaces.Add(p2);
            t2.OutputPlaces.Add(p3);
            List<IPlace> places = new List<IPlace>() { p1, p2, p3 };
            List<ITransition> transitions = new List<ITransition>() { t1, t2 };

            return new PetriNet(transitions, places, p1, p3);
        }

        [TestMethod]
        public void GetTransitionValidTest()
        {
            // Arrange
            IPlace p1 = new Place("start place");
            IPlace p2 = new Place("middle place");
            IPlace p3 = new Place("end place");
            ITransition t1 = new Transition("t1", "start transition");
            ITransition t2 = new Transition("t2", "end transition");
            t1.InputPlaces.Add(p1);
            t1.OutputPlaces.Add(p2);
            t2.InputPlaces.Add(p2);
            t2.OutputPlaces.Add(p3);
            List<IPlace> places = new List<IPlace>() { p1, p2, p3 };
            List<ITransition> transitions = new List<ITransition>() { t1, t2 };

            PetriNet net = new PetriNet(transitions, places, p1, p3);

            // Act
            ITransition foundTransition = net.GetTransition("end transition");

            // Assert
            Assert.AreEqual(t2.Id, foundTransition.Id);
            Assert.AreEqual(t2.Activity, foundTransition.Activity);
            Assert.AreEqual(t2.InputPlaces.Count, foundTransition.InputPlaces.Count);
            Assert.AreEqual(t2.OutputPlaces.Count, foundTransition.OutputPlaces.Count);
            for (int i = 0; i < t2.InputPlaces.Count; i++)
            {
                Assert.AreEqual(t2.InputPlaces[i].Id, foundTransition.InputPlaces[i].Id);
            }
            for (int i = 0; i < t2.OutputPlaces.Count; i++)
            {
                Assert.AreEqual(t2.OutputPlaces[i].Id, foundTransition.OutputPlaces[i].Id);
            }
        }

        [TestMethod]
        public void GetTransitionInvalidTest()
        {
            // Arrange
            PetriNet net = MakeExamplePetriNet();

            // Act
            ITransition foundTransition = net.GetTransition("invalid transition");

            // Assert
            Assert.IsNull(foundTransition);
        }

        [TestMethod]
        public void GetTransitionEmptyStringTest()
        {
            // Arrange
            PetriNet net = MakeExamplePetriNet();

            // Act
            ITransition foundTransition = net.GetTransition("");

            // Assert
            Assert.IsNull(foundTransition);
        }

        [TestMethod]
        public void GetTransitionNullStringTest()
        {
            // Arrange
            PetriNet net = MakeExamplePetriNet();

            // Act and assert
            Assert.ThrowsException<ArgumentNullException>(() => net.GetTransition(null));
        }

        [TestMethod]
        public void GetStartTransitionsTest()
        {
            // Arrange
            IPlace p1 = new Place("start place");
            IPlace p2 = new Place("middle place");
            IPlace p3 = new Place("end place");
            ITransition t1 = new Transition("t1", "start transition");
            ITransition t2 = new Transition("t2", "end transition");
            t1.InputPlaces.Add(p1);
            t1.OutputPlaces.Add(p2);
            t2.InputPlaces.Add(p2);
            t2.OutputPlaces.Add(p3);
            List<IPlace> places = new List<IPlace>() { p1, p2, p3 };
            List<ITransition> transitions = new List<ITransition>() { t1, t2 };

            List<ITransition> startTransitions = new List<ITransition>() { t1 };
            PetriNet net = new PetriNet(transitions, places, p1, p3);

            // Act
            List<ITransition> foundTransitions = net.GetStartTransitions();

            // Assert
            Assert.AreEqual(startTransitions.Count, foundTransitions.Count);
            for (int i = 0; i < startTransitions.Count; i++)
            {
                Assert.AreEqual(startTransitions[i].Activity, foundTransitions[i].Activity);
                Assert.AreEqual(startTransitions[i].InputPlaces.Count, foundTransitions[i].InputPlaces.Count);
                Assert.AreEqual(startTransitions[i].OutputPlaces.Count, foundTransitions[i].OutputPlaces.Count);
                for (int j = 0; j < startTransitions[i].InputPlaces.Count; j++)
                {
                    Assert.AreEqual(startTransitions[i].InputPlaces[j].Id, foundTransitions[i].InputPlaces[j].Id);
                }
                for (int j = 0; j < startTransitions[i].OutputPlaces.Count; j++)
                {
                    Assert.AreEqual(startTransitions[i].OutputPlaces[j].Id, foundTransitions[i].OutputPlaces[j].Id);
                }
            }
        }

        [TestMethod]
        public void GetStartTransitionsEmptyNetTest()
        {
            // Arrange
            List<IPlace> places = new List<IPlace>();
            List<ITransition> transitions = new List<ITransition>();

            PetriNet net = new PetriNet(transitions, places, null, null);

            // Act
            List<ITransition> foundTransitions = net.GetStartTransitions();

            // Assert
            Assert.AreEqual(foundTransitions.Count, 0);
        }
    }
}
