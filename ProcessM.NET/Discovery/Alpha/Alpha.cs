using ProcessM.NET.Model;
using ProcessM.NET.Model.DataAnalysis;
using ProcessM.NET.Model.BasicPetriNet;
using System;
using System.Collections.Generic;
using System.Text;

namespace ProcessM.NET.Discovery.Alpha
{
    /// <summary>
    /// This class is a handler to a Petri Net from relation matrix discovery algorithm.
    /// </summary>
    public static class Alpha
    {
        /// <summary>
        /// Extracts list of transitions from list of activities from given RelationMatrix class.
        /// </summary>
        /// <param name="activities">List of activities from given relation matrix.</param>
        /// <param name="id">Initial transition id, default is 0.</param>
        /// <returns>List of transitions.</returns>
        private static List<ITransition> GetTransitions(List<string> activities, int id = 0)
        {
            List<ITransition> transitions = new List<ITransition>();

            foreach (string activityName in activities)
            {
                transitions.Add(new Transition("t" + id, activityName));
                id++;
            }

            return transitions;
        }

        /// <summary>
        /// Creates and sets up (initializes with id, adds to relevant transitions and containers) a start place in created Petri Net.
        /// </summary>
        /// <param name="places">List (empty) of places in created Petri Net.</param>
        /// <param name="startActivities">Set of start activities from given relation matrix.</param>
        /// <param name="transitions">List of transitions in created Petri Net.</param>
        /// <param name="id">Initial place id, default is 0.</param>
        /// <returns>Id which should be used for next place.</returns>
        private static int SetupStartPlace(List<IPlace> places, HashSet<string> startActivities, List<ITransition> transitions, int id = 0)
        {
            Place startPlace = new Place("p" + id);
            id++;
            places.Add(startPlace);
            foreach (string startTransition in startActivities)
            {
                transitions.Find(a => a.Activity == startTransition).InputPlaces.Add(startPlace);
            }
            return id;
        }

        /// <summary>
        /// Creates and sets up (initializes with id, adds to relevant transitions and containers) a "generic" (not start or end) place in created Petri Net.
        /// </summary>
        /// <param name="setsAB">Pairs of maximal independent sets (A, B) discovered through IndependentSetUtils class methods.</param>
        /// <param name="places">List of places in created Petri Net.</param>
        /// <param name="transitions">List of transitions in created Petri Net.</param>
        /// <param name="id">Id which should be given to the created place.</param>
        /// <returns>Id which should be used for next place.</returns>
        private static int SetupPlaces(HashSet<Tuple<HashSet<string>, HashSet<string>>> setsAB, List<IPlace> places, List<ITransition> transitions, int id)
        {
            foreach (var setAB in setsAB)
            {
                Place placeAB = new Place("p" + id);
                id++;
                places.Add(placeAB);
                foreach (string actA in setAB.Item1)
                {
                    transitions.Find(a => a.Activity == actA).OutputPlaces.Add(placeAB);
                }

                foreach (string actB in setAB.Item2)
                {
                    transitions.Find(a => a.Activity == actB).InputPlaces.Add(placeAB);
                }
            }
            return id;
        }

        /// <summary>
        /// Creates and sets up (initializes with id, adds to relevant transitions and containers) an end place in created Petri Net.
        /// </summary>
        /// <param name="places">List of places in created Petri Net.</param>
        /// <param name="endActivities">Set of start activities from given relation matrix.</param>
        /// <param name="transitions">List of transitions in created Petri Net.</param>
        /// <param name="id">Id which should be given to the created place.</param>
        /// <returns>Id which should be used for next place.</returns>
        private static void SetupEndPlace(List<IPlace> places, HashSet<string> endActivities, List<ITransition> transitions, int id)
        {
            Place endPlace = new Place("p" + id);
            places.Add(endPlace);
            foreach (string endTransition in endActivities)
            {
                transitions.Find(a => a.Activity == endTransition).OutputPlaces.Add(endPlace);
            }
        }

        /// <summary>
        /// Creates a Petri Net from given relation matrix.
        /// </summary>
        /// <param name="matrix">A RelationMatrix used for creating a Petri Net.</param>
        /// <returns>Created PetriNet object.</returns>
        public static PetriNet MakePetriNet (RelationMatrix matrix)
        {
            List<ITransition> transitions = GetTransitions(matrix.Activities);
            List<IPlace> places = new List<IPlace>();
            HashSet<HashSet<string>> independentSets = IndependentSetUtils.FindIndependentSets(matrix.Footprint, matrix.Activities);
            HashSet<Tuple<HashSet<string>, HashSet<string>>> setsAB = IndependentSetUtils.FindMaximalIndependentSetsAB(independentSets, matrix.Footprint, matrix.ActivityIndices);

            int id = SetupStartPlace(places, matrix.StartActivities, transitions);
            id = SetupPlaces(setsAB, places, transitions, id);
            SetupEndPlace(places, matrix.EndActivities, transitions, id);

            return new PetriNet(transitions, places, places[0], places[places.Count - 1]);
        }
    }
}
