using System;
using ProcessM.NET.Model.DataAnalysis;

namespace ProcessM.NET.Discovery.HeuristicMiner
{
    /// <summary>
    /// Class which represents dependency matrix
    /// </summary>
    public class DependencyMatrix
    {
        /// <summary>
        /// Direct dependency matrix
        /// </summary>
        public double[,] DirectDependencyMatrix { get; }
        /// <summary>
        /// Length 2 loops dependency matrix
        /// </summary>
        public double[,] L2LDependencyMatrix { get; }
        /// <summary>
        /// Length 1 loops dependency matrix (as 1 dimension)
        /// </summary>
        public double[] L1LDependencyMatrix { get; }

        /// <param name="successorMatrix">Successor matrix</param>
        public DependencyMatrix(SuccessorMatrix successorMatrix)
        {
            DirectDependencyMatrix = new double[successorMatrix.Activities.Count, successorMatrix.Activities.Count];
            L2LDependencyMatrix = new double[successorMatrix.Activities.Count, successorMatrix.Activities.Count];
            L1LDependencyMatrix = new double[successorMatrix.Activities.Count];
            ComputeDependencyMatrix(successorMatrix);
            ComputeL2LDependencyMatrix(successorMatrix);
        }

        /// <summary>
        /// Compute direct dependency matrix and length 1 loops dependency matrix
        /// </summary>
        /// <param name="successorMatrix">Successor matrix</param>
        private void ComputeDependencyMatrix(SuccessorMatrix successorMatrix)
        {
            for (var i = 0; i < DirectDependencyMatrix.GetLength(0); i++)
            {
                for (var j = 0; j < DirectDependencyMatrix.GetLength(0); j++)
                {
                    if (i == j)
                    { 
                        L1LDependencyMatrix[i] = Convert.ToDouble(successorMatrix.DirectMatrix[i, j]) / (successorMatrix.DirectMatrix[i, j] + 1);
                    }
                    else if(j < i) // The lower triangular matrix is the negative compliment of the upper one.
                    {
                        DirectDependencyMatrix[i, j] = -DirectDependencyMatrix[j, i];
                    }
                    else
                    {
                        DirectDependencyMatrix[i, j] = Convert.ToDouble(successorMatrix.DirectMatrix[i, j] - successorMatrix.DirectMatrix[j, i]) /
                                                  (successorMatrix.DirectMatrix[i, j] + successorMatrix.DirectMatrix[j, i] + 1);
                    }
                }
            }
        }

        /// <summary>
        /// Compute length 2 loops dependency matrix
        /// </summary>
        /// <param name="successorMatrix">Successor matrix</param>
        private void ComputeL2LDependencyMatrix(SuccessorMatrix successorMatrix)
        {
            for (var i = 0; i < L2LDependencyMatrix.GetLength(0); i++)
            {
                for (var j = 0; j < L2LDependencyMatrix.GetLength(0); j++)
                {
                    if (successorMatrix.L2LMatrix[i, j] > 0)
                    {
                        L2LDependencyMatrix[i, j] =
                            Convert.ToDouble(successorMatrix.L2LMatrix[i, j] + successorMatrix.L2LMatrix[j, i]) /
                            (successorMatrix.L2LMatrix[i, j] + successorMatrix.L2LMatrix[j, i] + 1);
                    }
                }
            }
        }
    }
}
