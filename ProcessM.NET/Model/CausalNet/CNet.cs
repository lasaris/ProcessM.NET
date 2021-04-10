using System;
using System.Collections.Generic;
using System.Linq;
using ProcessM.NET.Discovery.HeuristicMiner;
using ProcessM.NET.Model.DataAnalysis;

namespace ProcessM.NET.Model.CausalNet
{
    public class CNet : ICNet
    {
        public List<string> IndexToActivity { get; }
        public Dictionary<string, int> ActivityIndices { get; }
        public List<CPlace> Activities { get; } = new List<CPlace>();
        public CPlace StartActivity { get; private set; }
        public CPlace EndActivity { get; private set; }

        public Dictionary<Tuple<int, int>, int> LongDistance { get; }
            = new Dictionary<Tuple<int, int>, int>();

        public Dictionary<int, HashSet<IBinding>> InputBindings { get; } =
            new Dictionary<int, HashSet<IBinding>>();

        public Dictionary<int, HashSet<IBinding>> OutputBindings { get; } =
            new Dictionary<int, HashSet<IBinding>>();


        public CNet(WorkflowLog workflowLog, HeuristicMinerSettings heuristicsMinerSettings)
        {
            var successorMatrix = new SuccessorMatrix(workflowLog);
            var dependencyGraph = new DependencyGraph(successorMatrix, heuristicsMinerSettings);
            IndexToActivity = dependencyGraph.Activities;
            ActivityIndices = dependencyGraph.ActivityIndices;
            FillActivities(successorMatrix);
            PrepareBindings(dependencyGraph);
            FindBindings(dependencyGraph, workflowLog);
        }

        private void FillActivities(SuccessorMatrix successorMatrix)
        {
            var startAct = successorMatrix.StartActivities.First();
            var endAct = successorMatrix.EndActivities.First();
            for (int i = 0; i < successorMatrix.ActivityOccurrences.Length; i++)
            {
                var freq = successorMatrix.ActivityOccurrences[i];
                Activities.Add(new CPlace(i, freq));
            }

            StartActivity = Activities[successorMatrix.ActivityIndices[startAct]];
            EndActivity = Activities[successorMatrix.ActivityIndices[endAct]];
        }

        private void PrepareBindings(DependencyGraph dependencyGraph)
        {
            foreach (var activity in Activities)
            {
                InputBindings.Add(activity.Id, new HashSet<IBinding>());
                OutputBindings.Add(activity.Id, new HashSet<IBinding>());
            }

            foreach (var longDependency in dependencyGraph.LongDependencies)
            {
                LongDistance.Add(longDependency, 0);
            }
        }

        private void FindBindings(DependencyGraph dependencyGraph, WorkflowLog workflowLog)
        {
            foreach (var (trace, occurrence) in workflowLog.GetTracesWithOccurrence())
            {
                for (var i = 0; i < trace.Activities.Count; i++)
                {
                    int currentActivity = dependencyGraph.ActivityIndices[trace.Activities[i]];

                    var outCandidate = OutBindCandidate(dependencyGraph, currentActivity, i, trace, occurrence);
                    var inCandidate = InBindCandidate(dependencyGraph, currentActivity, i, trace);

                    if (outCandidate.Count > 0)
                    {
                        var binding = OutputBindings[currentActivity].FirstOrDefault(b => b.Activities.SetEquals(outCandidate));
                        if (binding is null)
                        {
                            OutputBindings[currentActivity].Add(new Binding(outCandidate, occurrence));
                        } else binding.AddFrequency(occurrence);
                    }

                    if (inCandidate.Count <= 0) continue;
                    {
                        var binding = InputBindings[currentActivity].FirstOrDefault(b => b.Activities.SetEquals(inCandidate));
                        if (binding is null)
                        {
                            InputBindings[currentActivity].Add(new Binding(inCandidate, occurrence));
                        } else binding.AddFrequency(occurrence);
                    }
                }
            }
        }

        private HashSet<int> OutBindCandidate(DependencyGraph dependencyGraph, int from, int tracePosition, WorkflowTrace trace, int traceOccurrence)
        {
            var bindCandidate = new HashSet<int>();
            foreach (var to in dependencyGraph.OutputActivities[from])
            {
                if (IsNearestInput(dependencyGraph, from, to, tracePosition, trace, traceOccurrence))
                    bindCandidate.Add(to);
            }

            return bindCandidate;
        }

        private HashSet<int> InBindCandidate(DependencyGraph dependencyGraph, int from, int tracePosition, WorkflowTrace trace)
        {
            var bindCandidate = new HashSet<int>();
            foreach (var to in dependencyGraph.InputActivities[from])
            {
                if (IsNearestOutput(dependencyGraph, from, to, tracePosition, trace))
                    bindCandidate.Add(to);
            }

            return bindCandidate;
        }

        private bool IsNearestInput(DependencyGraph dependencyGraph, int from, int to,
            int tracePosition, WorkflowTrace trace, int traceOccurrence)
        {
            var fromTo = new Tuple<int, int>(from, to);
            for (int i = tracePosition + 1; i < trace.Activities.Count; i++)
            {
                var iActivity = ActivityIndices[trace.Activities[i]];
                if (iActivity == to)
                {
                    if (!dependencyGraph.LongDependencies.Any(t => t.Equals(fromTo)))
                    {
                        for (int j = i - 1; j > tracePosition; j--)
                        {
                            var jActivity = ActivityIndices[trace.Activities[j]];
                            if (dependencyGraph.OutputActivities[jActivity].Contains(iActivity) &&
                                dependencyGraph.OutputActivities[from].Contains(jActivity))
                                return false;
                        }
                    }
                    else
                    {
                        LongDistance[fromTo] += traceOccurrence;
                        return false;
                    }
                    return true;
                }

                if (trace.Activities[i] == trace.Activities[tracePosition]) //Same activity, which we started with
                {
                    return false;
                }
            }

            //No occurrence of to activity
            return false;
        }

        private bool IsNearestOutput(DependencyGraph dependencyGraph, int from, int to,
            int tracePosition, WorkflowTrace trace)
        {
            if (dependencyGraph.LongDependencies.Any(t => t.Item1 == to && t.Item2 == from))
                return false;
            for (int i = tracePosition - 1; i >= 0; i--)
            {
                var iActivity = ActivityIndices[trace.Activities[i]];
                if (iActivity == to)
                {
                    for (int j = i + 1; j < tracePosition; j++)
                    {
                        var jActivity = ActivityIndices[trace.Activities[j]];
                    
                        if (dependencyGraph.InputActivities[jActivity].Contains(iActivity) &&
                            dependencyGraph.InputActivities[from].Contains(jActivity))
                            return false;
                    }
                    return true;
                }

                if (trace.Activities[i] == trace.Activities[tracePosition]) //Same activity, which we started with
                {
                    return false;
                }
            }

            //No occurrence of to activity
            return false;
        }
    }
}