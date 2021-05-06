namespace ProcessM.NET.Discovery.HeuristicMiner
{
    /// <summary>
    /// Class which represents heuristic miner settings
    /// </summary>
    public class HeuristicMinerSettings
    {
        /// <summary>
        /// Dependency threshold
        /// </summary>
        public double DependencyThreshold { get; set; } = 0.9;
        /// <summary>
        /// Length 1 loops dependency threshold
        /// </summary>
        public double L1LThreshold { get; set; } = 0.9;
        /// <summary>
        /// Length 2 loops dependency threshold
        /// </summary>
        public double L2LThreshold { get; set; } = 0.9;
        /// <summary>
        /// Relative to best dependency threshold
        /// </summary>
        public double RelativeToBestThreshold { get; set; } = 0.05;
        /// <summary>
        /// All-tasks connected
        /// </summary>
        public bool AllTasksConnected { get; set; } = true;
        /// <summary>
        /// Long distance dependencies
        /// </summary>
        public bool UseLongDistance { get; set; } = false;
        /// <summary>
        /// Long distance  threshold
        /// </summary>
        public double LongDistanceThreshold { get; set; } = 0.9;

        public HeuristicMinerSettings() { }
    }
}
