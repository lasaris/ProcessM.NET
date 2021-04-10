using ProcessM.NET.Model;
using ProcessM.NET.Model.DataAnalysis;
using System;
using System.Collections.Generic;
using System.Text;

namespace ProcessM.NET.ConformanceChecking.CausalFootprint
{
    /// <summary>
    /// This class creates Causal Footprint overlay of given Petri Net, analyzes the results and returns Relation DirectDependencyMatrix of given Petri Net.
    /// </summary>
    public static class PetriNetAnalyzer
    {
        /// <summary>
        /// Finds all transitions that come directly after the beginningTransition in given Petri Net and updates given Relation DirectDependencyMatrix accordingly.
        /// </summary>
        /// <param name="matrix">A relation matrix of analyzed Petri Net.</param>
        /// <param name="beginningTransition">A beginning transition.</param>
        /// <param name="net">Analyzed Petri Net.</param>
        private static void FindSuccessions(ref RelationMatrix matrix, ITransition beginningTransition, IPetriNet net)
        {
            int fromIndex = matrix.ActivityIndices[beginningTransition.Activity];
            List<int> toIndices = new List<int>();
            List<ITransition> nextTransitions = new List<ITransition>();
            foreach(ITransition t in net.Transitions)
            {
                foreach(IPlace op in beginningTransition.OutputPlaces)
                {
                    if (t.InputPlaces.Contains(op))
                    {
                        toIndices.Add(matrix.ActivityIndices[t.Activity]);
                        nextTransitions.Add(t);
                    }
                }
            }

            foreach(int toIndex in toIndices)
            {
                matrix.Footprint[fromIndex, toIndex] = Relation.Succession;
            }

            foreach(ITransition t in nextTransitions)
            {
                bool visited = false;
                for (int i = 0; i < matrix.Activities.Count; i++)
                {
                    if (matrix.Footprint[matrix.ActivityIndices[t.Activity], i] == Relation.Succession)
                    {
                        visited = true;
                    }
                }
                if (!visited)
                {
                    FindSuccessions(ref matrix, t, net);
                }
            }
        }

        /// <summary>
        /// Checks whether given transition overlays are not "falsely parallel" (A does not directly precede B, but A always comes before B).
        /// </summary>
        /// <param name="fromTransition">Transition overlay A.</param>
        /// <param name="toTransition">Transition overlay B.</param>
        /// <returns>True if A is falsely parallel with B, else returns false.</returns>
        private static bool IsFalseParallelism(TransitionTokenTraverseOverlay fromTransition, TransitionTokenTraverseOverlay toTransition)
        {
            return fromTransition.TokenFootprint.ActiveLevels.Exists(a => toTransition.TokenFootprint.MergedLevels.Contains(a))
                || fromTransition.TokenFootprint.ActiveLevels.Exists(a => toTransition.TokenFootprint.ActiveLevels.Contains(a));
        }

        /// <summary>
        /// Finds parallelism in Petri Net overlay and updates given Relation DirectDependencyMatrix accordingly.
        /// </summary>
        /// <param name="matrix">A relation matrix of analyzed Petri Net.</param>
        /// <param name="net">Petri Net overlay.</param>
        private static void FindParallelism(ref RelationMatrix matrix, PetriNetTokenTraverseOverlay net)
        {
            foreach(var fromTransition in net.TransitionsWithFootprints)
            {
                foreach(var toTransition in net.TransitionsWithFootprints)
                {
                    if (fromTransition.Id != toTransition.Id)
                    {
                        HashSet<string> fromTransitionGlobalIds = new HashSet<string>(
                            TokenManipulationUtils.GetActiveGlobalIds(fromTransition.TokenFootprint));
                        HashSet<string> toTransitionGlobalIds = new HashSet<string>(
                            TokenManipulationUtils.GetActiveGlobalIds(toTransition.TokenFootprint));
                        if (fromTransitionGlobalIds.Overlaps(toTransitionGlobalIds) && !IsFalseParallelism(fromTransition, toTransition))
                        {
                            int fromIndex = matrix.ActivityIndices[fromTransition.Activity];
                            int toIndex = matrix.ActivityIndices[toTransition.Activity];
                            matrix.Footprint[fromIndex, toIndex] = Relation.Parallelism;
                            matrix.Footprint[toIndex, fromIndex] = Relation.Parallelism;
                        }
                    }
                }
            }
        }

        /// <summary>
        /// Goes through all fields in Relation matrix and marks predecessions accordingly.
        /// Successions and parallelism needs to be already marked.
        /// </summary>
        /// <param name="matrix">A relation matrix of analyzed Petri Net.</param>
        private static void UpdatePredecessions(ref RelationMatrix matrix)
        {
            for (int from = 0; from < matrix.Activities.Count; from++)
            {
                for (int to = 0; to < matrix.Activities.Count; to++)
                {
                    if (matrix.Footprint[from, to] == Relation.Succession)
                    {
                        matrix.Footprint[to, from] = Relation.Predecession;
                    }
                }
            }
        }

        /// <summary>
        /// Gets activities from transitions from analyzed Petri Net.
        /// </summary>
        /// <param name="transitions">Transitions of analyzed Petri Net.</param>
        /// <returns>List of strings representing activities.</returns>
        private static List<string> GetActivities(List<ITransition> transitions)
        {
            List<string> activities = new List<string>();
            foreach(ITransition t in transitions)
            {
                activities.Add(t.Activity);
            }
            return activities;
        }

        /// <summary>
        /// Gets start activities from transitions from analyzed Petri Net.
        /// </summary>
        /// <param name="transitions">Transitions of analyzed Petri Net.</param>
        /// <param name="startPlace">Start place of analyzed Petri Net.</param>
        /// <returns>Set of strings representing activities which can appear at the beginning of traces.</returns>
        private static HashSet<string> GetStartActivities(List<ITransition> transitions, IPlace startPlace)
        {
            HashSet<string> startActivities = new HashSet<string>();
            foreach(ITransition t in transitions.FindAll(a => a.InputPlaces.Exists(b => b.Id == startPlace.Id)))
            {
                startActivities.Add(t.Activity);
            }
            return startActivities;
        }

        /// <summary>
        /// Gets end activities from transitions from analyzed Petri Net.
        /// </summary>
        /// <param name="transitions">Transitions of analyzed Petri Net.</param>
        /// <param name="endPlace">End place of analyzed Petri Net.</param>
        /// <returns>Set of strings representing activities which can appear at the end of traces.</returns>
        private static HashSet<string> GetEndActivities(List<ITransition> transitions, IPlace endPlace)
        {
            HashSet<string> endActivities = new HashSet<string>();
            foreach (ITransition t in transitions.FindAll(a => a.OutputPlaces.Exists(b => b.Id == endPlace.Id)))
            {
                endActivities.Add(t.Activity);
            }
            return endActivities;
        }

        /// <summary>
        /// Creates a relation matrix accordingly to given Petri Net.
        /// </summary>
        /// <param name="net">Petri Net to be analyzed.</param>
        /// <returns>RelationMatrix of given Petri Net.</returns>
        public static RelationMatrix MakeRelationMatrix(IPetriNet net)
        {
            List<string> activities = GetActivities(net.Transitions);
            HashSet<string> startActivities = GetStartActivities(net.Transitions, net.StartPlace);
            HashSet<string> endActivities = GetEndActivities(net.Transitions, net.EndPlace);
            RelationMatrix matrix = new RelationMatrix(activities, startActivities, endActivities);

            foreach (ITransition t in net.GetStartTransitions())
            {
                FindSuccessions(ref matrix, t, net);
            }

            var analysisOverlay = new PetriNetTokenTraverseOverlay(net);
            FindParallelism(ref matrix, analysisOverlay);

            UpdatePredecessions(ref matrix);

            return matrix;
        }
    }
}
