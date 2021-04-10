namespace ProcessM.NET.ConformanceChecking.Alignments
{
    public interface IAlignment
    {
        double Fitness { get; }
        int TraceMoveCost { get; }
        int ModelMoveCost { get; }
        double OptimalCost { get; }
        double WorstCost { get; }
    }
}
