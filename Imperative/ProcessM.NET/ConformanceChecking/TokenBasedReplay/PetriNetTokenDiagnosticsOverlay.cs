using ProcessM.NET.Discovery;
using ProcessM.NET.Model;
using ProcessM.NET.Model.DataAnalysis;
using System;
using System.Collections.Generic;
using System.Text;

namespace ProcessM.NET.ConformanceChecking.TokenBasedReplay
{
    /// <summary>
    /// This class is an overlay to a Petri Net, providing further diagnostics options needed for Token Based Replay fitness calculation.
    /// </summary>
    class PetriNetTokenDiagnosticsOverlay
    {
        IPetriNet PetriNet { get; }

        public Dictionary<string, PlaceTokenDiagnosticsOverlay> Diagnostics { get; }

        /// <summary>
        /// Finds start place and produces an initial token.
        /// </summary>
        private void SetupStartPlace()
        {
            PlaceTokenDiagnosticsOverlay startPlace = Diagnostics[PetriNet.StartPlace.Id];
            startPlace.ProduceToken();
        }

        /// <summary>
        /// Fires given transition (attempts to consume a token in all input places and produces a token in all output places).
        /// </summary>
        /// <param name="transition">A transition to be fired.</param>
        private void Fire(ITransition transition)
        {
            if (transition != null)
            {
                foreach (IPlace ip in transition.InputPlaces)
                {
                    PlaceTokenDiagnosticsOverlay inputPlace = Diagnostics[ip.Id];
                    inputPlace.ConsumeToken();
                }
                foreach (IPlace op in transition.OutputPlaces)
                {
                    PlaceTokenDiagnosticsOverlay outputPlace = Diagnostics[op.Id];
                    outputPlace.ProduceToken();
                }
            }
        }

        /// <summary>
        /// Goes through all places and sets all "active" tokens as Remaining.
        /// </summary>
        private void SetRemnants()
        {
            foreach (PlaceTokenDiagnosticsOverlay place in Diagnostics.Values)
            {
                place.SetRemaining();
            }
        }

        /// <summary>
        /// Attempts to consume a token in end place (every compliant trace should have a token only in the end place at its end).
        /// </summary>
        private void CleanUpEndPlace()
        {
            PlaceTokenDiagnosticsOverlay endPlace = Diagnostics[PetriNet.EndPlace.Id];
            endPlace.ConsumeToken();
        }

        /// <summary>
        /// Replays a given workflow trace through the Petri Net diagnostics overlay while setting diagnostics info for given trace.
        /// </summary>
        /// <param name="trace">A WorkflowTrace to be replayed.</param>
        public void ReplayTrace(WorkflowTrace trace)
        {
            SetupStartPlace();
            foreach (string activity in trace.Activities)
            {
                Fire(PetriNet.Transitions.Find(a => a.Activity == activity));
            }
            CleanUpEndPlace();
            SetRemnants();
        }

        public PetriNetTokenDiagnosticsOverlay(IPetriNet net)
        {
            PetriNet = net;
            Diagnostics = new Dictionary<string, PlaceTokenDiagnosticsOverlay>();
            foreach (IPlace p in net.Places)
            {
                Diagnostics.Add(p.Id, new PlaceTokenDiagnosticsOverlay());
            }
        }

    }
}
