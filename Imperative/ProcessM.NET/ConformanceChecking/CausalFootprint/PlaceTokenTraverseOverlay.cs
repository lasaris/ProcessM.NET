using ProcessM.NET.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace ProcessM.NET.ConformanceChecking.CausalFootprint
{
    /// <summary>
    /// A class used as a place overlay for the purpouses of causal footprint comparing diagnostics.
    /// </summary>
    class PlaceTokenTraverseOverlay
    {
        public IPlace Place { get; }

        public FootprintAnalysisToken TokenFootprint { get; protected set; }

        public bool IsMarked { get; protected set; }

        /// <summary>
        /// Sets given FootprintAnalysisToken as footprint and marks the place.
        /// </summary>
        /// <param name="footprint">FootprintAnalysisToken to be set as transition's footprint.</param>
        public void SetFootprint(FootprintAnalysisToken footprint)
        {
            TokenFootprint = footprint;
            IsMarked = true;
        }

        public PlaceTokenTraverseOverlay(IPlace place)
        {
            Place = place;
            IsMarked = false;
        }
    }
}
