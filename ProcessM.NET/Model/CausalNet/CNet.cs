using System;
using System.Collections.Generic;
using System.Linq;
using ProcessM.NET.Discovery.Heuristic_Miner;
using ProcessM.NET.Model.DataAnalysis;

namespace ProcessM.NET.Model.CausalNet
{
    public class CNet : ICNet
    {
        public CNet(WorkflowLog workflowLog, int minFreq, float minDependency, int minBind, int windowSize)
        {
            var directlyFollowsMatrix = new DirectlyFollowsMatrix(workflowLog);
            var dependencyGraph = new DependencyGraph(directlyFollowsMatrix, minFreq, minDependency);
            FillActivities(directlyFollowsMatrix);
            FindBindings(workflowLog, dependencyGraph, windowSize);
            FilterBindings(minBind);
        }

        public Dictionary<string, HashSet<IBinding>> InputBindings { get; } =
            new Dictionary<string, HashSet<IBinding>>();

        public Dictionary<string, HashSet<IBinding>> OutputBindings { get; } =
            new Dictionary<string, HashSet<IBinding>>();

        public List<ICPlace> Activities { get; } = new List<ICPlace>();

        public ICPlace StartActivity { get; private set; }

        public ICPlace EndActivity { get; private set; }

        private void FillActivities(MatrixBase directlyFollowsMatrixMatrix)
        {
            StartActivity = new ICPlace(directlyFollowsMatrixMatrix.StartActivities.First());
            EndActivity = new ICPlace(directlyFollowsMatrixMatrix.EndActivities.First());
            foreach (var activity in directlyFollowsMatrixMatrix.Activities) Activities.Add(new ICPlace(activity));
        }

        private void FindBindings(WorkflowLog workflowLog, DependencyGraph dependencyGraph, int windowSize)
        {
            foreach (var activity in Activities)
            {
                var inputBindings = new HashSet<IBinding>();
                var outputBindings = new HashSet<IBinding>();
                OutputBindings.Add(activity.Id, outputBindings);
                InputBindings.Add(activity.Id, inputBindings);
            }

            foreach (var trace in workflowLog.WorkflowTraces)
                for (var i = 0; i < trace.Activities.Count; i++)
                {
                    HashSet<string> inActivities = GetInActivitiesInWindow(trace, dependencyGraph, i, windowSize);
                    HashSet<string> outActivities = GetOutActivitiesInWindow(trace, dependencyGraph, i, windowSize);
                    var usedBinding = InputBindings[trace.Activities[i]]
                        .FirstOrDefault(binding => binding.Activities.SetEquals(inActivities));
                    if (usedBinding is null)
                    {
                        usedBinding = new Binding(inActivities);
                        InputBindings[trace.Activities[i]].Add(usedBinding);
                    }

                    usedBinding.AddFrequency();
                    usedBinding = OutputBindings[trace.Activities[i]]
                        .FirstOrDefault(binding => binding.Activities.SetEquals(outActivities));
                    if (usedBinding is null)
                    {
                        usedBinding = new Binding(outActivities);
                        OutputBindings[trace.Activities[i]].Add(usedBinding);
                    }

                    usedBinding.AddFrequency();
                }
        }

        private void FilterBindings(int minBind)
        {
            foreach (KeyValuePair<string, HashSet<IBinding>> bindings in InputBindings)
                bindings.Value.RemoveWhere(b => b.Frequency <= minBind);
            foreach (KeyValuePair<string, HashSet<IBinding>> bindings in OutputBindings)
                bindings.Value.RemoveWhere(b => b.Frequency <= minBind);
        }

        private static HashSet<string> GetOutActivitiesInWindow(WorkflowTrace workflowTrace,
            DependencyGraph dependencyGraph, int index, int windowSize = 4)
        {
            List<string> outActivities = workflowTrace
                .Activities
                .GetRange(Math.Min(index + 1, workflowTrace.Activities.Count - 1),
                    Math.Min(windowSize, workflowTrace.Activities.Count - index - 1));
            outActivities = outActivities
                .Where(activity => dependencyGraph
                    .Graph[workflowTrace.Activities[index]]
                    .Contains(activity))
                .ToHashSet()
                .ToList();

            for (var i = 0; i < outActivities.Count; i++)
                if (IsInFollowedList(outActivities.GetRange(0, i), dependencyGraph, outActivities[i]))
                    outActivities.Remove(outActivities[i]);

            return outActivities.ToHashSet();
        }

        private static bool IsInFollowedList(IEnumerable<string> activities, DependencyGraph dependencyGraph,
            string activity)
        {
            return activities.Any(act => dependencyGraph.Graph[act]
                .Contains(activity));
        }

        private static bool IsInPreviousList(IEnumerable<string> activities, DependencyGraph dependencyGraph,
            string activity)
        {
            return activities.Any(act => dependencyGraph.Graph[activity]
                .Contains(act));
        }

        private static HashSet<string> GetInActivitiesInWindow(WorkflowTrace workflowTrace,
            DependencyGraph dependencyGraph, int index, int windowSize = 4)
        {
            List<string> inActivities
                = workflowTrace.Activities
                    .GetRange(Math.Max(index - windowSize, 0), index);
            inActivities = inActivities
                .Where(activity => dependencyGraph
                    .Graph[activity]
                    .Contains(workflowTrace.Activities[index]))
                .ToHashSet()
                .ToList();

            for (var i = 0; i < inActivities.Count; i++)
                if (IsInPreviousList(inActivities.GetRange(i, inActivities.Count - i), dependencyGraph,
                    inActivities[i]))
                    inActivities.Remove(inActivities[i]);

            return inActivities.ToHashSet();
        }
    }
}