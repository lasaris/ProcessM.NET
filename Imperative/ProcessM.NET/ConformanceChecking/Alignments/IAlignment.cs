namespace ProcessM.NET.ConformanceChecking.Alignments
{
    /// <summary>
    /// Interface for Alignment classes
    /// </summary>
    public interface IAlignment
    {
        /// <summary>
        /// Fitness of the alignment
        /// </summary>
        double Fitness { get; }
        /// <summary>
        /// Move cost of the trace
        /// </summary>
        int TraceMoveCost { get; }
        /// <summary>
        /// Move cost of the model
        /// </summary>
        int ModelMoveCost { get; }
        /// <summary>
        /// Optimal cost of the alignment on the trace
        /// </summary>
        double OptimalCost { get; }
        /// <summary>
        /// Worst cost of the alignment on the trace
        /// </summary>
        double WorstCost { get; }
    }
}
