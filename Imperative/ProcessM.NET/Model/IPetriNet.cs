using System.Collections.Generic;

namespace ProcessM.NET.Model
{
    /// <summary>
    /// Interface for Petri Net. Exactly one start place and one end place are expected (can be always done by preprocessing the data).
    /// </summary>
    public interface IPetriNet
    {
        List<ITransition> Transitions { get; }

        List<IPlace> Places { get; }

        IPlace StartPlace { get; }

        IPlace EndPlace { get; }

        /// <summary>
        /// Finds all transitions which can appear at the beginning of a trace.
        /// </summary>
        /// <returns>List of start transitions.</returns>
        List<ITransition> GetStartTransitions();
    }
}
