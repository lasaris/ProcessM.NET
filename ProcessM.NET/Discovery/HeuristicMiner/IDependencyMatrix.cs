namespace ProcessM.NET.Discovery.HeuristicMiner
{
    public interface IDependencyMatrix
    {
        double [,] Matrix { get; }
        double[,] L2LDependencyMatrix { get; }
        double[] L1LDependencyMatrix { get; }
        void ComputeDependencyMatrix(SuccessorMatrix successorMatrix);
        void ComputeL2LDependencyMatrix(SuccessorMatrix successorMatrix);
    }
}
