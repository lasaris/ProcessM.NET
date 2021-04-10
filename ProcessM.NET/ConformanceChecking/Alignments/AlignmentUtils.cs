using System;
using System.Collections.Generic;
using System.Linq;
using Priority_Queue;
using ProcessM.NET.Model;
using ProcessM.NET.Model.BasicPetriNet;
using ProcessM.NET.Model.DataAnalysis;
using ProcessM.NET.Model.SynchronousProductNet;

namespace ProcessM.NET.ConformanceChecking.Alignments
{
    public static class AlignmentUtils
    {
        private static readonly IEqualityComparer<HashSet<IPlace>> IPlaceSetComparer = HashSet<IPlace>.CreateSetComparer();

        public static List<STransition> OptimalAlignmentOnTrace(WorkflowTrace trace, PetriNet pNet, int traceMoveCost = 1,
            int modelMoveCost = 1)
        {
            var tracePNet = MakePNetFromTrace(trace);
            var syncNet = new SynchronousProductNet(tracePNet, pNet, traceMoveCost, modelMoveCost);
            return FindOptimalAlignment(syncNet);
        }

        public static PetriNet MakePNetFromTrace(WorkflowTrace trace)
        {
            var places = new List<IPlace> {new Place("p1'")};
            var transitions = new List<ITransition>();
            
            var i = 2;
            foreach (var activity in trace.Activities)
            {
                places.Add(new Place("p" + i + "'"));
                transitions.Add(new Transition("t" + (i - 1) + "'", activity));
                transitions[^1].InputPlaces.Add(places[^2]);
                transitions[^1].OutputPlaces.Add(places[^1]);
                i++;
            }

            return new PetriNet(transitions, places, places[0], places[^1]);
        }

        public static Dictionary<WorkflowTrace, Tuple<AlignmentOnTrace, int>> OptimalAlignmentsOnLog(WorkflowLog workflowLog, PetriNet pNet,
            int traceMoveCost = 1, int modelMoveCost = 1)
        {
            var dict = new Dictionary<WorkflowTrace, Tuple<AlignmentOnTrace, int>>();
            var worstCostOnModel = ComputeWorstCostOfModel(pNet, modelMoveCost);
            foreach (var (trace, occurrence) in workflowLog.GetTracesWithOccurrence())
            {
                var traceAlignment =
                    new AlignmentOnTrace(trace, pNet, worstCostOnModel, traceMoveCost, modelMoveCost);
                dict[trace] = new Tuple<AlignmentOnTrace, int>(traceAlignment, occurrence);
            }

            return dict;
        }

        public static double ComputeCostOfAlignment(List<STransition> alignment)
        {
            return alignment.Sum(sTransition => sTransition.Cost);
        }

        private static List<STransition> ConstructAlignmentFromParentDict(
            IReadOnlyDictionary<HashSet<IPlace>, Tuple<STransition, HashSet<IPlace>>> parentDict,
            SynchronousProductNet syncNet)
        {
            var alignment = new List<STransition>();

            HashSet<IPlace> currentPlace = syncNet.EndPlaces;
            while (!IPlaceSetComparer.Equals(currentPlace, syncNet.StartPlaces))
            {
                (var transition, HashSet<IPlace> parentPlace) = parentDict[currentPlace];
                currentPlace = parentPlace;
                alignment.Add(transition);
            }

            alignment.Reverse();
            return alignment;
        }


        private static List<STransition> FindOptimalAlignment(SynchronousProductNet syncNet)
        {
            var priorityQueue = new SimplePriorityQueue<HashSet<IPlace>, int>(IPlaceSetComparer);
            priorityQueue.Enqueue(syncNet.StartPlaces, 0);

            var parents = new Dictionary<HashSet<IPlace>, Tuple<STransition, HashSet<IPlace>>>(IPlaceSetComparer);
            var explored = new HashSet<HashSet<IPlace>>(IPlaceSetComparer);

            while (priorityQueue.Count > 0)
            {
                var priority = priorityQueue.GetPriority(priorityQueue.First);
                HashSet<IPlace> node = priorityQueue.Dequeue();

                if (IPlaceSetComparer.Equals(node, syncNet.EndPlaces))
                    break;

                explored.Add(node);

                foreach (var place in node)
                {
                    foreach (var transition in syncNet.PlacesToTransitions[place])
                    {
                        HashSet<IPlace> nextNode = node;

                        var containsAll = true;

                        if (transition.InputPlaces.Count > 1)
                            if (transition.InputPlaces.Any(p => !nextNode.Contains(p)))
                                containsAll = false;

                        if (!containsAll) continue;

                        List<IPlace> asList = nextNode.ToList();

                        asList.AddRange(transition.OutputPlaces);
                        nextNode = asList.Where(p => !transition.InputPlaces.Contains(p)).ToHashSet();

                        if (explored.Contains(nextNode)) continue;

                        if (priorityQueue.Contains(nextNode))
                        {
                            if (priorityQueue.GetPriority(nextNode) <= priority + transition.Cost) continue;
                            priorityQueue.UpdatePriority(nextNode, priority + transition.Cost);
                            parents[nextNode] = new Tuple<STransition, HashSet<IPlace>>(transition, node);
                        }
                        else
                        {
                            parents.Add(nextNode, new Tuple<STransition, HashSet<IPlace>>(transition, node));
                            priorityQueue.Enqueue(nextNode, priority + transition.Cost);
                        }
                    }
                }
            }
            
            return ConstructAlignmentFromParentDict(parents, syncNet);
        }

        public static double ComputeWorstCostOfModel(PetriNet pNet, int modelMoveCost = 1)
        {
            return ComputeCostOfAlignment(FindOptimalAlignment(new SynchronousProductNet(pNet, modelMoveCost)));
        }

        public static double ComputeWorstCostOfTrace(WorkflowTrace trace, int traceMoveCost = 1)
        {
            return trace.Activities.Count * traceMoveCost;
        }
    }
}