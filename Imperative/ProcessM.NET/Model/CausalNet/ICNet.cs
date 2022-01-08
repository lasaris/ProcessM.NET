using System;
using System.Collections.Generic;

namespace ProcessM.NET.Model.CausalNet
{
    /// <summary>
    /// Interface for a Causal Net
    /// </summary>
    public interface ICNet
    {
        /// <summary>
        /// Mapping int to activity
        /// </summary>
        List<string> IndexToActivity { get; }
        /// <summary>
        /// Mapping string to activity
        /// </summary>
        Dictionary<string, int> ActivityIndices { get; }
        /// <summary>
        /// List of places
        /// </summary>
        List<CPlace> Activities { get; }
        /// <summary>
        /// Start place
        /// </summary>
        CPlace StartActivity { get; }
        /// <summary>
        /// End place
        /// </summary>
        CPlace EndActivity { get; }
        /// <summary>
        /// Long distance dependencies
        /// </summary>
        HashSet<Tuple<int, int>> LongDependencies { get; }
        /// <summary>
        /// Input bindings
        /// </summary>
        Dictionary<int, HashSet<IBinding>> InputBindings { get; }
        /// <summary>
        /// Output bindings
        /// </summary>
        Dictionary<int, HashSet<IBinding>> OutputBindings { get; } 
    }
}
