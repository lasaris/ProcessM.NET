using System;
using System.Collections.Generic;
using System.Text;

namespace ProcessM.NET.ConformanceChecking.CausalFootprint
{
    /// <summary>
    /// A class representing a token footprint.
    /// </summary>
    class FootprintAnalysisToken
    {
        public List<string> ActiveLevels { get; } = new List<string>();

        public List<string> MergedLevels { get; } = new List<string>();

        public FootprintAnalysisToken()
        {
            ActiveLevels = new List<string>();
            MergedLevels = new List<string>();
        }

        public FootprintAnalysisToken(FootprintAnalysisToken token)
        {
            ActiveLevels = new List<string>(token.ActiveLevels);
            MergedLevels = new List<string>(token.MergedLevels);
        }
    }
}
