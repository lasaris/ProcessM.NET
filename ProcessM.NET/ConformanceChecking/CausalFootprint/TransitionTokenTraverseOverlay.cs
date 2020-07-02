using ProcessM.NET.Model;
using System;
using System.Collections.Generic;
using System.Text;
using ProcessM.NET.ConformanceChecking.CausalFootprint;

namespace ProcessM.NET.ConformanceChecking.CausalFootprint
{
    /// <summary>
    /// A class used as a transition overlay for the purpouses of causal footprint comparing diagnostics.
    /// </summary>
    class TransitionTokenTraverseOverlay
    {

        public FootprintAnalysisToken TokenFootprint { get; protected set; }

        public bool IsMarked { get; protected set; }

        public List<PlaceTokenTraverseOverlay> InputPlaces { get; }

        public List<PlaceTokenTraverseOverlay> OutputPlaces { get; }

        public string Id { get; }

        public string Activity { get; }

        /// <summary>
        /// Copies and sets given collection of places as input places.
        /// </summary>
        /// <param name="places">A collection of places to be set as input places.</param>
        private void SetUpInputPlaces(IEnumerable<IPlace> places, List<PlaceTokenTraverseOverlay> allPlaces)
        {
            foreach (IPlace p in places)
            {
                InputPlaces.Add(allPlaces.Find(a => a.Place.Id == p.Id));
            }
        }

        /// <summary>
        /// Copies and sets given collection of places as output places.
        /// </summary>
        /// <param name="places">A collection of places to be set as output places.</param>
        private void SetUpOutputPlaces(IEnumerable<IPlace> places, List<PlaceTokenTraverseOverlay> allPlaces)
        {
            foreach (IPlace p in places)
            {
                OutputPlaces.Add(allPlaces.Find(a => a.Place.Id == p.Id));
            }
        }

        /// <summary>
        /// Sets given FootprintAnalysisToken as footprint and marks the transition.
        /// </summary>
        /// <param name="footprint">FootprintAnalysisToken to be set as transition's footprint.</param>
        public void SetFootprint(FootprintAnalysisToken footprint)
        {
            TokenFootprint = footprint;
            IsMarked = true;
        }

        /// <summary>
        /// Determines whether the transition can be fired (every input place is marked and there is an output place which is unmarked).
        /// </summary>
        /// <returns>True if transition can fire, else returns false.</returns>
        public bool CanFire()
        {
            foreach(PlaceTokenTraverseOverlay p in InputPlaces)
            {
                if (!p.IsMarked)
                {
                    return false;
                }
            }
            if (!IsMarked)
            {
                return true;
            }
            foreach(PlaceTokenTraverseOverlay p in OutputPlaces)
            {
                if (!p.IsMarked)
                {
                    return true;
                }
            }
            return false;
        }

        public TransitionTokenTraverseOverlay(ITransition transition, List<PlaceTokenTraverseOverlay> places)
        {
            InputPlaces = new List<PlaceTokenTraverseOverlay>();
            OutputPlaces = new List<PlaceTokenTraverseOverlay>();

            SetUpInputPlaces(transition.InputPlaces, places);
            SetUpOutputPlaces(transition.OutputPlaces, places);
            Id = transition.Id;
            Activity = transition.Activity;
            IsMarked = false;
        }
    }
}
