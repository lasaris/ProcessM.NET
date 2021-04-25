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
    /// <summary>
    /// Class which represents basic operations for computing the alignment
    /// </summary>
    public static class AlignmentUtils
    {
        private static readonly IEqualityComparer<HashSet<IPlace>> IPlaceSetComparer = HashSet<IPlace>.CreateSetComparer();

        /// <summary>
        /// Compute optimal alignment based on a trace and a Petri net
        /// </summary>
        /// <param name="trace">Workflow trace</param>
        /// <param name="pNet">Petri net</param>
        /// <param name="traceMoveCost">Trace move cost</param>
        /// <param name="modelMoveCost">Model move cost</param>
        /// <returns>Alignment on trace</returns>
        public static List<STransition> OptimalAlignmentOnTrace(WorkflowTrace trace, PetriNet pNet, int traceMoveCost = 1,
            int modelMoveCost = 1)
        {
            var tracePNet = MakePNetFromTrace(trace);
            var syncNet = new SynchronousProductNet(tracePNet, pNet, traceMoveCost, modelMoveCost);
            return FindOptimalAlignment(syncNet);
        }

        /// <summary>
        /// Construct Petri net from a trace
        /// </summary>
        /// <param name="trace">Workflow trace</param>
        /// <returns>Petri net of trace</returns>
        public static PetriNet MakePNetFromTrace(WorkflowTrace trace)
        {
            var places = new List<IPlace> {new Place("p0'")};
            var transitions = new List<ITransition>();
            
            var i = 1;
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

        /// <summary>
        /// Compute optimal alignment based on a workflow log and a Petri net
        /// </summary>
        /// <param name="workflowLog">Workflow log</param>
        /// <param name="pNet">Petri net</param>
        /// <param name="traceMoveCost">Trace move cost</param>
        /// <param name="modelMoveCost">Model move cost</param>
        /// <returns>Dictionary with a trace as key and tuple (alignment of the trace and trace occurrence) as value</returns>
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

        /// <summary>
        /// Compute cost of trace alignment
        /// </summary>
        /// <param name="alignment">Alignment</param>
        /// <returns>Cost of an alignment as double</returns>
        public static double ComputeCostOfAlignment(List<STransition> alignment)
        {
            return alignment.Sum(sTransition => sTransition.Cost);
        }

        /// <summary>
        /// Compute alignment based on Parent dictionary (helper function to reverse the shortest path in graph)
        /// </summary>
        /// <param name="parentDict">Parent dictionary</param>
        /// <param name="syncNet">Synchronous Net</param>
        /// <returns>Alignment as List of STransitions</returns>
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

        /// <summary>
        /// Find optimal alignment on a synchronous net
        /// </summary>
        /// <param name="syncNet">Synchronous net</param>
        /// <returns>Alignment as List of STransitions</returns>
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
                    foreach (var transitionId in syncNet.PlacesToTransitions[place])
                    {
                        var transition = syncNet.Transitions[transitionId];
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

        /// <summary>
        /// Compute worst cost of model (the shortest path in a Petri net)
        /// </summary>
        /// <param name="pNet">Petri net</param>
        /// <param name="modelMoveCost">Model move cost</param>
        /// <returns>Worst cost of the model as double</returns>
        public static double ComputeWorstCostOfModel(PetriNet pNet, int modelMoveCost = 1)
        {
            return ComputeCostOfAlignment(FindOptimalAlignment(new SynchronousProductNet(pNet, modelMoveCost)));
        }

        /// <summary>
        /// Compute worst cost of a trace
        /// </summary>
        /// <param name="trace">Workflow trace</param>
        /// <param name="traceMoveCost">Trace move cost</param>
        /// <returns>Worst cost of the trace as double</returns>
        public static double ComputeWorstCostOfTrace(WorkflowTrace trace, int traceMoveCost = 1)
        {
            return trace.Activities.Count * traceMoveCost;
        }
    }
}