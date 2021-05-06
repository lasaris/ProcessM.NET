using System;
using System.Collections.Generic;
using System.Linq;
using ProcessM.NET.Model.DataAnalysis;

namespace ProcessM.NET.Discovery.HeuristicMiner
{
    /// <summary>
    /// Class which represents Dependency Graph
    /// </summary>
    public class DependencyGraph
    {
        /// <summary>
        /// Mapping idx to activity
        /// </summary>
        public List<string> Activities { get; }
        /// <summary>
        /// Mapping activity to int
        /// </summary>
        public Dictionary<string, int> ActivityIndices { get; }
        /// <summary>
        /// Heuristic miner settings
        /// </summary>
        public HeuristicMinerSettings Settings { get; }
        /// <summary>
        /// List which represents input bindings for each activity
        /// </summary>
        public List<HashSet<int>> InputActivities { get; } = 
            new List<HashSet<int>>();
        /// <summary>
        /// List which represents output bindings for each activity
        /// </summary>
        public List<HashSet<int>> OutputActivities { get; } =
            new List<HashSet<int>>();
        /// <summary>
        /// Hashset which represents long distance dependencies
        /// </summary>
        public HashSet<Tuple<int, int>> LongDependencies { get; } = 
            new HashSet<Tuple<int, int>>();
        /// <summary>
        /// Start activity of graph
        /// </summary>
        public int StartActivity { get; }
        /// <summary>
        /// End activity of graph
        /// </summary>
        public int EndActivity { get; }


        /// <param name="successorMatrix">Direct succession matrix</param>
        /// <param name="heuristicsMinerSettings">Heuristic miner settings</param>
        public DependencyGraph(SuccessorMatrix successorMatrix, HeuristicMinerSettings heuristicsMinerSettings)
        {
            Activities = successorMatrix.Activities;
            ActivityIndices = successorMatrix.ActivityIndices;
            StartActivity = successorMatrix.ActivityIndices[successorMatrix.StartActivities.First()];
            EndActivity = successorMatrix.ActivityIndices[successorMatrix.EndActivities.First()];
            var dependencyMatrix = new DependencyMatrix(successorMatrix);
            Settings = heuristicsMinerSettings;
            CreateDependencyGraph(successorMatrix, dependencyMatrix);
        }

        /// <summary>
        /// Dependency graph constructor with default settings
        /// </summary>
        /// <param name="successorMatrix"></param>
        public DependencyGraph(SuccessorMatrix successorMatrix) : this(successorMatrix, new HeuristicMinerSettings()) { }

        /// <summary>
        /// Creates dependency graph based on the direct succession matrix and the dependency matrix
        /// </summary>
        /// <param name="successorMatrix">Direct succession matrix</param>
        /// <param name="dependencyMatrix">Dependency matrix</param>
        private void CreateDependencyGraph(SuccessorMatrix successorMatrix, DependencyMatrix dependencyMatrix)
        {
            //1. Unnecessary (We store activities in SuccessorMatrix)
            //2. Length 1 loops
            var l1L = FindL1Loops(successorMatrix, dependencyMatrix);
            //3. Length 2 loops
            var l2L = FindL2Loops(successorMatrix, dependencyMatrix);

            //4. Each Task; the strongest follower
            var strongFollowers = EachTaskStrongestFollower(dependencyMatrix);
            //5. Each Task; the strongest cause
            var strongCauses = EachTaskStrongestCause(dependencyMatrix);

            if (Settings.AllTasksConnected) 
            {
                //6. & 7. Find and remove weak outgoing connections for L2L
                RemoveWeakDependencies(dependencyMatrix, strongFollowers, l2L);
                //8. & 9. Find and remove weak incoming connections for L2L
                RemoveWeakCauses(dependencyMatrix, strongCauses, l2L);
            }

            //10. Find extra accepted in & out connections
            var followers = FindExtra(strongFollowers, dependencyMatrix, successorMatrix, false);
            var causes = FindExtra(strongCauses, dependencyMatrix, successorMatrix, true);

            //12. Combine Hash-sets
            l1L.UnionWith(l2L);
            l1L.UnionWith(followers);
            l1L.UnionWith(causes);
            
            if (Settings.AllTasksConnected)
            {
                l1L.UnionWith(strongFollowers);
                l1L.UnionWith(strongCauses);
            }

            CreateGraph(l1L);

            if (Settings.UseLongDistance)
            {
                FindLongDistance(successorMatrix);
            }
        }

        /// <summary>
        /// Find length 1 loops which fulfills the heuristic miner settings
        /// </summary>
        /// <param name="successorMatrix">Direct succession matrix</param>
        /// <param name="dependencyMatrix">Dependency matrix</param>
        /// <returns>Hashset with length 1 loop edges</returns>
        private HashSet<Tuple<int, int>> FindL1Loops(SuccessorMatrix successorMatrix, DependencyMatrix dependencyMatrix)
        {
            var edges = new HashSet<Tuple<int, int>>();
            for (var i = 0; i < Activities.Count; i++)
            {
                if (!(dependencyMatrix.L1LDependencyMatrix[i] >= Settings.L1LThreshold && 
                      successorMatrix.DirectMatrix[i, i] >= Settings.PositiveObservationsThreshold))
                    continue;
                edges.Add(new Tuple<int, int>(i, i));
            }

            return edges;
        }

        /// <summary>
        /// Find length 2 loops which fulfills the heuristic miner settings
        /// </summary>
        /// <param name="successorMatrix">Direct succession matrix</param>
        /// <param name="dependencyMatrix">Dependency matrix</param>
        /// <returns>Hashset with length 2 loop edges</returns>
        private HashSet<Tuple<int, int>> FindL2Loops(SuccessorMatrix successorMatrix, DependencyMatrix dependencyMatrix)
        {
            var edges = new HashSet<Tuple<int, int>>();
            for (var i = 0; i < Activities.Count; i++)
            {
                for (var j = 0; j < Activities.Count; j++)
                {
                    if(!(dependencyMatrix.L2LDependencyMatrix[i, j] >= Settings.L2LThreshold && 
                         successorMatrix.DirectMatrix[i, j] >= Settings.PositiveObservationsThreshold)) 
                        continue;
                    edges.Add(new Tuple<int, int>(i, j));
                }
            }

            return edges;
        }

        /// <summary>
        /// Find the strongest follower for each activity (expect end activity)
        /// </summary>
        /// <param name="dependencyMatrix">Dependency matrix</param>
        /// <returns>Hashset with the strongest strongestHashSet</returns>
        private HashSet<Tuple<int, int>> EachTaskStrongestFollower(DependencyMatrix dependencyMatrix)
        {
            var followers = new HashSet<Tuple<int, int>>();
            for (int i = 0; i < Activities.Count; i++)
            {
                //Skip end activity
                if (i == EndActivity) continue;
                int strongest = -1;
                for (int j = 0; j < Activities.Count; j++)
                {
                    if (i == j) continue; //Strongest follower cannot be same activity
                    if (strongest == -1)
                    {
                        strongest = j;
                    }
                    else if (dependencyMatrix.DirectDependencyMatrix[i, j] >
                             dependencyMatrix.DirectDependencyMatrix[i, strongest])
                    {
                        strongest = j;
                    }
                }
                if (strongest != -1)
                    followers.Add(new Tuple<int, int>(i, strongest));
            }
            return followers;
        }

        /// <summary>
        /// Find the strongest cause for each activity (expect start activity)
        /// </summary>
        /// <param name="dependencyMatrix">Dependency matrix</param>
        /// <returns>Hashset with the strongest causes</returns>
        private HashSet<Tuple<int, int>> EachTaskStrongestCause(DependencyMatrix dependencyMatrix)
        {
            var causes = new HashSet<Tuple<int, int>>();
            // Skip start activity
            for (var i = 1; i < Activities.Count; i++)
            {
                var strongest = -1;
                for (var j = 0; j < Activities.Count; j++)
                {
                    if (i == j) continue; //Strongest cause cannot be same activity
                    if (strongest == -1)
                    {
                        strongest = j;
                    }
                    else if (dependencyMatrix.DirectDependencyMatrix[j, i] >
                             dependencyMatrix.DirectDependencyMatrix[strongest, i])
                    {
                        strongest = j;
                    }
                }
                if(strongest != -1)
                    causes.Add(new Tuple<int, int>(strongest, i));
            }
            return causes;
        }

        /// <summary>
        /// Removes weak dependencies from Hashset of arcs
        /// </summary>
        /// <param name="dependencyMatrix">Dependency graph</param>
        /// <param name="strongestHashSet">Arcs</param>
        /// <param name="l2Loops">Length 2 loops</param>
        private void RemoveWeakDependencies(DependencyMatrix dependencyMatrix, HashSet<Tuple<int, int>> strongestHashSet, HashSet<Tuple<int, int>> l2Loops)
        {
            var toRemove = new HashSet<Tuple<int, int>>();
            foreach (var (i, j) in l2Loops)
            {
                var strongest = strongestHashSet.First(o => o.Item1 == i);
                var dependencyStrong = dependencyMatrix.DirectDependencyMatrix[strongest.Item1, strongest.Item2];
                var strongestLoop = strongestHashSet.First(o => o.Item1 == j);
                var dependencyLoop = dependencyMatrix.DirectDependencyMatrix[strongestLoop.Item1, strongestLoop.Item2];
                if (dependencyStrong <= dependencyLoop)
                {
                    toRemove.Add(new Tuple<int, int>(i, strongest.Item2));
                }
            }
            strongestHashSet.ExceptWith(toRemove);
        }

        /// <summary>
        /// Removes weak causes from Hashset of arcs
        /// </summary>
        /// <param name="dependencyMatrix">Dependency graph</param>
        /// <param name="strongestHashSet">Arcs</param>
        /// <param name="l2Loops">Length 2 loops</param>
        private void RemoveWeakCauses(DependencyMatrix dependencyMatrix, HashSet<Tuple<int, int>> strongestHashSet, HashSet<Tuple<int, int>> l2Loops)
        {
            var toRemove = new HashSet<Tuple<int, int>>();
            foreach (var (i, j) in l2Loops)
            {
                var strongest = strongestHashSet.First(o => o.Item2 == i);
                var dependencyStrong = dependencyMatrix.DirectDependencyMatrix[strongest.Item1, strongest.Item2];
                var strongestLoop = strongestHashSet.First(o => o.Item2 == j);
                var dependencyLoop = dependencyMatrix.DirectDependencyMatrix[strongestLoop.Item1, strongestLoop.Item2];
                if (dependencyStrong <= dependencyLoop)
                {
                    toRemove.Add(new Tuple<int, int>(strongest.Item1, i));
                }
            }
            strongestHashSet.ExceptWith(toRemove);
        }

        /// <summary>
        /// Find extra arcs which fulfill heuristic miner settings
        /// </summary>
        /// <param name="strongest">Arcs</param>
        /// <param name="dependencyMatrix">Dependency matrix</param>
        /// <param name="successorMatrix">Successor Matrix</param>
        /// <param name="directionIn">direction</param>
        private HashSet<Tuple<int, int>> FindExtra(HashSet<Tuple<int, int>> strongest, DependencyMatrix dependencyMatrix, SuccessorMatrix successorMatrix, bool directionIn)
        {
            var extra = new HashSet<Tuple<int, int>>();
            foreach (var (i, j) in strongest)
            {
                var strongestDependency = dependencyMatrix.DirectDependencyMatrix[i, j];
                if (strongestDependency < Settings.DependencyThreshold) continue;
                for (int k = 0; k < Activities.Count; k++)
                {
                    var candidateDependency = directionIn ? dependencyMatrix.DirectDependencyMatrix[k, j] : dependencyMatrix.DirectDependencyMatrix[i, k];
                    var candidateDirect =
                        directionIn ? successorMatrix.DirectMatrix[k, j] : successorMatrix.DirectMatrix[i, k];
                    if (candidateDependency >= Settings.DependencyThreshold &&
                        strongestDependency - candidateDependency <= Settings.RelativeToBestThreshold &&
                        candidateDirect >= Settings.PositiveObservationsThreshold)
                        extra.Add(directionIn ? new Tuple<int, int>(k, j) : new Tuple<int, int>(i, k));
                }
            }
            return extra;
        }

        /// <summary>
        /// Create Graph based on arcs
        /// </summary>
        /// <param name="arcs">Arcs</param>
        private void CreateGraph(HashSet<Tuple<int, int>> arcs)
        {
            for (var i = 0; i < Activities.Count; i++)
            {
                InputActivities.Add(new HashSet<int>());
                OutputActivities.Add(new HashSet<int>());
            }

            foreach (var (x, y) in arcs)
            {
                InputActivities[y].Add(x);
                OutputActivities[x].Add(y);
            }
        }

        /// <summary>
        /// Find long distance dependencies
        /// </summary>
        /// <param name="successorMatrix">Successor matrix</param>
        private void FindLongDistance(SuccessorMatrix successorMatrix)
        {
            for (var i = 0; i < Activities.Count; i++)
            {
                for (var j = i + 1; j < Activities.Count; j++)
                {
                    // A >>>w B
                    var longDistanceValue = Convert.ToDouble(successorMatrix.LongDistanceMatrix[i, j]) / (successorMatrix.ActivityOccurrences[i] + 1);
                    if (successorMatrix.LongDistanceMatrix[i, j] >= Settings.PositiveObservationsThreshold &&
                        longDistanceValue >= Settings.LongDistanceThreshold)
                    {
                        var startActivity = successorMatrix.ActivityIndices[successorMatrix.StartActivities.First()];
                        var endActivity = successorMatrix.ActivityIndices[successorMatrix.EndActivities.First()];
                        if (PathExists(startActivity, endActivity, i) &&
                            PathExists(startActivity, endActivity, j) &&
                            PathExists(i, endActivity, j))
                        {
                            OutputActivities[i].Add(j);
                            InputActivities[j].Add(i);
                            LongDependencies.Add(new Tuple<int, int>(i, j));
                        }
                    }
                }
            }
        }

        /// <summary>
        /// Check if exist path from to without visiting skip based on BFS
        /// </summary>
        /// <param name="from">From index</param>
        /// <param name="to">To index</param>
        /// <param name="skip">Skip index</param>
        /// <returns>Bool if exist path from to without visiting skip</returns>
        private bool PathExists(int from, int to, int skip)
        {
            var discovered = new bool[Activities.Count];
            discovered[from] = true;
            var queue = new Queue<int>();
            queue.Enqueue(from);
            while (queue.Count > 0)
            {
                var current = queue.Dequeue();
                if (current == to)
                    return true;
                foreach (var next in OutputActivities[current].Where(next => next != skip && !discovered[next]))
                {
                    discovered[next] = true;
                    queue.Enqueue(next);
                }
            }

            return false;
        }
    }
}
