using System.Collections.Generic;

namespace ProcessM.NET.Model.CausalNet
{
    /// <summary>
    /// Interface for a binding in Causal net
    /// </summary>
    public interface IBinding
    {
        HashSet<int> Activities { get; }
        int Frequency { get; }

        void AddFrequency(int val);
    }
}