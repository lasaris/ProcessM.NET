namespace ProcessM.NET.Discovery.HeuristicMiner
{
    public class HeuristicMinerSettings
    {
        public double DependencyThreshold { get; set; } = 0.9;
        public double L1LThreshold { get; set; } = 0.9;
        public double L2LThreshold { get; set; } = 0.9;
        public double RelativeToBestThreshold { get; set; } = 0.05;
        public int PositiveObservationsThreshold { get; set; } = 1;
        public bool AllTasksConnected { get; set; } = true;
        public bool UseLongDistance { get; set; } = false;
        public double LongDistanceThreshold { get; set; } = 0.9;

        public HeuristicMinerSettings() { }
    }
}
