using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using ProcessM.NET.Model.DataAnalysis;

namespace ProcessM.NET.Discovery.HeuristicMiner
{
    public class DependencyGraph
    {
        /* Mapping int to string */
        public List<string> Activities { get; }
        /* Maping string to int */
        public Dictionary<string, int> ActivityIndices { get; }

        public HeuristicMinerSettings Settings { get; }

        public List<HashSet<int>> InputActivities { get; } = 
            new List<HashSet<int>>();

        public List<HashSet<int>> OutputActivities { get; } =
            new List<HashSet<int>>();

        public HashSet<Tuple<int, int>> LongDependencies { get; } = 
            new HashSet<Tuple<int, int>>();

        public int StartActivity { get; }
        public int EndActivity { get; }

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

        private void CreateDependencyGraph(SuccessorMatrix successorMatrix, DependencyMatrix dependencyMatrix)
        {
            //1. Unnecessary (We store activities in SuccessorMatrix)
            //2. Length 1 loops
            var l1L = FindL1Loops(successorMatrix, dependencyMatrix);
            //3. Length 2 loops
            var l2L = FindL2Loops(successorMatrix, dependencyMatrix);

            var strongFollowers = new HashSet<Tuple<int, int>>();
            var strongCauses = new HashSet<Tuple<int, int>>();
            if (Settings.AllTasksConnected) {
                //4. Each Task; the strongest follower
                strongFollowers = EachTaskStrongestFollower(dependencyMatrix);
                //5. Each Task; the strongest cause
                strongCauses = EachTaskStrongestCause(dependencyMatrix);
                //6. & 7. Find and remove weak outgoing connections for L2L
                RemoveWeakDependencies(dependencyMatrix, strongFollowers, l2L, true);
                //8. & 9. Find and remove weak incoming connections for L2L
                RemoveWeakDependencies(dependencyMatrix, strongCauses, l2L, false);
            }

            strongFollowers.UnionWith(strongCauses);

            //10. Find extra accepted in & out connections
            FindExtra(strongFollowers, dependencyMatrix);
            //12. Combine Hash-sets
            l1L.UnionWith(l2L);
            l1L.UnionWith(strongFollowers);

            CreateGraph(l1L);

            if (Settings.UseLongDistance)
            {
                FindLongDistance(successorMatrix);
            }
        }

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

        private HashSet<Tuple<int, int>> EachTaskStrongestCause(DependencyMatrix dependencyMatrix)
        {
            var causes = new HashSet<Tuple<int, int>>();
            // i == 1 => skip first column
            for (var i = 1; i < Activities.Count; i++)
            {
                var strongest = -1;
                for (var j = 0; j < Activities.Count; j++)
                {
                    if (i == j) continue; //Strongest cause cannot be same activity-
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

        private void RemoveWeakDependencies(DependencyMatrix dependencyMatrix, HashSet<Tuple<int, int>> followers, HashSet<Tuple<int, int>> l2Loops, bool removeIn)
        {
            var toRemove = new HashSet<Tuple<int, int>>();
            foreach (var (a, x) in followers)
            {
                foreach (var (b, y) in followers)
                {
                    if(a == b || y == x) continue;
                    if (l2Loops.Contains(removeIn ? new Tuple<int, int>(a, b) : new Tuple<int, int>(x, y)) && 
                        dependencyMatrix.DirectDependencyMatrix[b, y] -
                        dependencyMatrix.DirectDependencyMatrix[a, x] > Settings.RelativeToBestThreshold)
                    {
                        toRemove.Add(new Tuple<int, int>(a, x));
                    }
                }
            }
            followers.ExceptWith(toRemove);
        }

        private void FindExtra(HashSet<Tuple<int, int>> connections, DependencyMatrix dependencyMatrix)
        {
            var toAdd = new HashSet<Tuple<int, int>>();
            for (var i = 0; i < Activities.Count; i++)
            {
                for (var j = 0; j < Activities.Count; j++)
                {
                    //Add values above dependency thresh
                    if (dependencyMatrix.DirectDependencyMatrix[i, j] >= Settings.DependencyThreshold)
                    {
                        toAdd.Add(new Tuple<int, int>(i, j));
                        continue;
                    }

                    //For each strongest connection find connections which fulfill relative to best distance
                    foreach (var (a, c) in connections)
                    {
                        if(a != i) continue;
                        var c1 = dependencyMatrix.DirectDependencyMatrix[a, c];
                        var c2 = dependencyMatrix.DirectDependencyMatrix[a, j];
                        if (c1 - c2  <  Settings.RelativeToBestThreshold)
                        {
                            toAdd.Add(new Tuple<int, int>(i, j));
                            break;
                        }
                    }
                }
            } 
            connections.UnionWith(toAdd);
        }

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
