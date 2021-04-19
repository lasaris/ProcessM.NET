using System;
using System.Collections.Generic;

namespace ProcessM.NET.Model.CausalNet
{
    /// <summary>
    /// Interface for a Causal Net
    /// </summary>
    public interface ICNet
    {
        List<string> IndexToActivity { get; }
        Dictionary<string, int> ActivityIndices { get; }
        List<CPlace> Activities { get; }
        CPlace StartActivity { get; }
        CPlace EndActivity { get; }
        Dictionary<Tuple<int, int>, int> LongDistance { get; }
        Dictionary<int, HashSet<IBinding>> InputBindings { get; }
        Dictionary<int, HashSet<IBinding>> OutputBindings { get; } 
    }
}
