using ProcessM.NET.Model.DataAnalysis;
using System;
using System.Collections.Generic;
using System.Text;

namespace ProcessM.NET.ConformanceChecking.CausalFootprint
{
    /// <summary>
    /// This class provides methods for two causal footprints (Relation matrices) comparison and metrics calculations.
    /// </summary>
    public static class FootprintComparer
    {
        /// <summary>
        /// Checks whether the indices in two RelationMatrix activity indexers are matching.
        /// </summary>
        /// <param name="indicesA">Indices of first RelationMatrix.</param>
        /// <param name="indicesB">Indices of second RelationMatrix.</param>
        /// <returns>True if all indices match, else returns false.</returns>
        private static bool IndicesAreMatching(Dictionary<string, int> indicesA, Dictionary<string, int> indicesB)
        {
            foreach (KeyValuePair<string, int> logIndex in indicesA)
            {
                if (indicesB[logIndex.Key] != logIndex.Value)
                {
                    return false;
                }
            }
            return true;
        }
        
        /// <summary>
        /// Calculates causal footprint comparison when indices of both matrices match.
        /// </summary>
        /// <param name="matrixA">First RelationMatrix to be compared.</param>
        /// <param name="matrixB">Second RelationMatrix to be compared.</param>
        /// <returns>Fitness metric of both matrices.</returns>
        private static double CalculateWhenIndicesMatch(RelationMatrix matrixA, RelationMatrix matrixB)
        {
            int bound = matrixA.Activities.Count;
            int match = 0;
            int size = bound * bound;
            for (int i = 0; i < bound; i++)
            {
                for (int j = 0; j < bound; j++)
                {
                    if (matrixA.Footprint[i, j] == matrixB.Footprint[i, j])
                    {
                        match++;
                    }
                }
            }
            return match / size;
        }

        /// <summary>
        /// Calculates causal footprint comparison when it is unknown if indices of both matrices match or when they don't match.
        /// </summary>
        /// <param name="matrixA">First RelationMatrix to be compared.</param>
        /// <param name="matrixB">Second RelationMatrix to be compared.</param>
        /// <returns>Fitness metric of both matrices.</returns>
        private static double Calculate(RelationMatrix matrixA, RelationMatrix matrixB)
        {
            Dictionary<int, int> indexMapping = new Dictionary<int, int>();
            foreach (KeyValuePair<string, int> logIndex in matrixA.ActivityIndices)
            {
                int modelIndex = matrixB.ActivityIndices[logIndex.Key];
                if (modelIndex != logIndex.Value)
                {
                    indexMapping.Add(logIndex.Value, modelIndex);
                }
            }

            int bound = matrixA.Activities.Count;
            int match = 0;
            int size = bound * bound;
            for (int i = 0; i < bound; i++)
            {
                for (int j = 0; j < bound; j++)
                {
                    int from = i;
                    int to = j;
                    if (indexMapping.ContainsKey(i))
                    {
                        from = indexMapping[i];
                    }
                    if (indexMapping.ContainsKey(j))
                    {
                        to = indexMapping[j];
                    }
                    if (matrixA.Footprint[i, j] == matrixB.Footprint[from, to])
                    {
                        match++;
                    }
                }
            }
            return match / size;
        }

        /// <summary>
        /// Calculates causal footprint comparison of two Relation Matrices.
        /// </summary>
        /// <param name="matrixA">First RelationMatrix to be compared.</param>
        /// <param name="matrixB">Second RelationMatrix to be compared.</param>
        /// <returns>Fitness metric of both matrices.</returns>
        public static double Compare(RelationMatrix matrixA, RelationMatrix matrixB)
        {
            if (IndicesAreMatching(matrixA.ActivityIndices, matrixB.ActivityIndices))
            {
                return CalculateWhenIndicesMatch(matrixA, matrixB);
            }
            return Calculate(matrixA, matrixB);
        }
    }
}
