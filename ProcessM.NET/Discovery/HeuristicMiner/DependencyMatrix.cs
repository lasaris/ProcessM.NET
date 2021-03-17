using ProcessM.NET.Model.DataAnalysis;
using System;
using System.Collections.Generic;
using System.Text;

namespace ProcessM.NET.Discovery.Heuristic_Miner
{
    public class DependencyMatrix
    {
        public float[,] Matrix { get; }

        private void ComputeDependencyMatrix(DirectlyFollowsMatrix dfm)
        {
            for (var i = 0; i < Matrix.GetLength(0); i++)
            {
                for (var j = 0; j < Matrix.GetLength(0); j++)
                {
                    if (i != j)
                    {
                        Matrix[i, j] = (float)(dfm.Matrix[i, j] - dfm.Matrix[j, i]) / 
                            (dfm.Matrix[i, j] + dfm.Matrix[j, i] + 1);
                    }
                    else
                    {
                        Matrix[i, j] = (float)dfm.Matrix[i, j] / (dfm.Matrix[i, j] + 1);
                    }
                }
            }
        }

        public DependencyMatrix(DirectlyFollowsMatrix dfm)
        {
            Matrix = new float[dfm.Activities.Count, dfm.Activities.Count];
            ComputeDependencyMatrix(dfm);
        }
    }
}
