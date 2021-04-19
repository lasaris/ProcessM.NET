namespace ProcessM.NET.ConformanceChecking.Alignments
{
    /// <summary>
    /// Interface for Alignment classes
    /// </summary>
    public interface IAlignment
    {
        double Fitness { get; }
        int TraceMoveCost { get; }
        int ModelMoveCost { get; }
        double OptimalCost { get; }
        double WorstCost { get; }
    }
}
