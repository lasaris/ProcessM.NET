using System.Collections.Generic;

namespace ProcessM.NET.Model.CausalNet
{
    /// <summary>
    /// Interface for a binding in Causal net
    /// </summary>
    public interface IBinding
    {
        /// <summary>
        /// Binding activities in AND relation
        /// </summary>
        HashSet<int> Activities { get; }
        /// <summary>
        /// Frequency of binding
        /// </summary>
        int Frequency { get; }
        /// <summary>
        /// Increase frequency of binding
        /// </summary>
        /// <param name="val">value</param>
        void AddFrequency(int val);
    }
}