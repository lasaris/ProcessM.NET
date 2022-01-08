using ProcessM.NET.Model.DataAnalysis;
using System;
using System.Collections.Generic;
using System.Text;

namespace ProcessM.NET.Discovery.Alpha
{
    /// <summary>
    /// A supplementary class used by Alpha algorithm to distinguish maximal independent sets of activities.
    /// </summary>
    static class IndependentSetUtils
    {

        /// <summary>
        /// Checks whether all activities in given activity subset are independent of each other.
        /// </summary>
        /// <param name="subset">Subset of activities.</param>
        /// <param name="relations">Examined relation matrix (causal footprint).</param>
        /// <param name="activities">Activities in given relation matrix.</param>
        /// <returns>True if all activities in given subset are independent of each other. Otherwise returns false</returns>
        private static bool AllIndependent(HashSet<string> subset, Relation[,] relations, List<string> activities)
        {
            foreach (string activityA in subset)
            {
                foreach (string activityB in subset)
                {
                    if (relations[activities.IndexOf(activityA), activities.IndexOf(activityB)] != Relation.Independency)
                    {
                        return false;
                    }
                }
            }
            return true;
        }

        /// <summary>
        /// Generates an independent power set (set of subsets in which all activites are independent of each other)
        /// from given set using binary masking method. Inspired by:
        /// https://stackoverflow.com/questions/19890781/creating-a-power-set-of-a-sequence
        /// </summary>
        /// <param name="originalSet">Set of strings from which power set is to be generated.</param>
        /// <param name="relations">Examined relation matrix (causal footprint).</param>
        /// <param name="activities">Activities in given relation matrix.</param>
        /// <returns>Power set of originalSet</returns>
        private static HashSet<HashSet<string>> GenerateIndependentPowerSet(HashSet<string> originalSet,
            Relation[,] relations, List<string> activities)
        {
            List<string> listSet = new List<string>(originalSet);
            int powerSetCount = 1 << originalSet.Count;
            var powerSet = new HashSet<HashSet<string>>();

            for (int setMask = 1; setMask < powerSetCount; ++setMask)
            {
                var subset = new HashSet<string>();
                for (int i = 0; i < originalSet.Count; ++i)
                {
                    if ((setMask & (1 << i)) > 0)
                    {
                        subset.Add(listSet[i]);
                    }
                }

                if (AllIndependent(subset, relations, activities))
                {
                    powerSet.Add(subset);
                }
            }
            return powerSet;
        }

        /// <summary>
        /// Finds all independent sets of activities (A never comes before B and B never comes before A) in given relation matrix.
        /// </summary>
        /// <param name="relations">Examined relation matrix (causal footprint).</param>
        /// <param name="activities">Activities in given relation matrix.</param>
        /// <returns>A set of independent sets of activities.</returns>
        public static HashSet<HashSet<string>> FindIndependentSets(Relation[,] relations, List<string> activities)
        {
            int matSize = activities.Count;
            var independentSets = new HashSet<HashSet<string>>(HashSet<string>.CreateSetComparer());

            for (int i = 0; i < matSize; ++i)
            {
                var nset = new HashSet<string>();
                for (int j = 0; j < matSize; ++j)
                {
                    if (relations[i, j] == Relation.Independency)
                    {
                        nset.Add(activities[j]);
                    }
                }

                independentSets.UnionWith(GenerateIndependentPowerSet(nset, relations, activities));
            }
            return independentSets;
        }

        /// <summary>
        /// Checks whether any activity from setA can precede any activity from setB.
        /// </summary>
        /// <param name="setA">Set A of independent activities.</param>
        /// <param name="setB">Set B of independent activities.</param>
        /// <param name="relations">Examined relation matrix (causal footprint).</param>
        /// <param name="activityIndices">Indexer containing mapping of activities to indices in relation matrix.</param>
        /// <returns>True if any activity from setA can precede any activity from setB. Otherwise returns false.</returns>
        private static bool IsValidSetAB(HashSet<string> setA, HashSet<string> setB,
        Relation[,] relations, Dictionary<string, int> activityIndices)
        {
            foreach (string activityA in setA)
            {
                foreach (string activityB in setB)
                {
                    if (relations[activityIndices[activityA], activityIndices[activityB]] != Relation.Succession)
                    {
                        return false;
                    }
                }
            }
            return true;
        }

        /// <summary>
        /// Generates initial basic independent set (A, B) pairings from 1-activity sets
        /// (in Alpha algorithm, all activities should be independent on themselves).
        /// </summary>
        /// <param name="relations">Examined relation matrix (causal footprint).</param>
        /// <param name="activityIndices">Indexer containing mapping of activities to indices in relation matrix.</param>
        /// <returns>Initial 1-activity set pairings of independent sets (A, B)</returns>
        private static HashSet<Tuple<HashSet<string>, HashSet<string>>> InitializeIndependentSetsAB(
            Relation[,] relations,
            Dictionary<string, int> activityIndices)
        {
            var setsAB = new HashSet<Tuple<HashSet<string>, HashSet<string>>>();

            foreach (var actA in activityIndices)
            {
                foreach (var actB in activityIndices)
                {
                    if (relations[actA.Value, actB.Value] == Relation.Succession)
                    {
                        setsAB.Add(new Tuple<HashSet<string>, HashSet<string>>(
                            new HashSet<string>() { actA.Key },
                            new HashSet<string>() { actB.Key }));
                    }
                }
            }

            return setsAB;
        }

        /// <summary>
        /// Finds pairs of maximal independent sets (A, B), such that any activity from A can directly precede any activity from B.
        /// </summary>
        /// <param name="independentSets">A set of independent sets of activities.</param>
        /// <param name="relations">Examined relation matrix (causal footprint).</param>
        /// <param name="activityIndices">Indexer containing mapping of activities to indices in relation matrix.</param>
        /// <returns>Maximal independent sets (A, B).</returns>
        public static HashSet<Tuple<HashSet<string>, HashSet<string>>> FindMaximalIndependentSetsAB(
            HashSet<HashSet<string>> independentSets, 
            Relation[,] relations, 
            Dictionary<string, int> activityIndices)
        {
            var setsAB = InitializeIndependentSetsAB(relations, activityIndices);

            foreach (HashSet<string> setA in independentSets)
            {
                foreach (HashSet<string> setB in independentSets)
                {
                    if (IsValidSetAB(setA, setB, relations, activityIndices))
                    {
                        bool isBiggerSet = false;
                        var setsToRemove = new HashSet<Tuple<HashSet<string>, HashSet<string>>>();

                        foreach (Tuple<HashSet<string>, HashSet<string>> setAB in setsAB)
                        {
                            if (setAB.Item1.IsSubsetOf(setA) && setAB.Item2.IsSubsetOf(setB))
                            {
                                isBiggerSet = true;
                                setsToRemove.Add(setAB);
                            }
                        }
                        setsAB.ExceptWith(setsToRemove);

                        if (isBiggerSet)
                        {
                            setsAB.Add(new Tuple<HashSet<string>, HashSet<string>>(setA, setB));
                        }
                    }
                }
            }
            return setsAB;
        }
    }
}
