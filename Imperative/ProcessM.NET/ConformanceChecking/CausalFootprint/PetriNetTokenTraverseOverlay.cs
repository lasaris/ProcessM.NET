using ProcessM.NET.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace ProcessM.NET.ConformanceChecking.CausalFootprint
{
    /// <summary>
    /// A class used as a Petri Net overlay for the purpouses of causal footprint comparing diagnostics.
    /// </summary>
    class PetriNetTokenTraverseOverlay
    {
        public IPetriNet PetriNet { get; }

        public List<TransitionTokenTraverseOverlay> TransitionsWithFootprints { get; }

        public List<PlaceTokenTraverseOverlay> PlacesWithFootprints { get; }

        public Dictionary<string, int> ActiveGlobalIdMonitor { get; } = new Dictionary<string, int>();

        int GlobalId { get; set; } = 0;

        /// <summary>
        /// Returns global ID and then increments it in the Petri Net overlay.
        /// </summary>
        /// <returns>String containing global ID to be used.</returns>
        private string GetNewGlobalId()
        {
            string oldId = "" + GlobalId;
            GlobalId = GlobalId++;
            return oldId;
        }

        /// <summary>
        /// Sets up place overlays in the Petri Net overlay based on places from given Petri Net.
        /// </summary>
        /// <param name="places">Places of given Petri Net.</param>
        private void SetUpPlacesOverlay(List<IPlace> places)
        {
            foreach (IPlace p in places)
            {
                PlacesWithFootprints.Add(new PlaceTokenTraverseOverlay(p));
            }
        }

        /// <summary>
        /// Sets up transition overlays in the Petri Net overlay based on transitions from given Petri Net.
        /// </summary>
        /// <param name="transitions">Transitions of given Petri Net.</param>
        private void SetUpTransitionsOverlay(List<ITransition> transitions)
        {
            foreach (ITransition t in transitions)
            {
                TransitionsWithFootprints.Add(new TransitionTokenTraverseOverlay(t, PlacesWithFootprints));
            }
        }

        /// <summary>
        /// Finds and sets up start place in the Petri Net overlay (marks it with empty FootprintAnalysisToken).
        /// </summary>
        private void SetUpStartPlace()
        {
            TransitionTokenTraverseOverlay start = TransitionsWithFootprints.Find(a => a.InputPlaces.Exists(b => b.Place.Id == PetriNet.StartPlace.Id));

            start.InputPlaces[0].SetFootprint(new FootprintAnalysisToken());
        }

        /// <summary>
        /// Collects all FootprintAnalysisTokens from given list of places.
        /// </summary>
        /// <param name="places">List of places.</param>
        /// <returns>List of FootprintAnalysisTokens collected from given places.</returns>
        private List<FootprintAnalysisToken> GetFootprintsFromPlaces(List<PlaceTokenTraverseOverlay> places)
        {
            List<FootprintAnalysisToken> inputFootprints = new List<FootprintAnalysisToken>();
            foreach (var p in places)
            {
                inputFootprints.Add(p.TokenFootprint);
            }
            return inputFootprints;
        }

        /// <summary>
        /// Splits given token and passes the new tokens to given output places.
        /// </summary>
        /// <param name="outputPlaces">Output places to be fired into.</param>
        /// <param name="footprint">A token to be split into output places.</param>
        private void FireParallel(List<PlaceTokenTraverseOverlay> outputPlaces, FootprintAnalysisToken footprint)
        {
            List<FootprintAnalysisToken> newFootprints = TokenManipulationUtils.SplitToken(footprint, (uint)outputPlaces.Count, GetNewGlobalId(), ActiveGlobalIdMonitor);
            for (int i = 0; i < newFootprints.Count; i++)
            {
                outputPlaces[i].SetFootprint(newFootprints[i]);
            }
        }

        /// <summary>
        /// Fires given transition in fitting manner based on number of input and output places.
        /// </summary>
        /// <param name="transition">A transition to be fired.</param>
        private void FireTransition(TransitionTokenTraverseOverlay transition)
        {
            {
                List<FootprintAnalysisToken> inputFootprints = GetFootprintsFromPlaces(transition.InputPlaces);
                FootprintAnalysisToken newFootprint;

                if (transition.OutputPlaces.Count > 1)
                {
                    if (transition.InputPlaces.Count > 1)
                    {
                        newFootprint = TokenManipulationUtils.MergeTokens(inputFootprints, ActiveGlobalIdMonitor);
                    } else
                    {
                        newFootprint = transition.InputPlaces[0].TokenFootprint;
                    }
                    transition.SetFootprint(newFootprint);
                    FireParallel(transition.OutputPlaces, newFootprint);
                    return;
                }

                if (transition.InputPlaces.Count > 1 && transition.OutputPlaces.Count > 0)
                {
                    newFootprint = TokenManipulationUtils.MergeTokens(inputFootprints, ActiveGlobalIdMonitor);
                    foreach (PlaceTokenTraverseOverlay p in transition.OutputPlaces)
                    {
                        p.SetFootprint(newFootprint);
                    }
                    transition.SetFootprint(newFootprint);
                    return;
                }

                if (transition.InputPlaces.Count == 1 && transition.OutputPlaces.Count == 1)
                {
                    newFootprint = transition.InputPlaces[0].TokenFootprint;
                    transition.SetFootprint(newFootprint);
                    transition.OutputPlaces[0].SetFootprint(newFootprint);
                }
            }
        }

        /// <summary>
        /// Traverses the Petri Net overlay and marks every place and transition with appropriate footprint.
        /// </summary>
        private void TraverseAndMakeFootprints()
        {
            SetUpStartPlace();
            while (TransitionsWithFootprints.Exists(a => a.CanFire()))
            {
                foreach (var t in TransitionsWithFootprints.FindAll(a => a.CanFire()))
                {
                    FireTransition(t);
                }
            }
        }

        public PetriNetTokenTraverseOverlay(IPetriNet petriNet)
        {
            PetriNet = petriNet;
            TransitionsWithFootprints = new List<TransitionTokenTraverseOverlay>();
            PlacesWithFootprints = new List<PlaceTokenTraverseOverlay>();
            SetUpPlacesOverlay(petriNet.Places);
            SetUpTransitionsOverlay(petriNet.Transitions);
            TraverseAndMakeFootprints();
        }
    }
}
