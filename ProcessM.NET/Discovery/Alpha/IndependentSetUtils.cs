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
        /// Finds all independent sets of activities (A never comes before B and B never comes before A) in given relation matrix.
        /// </summary>
        /// <param name="relations">Examined relation matrix (causal footprint).</param>
        /// <param name="activities">Activities in given relation matrix.</param>
        /// <returns>A set of independent sets of activities.</returns>
        public static HashSet<HashSet<string>> FindIndependentSets(Relation[,] relations, List<string> activities)
        {
            int matSize = activities.Count;
            var independentSets = new HashSet<HashSet<string>>();

            for (int i = 0; i < matSize; i++)
            {
                if (relations[i, i] == Relation.Independency)
                {
                    var nset = new HashSet<string>() { activities[i] };
                    independentSets.Add(new HashSet<string>(nset));

                    for (int j = 0; j < matSize; j++)
                    {
                        nset = new HashSet<string>() { activities[i] };
                        for (int k = j; k < matSize; k++)
                        {
                            bool allIndependent = true;
                            if (relations[i, k] == Relation.Independency && i != k)
                            {
                                foreach (string act in nset)
                                {
                                    int m = activities.FindIndex(a => a == act);
                                    if (relations[m, k] != Relation.Independency)
                                    {
                                        allIndependent = false;
                                    }
                                }
                                if (allIndependent)
                                {
                                    nset.Add(activities[k]);
                                    independentSets.Add(new HashSet<string>(nset));
                                }
                            }
                        }
                    }
                }
            }
            return independentSets;
        }

        /// <summary>
        /// Finds such pairs of maximal independent sets (A, B), so that any activity from A can directly precede any activity from B.
        /// </summary>
        /// <param name="independentSets">A set of independent sets of activities.</param>
        /// <param name="relations">Examined relation matrix (causal footprint).</param>
        /// <param name="activityIndices">Indexer containing mapping of activities to </param>
        /// <returns></returns>
        public static HashSet<Tuple<HashSet<string>, HashSet<string>>> FindMaximalIndependentSetsAB(HashSet<HashSet<string>> independentSets, 
            Relation[,] relations, 
            Dictionary<string, int> activityIndices)
        {
            var setsAB = new HashSet<Tuple<HashSet<string>, HashSet<string>>>();

            foreach (var setA in independentSets)
            {
                foreach (var setB in independentSets)
                {
                    bool isValidSet = true;
                    foreach (string activityA in setA)
                    {
                        foreach (string activityB in setB)
                        {
                            if (relations[activityIndices[activityA], activityIndices[activityB]] != Relation.Succession)
                            {
                                isValidSet = false;
                            }
                        }
                    }

                    if (isValidSet)
                    {
                        bool isBiggerSet = false;
                        var setsToRemove = new HashSet<Tuple<HashSet<string>, HashSet<string>>>();

                        foreach (var setAB in setsAB)
                        {
                            if (setAB.Item1.IsSubsetOf(setA) && setAB.Item2.IsSubsetOf(setB))
                            {
                                isBiggerSet = true;
                                setsToRemove.Add(setAB);
                            }
                        }
                        setsAB.ExceptWith(setsToRemove);

                        if (!isBiggerSet && setA.Count == 1 && setB.Count == 1)
                        {
                            isBiggerSet = true;
                        }

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
