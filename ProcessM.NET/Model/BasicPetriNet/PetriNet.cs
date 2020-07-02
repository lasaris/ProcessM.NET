using System;
using System.Collections.Generic;

namespace ProcessM.NET.Model.BasicPetriNet
{
    /// <summary>
    /// Basic Petri Net implementation.
    /// </summary>
    public class PetriNet : IPetriNet
    {
        public List<ITransition> Transitions { get; }

        public List<IPlace> Places { get; }

        public IPlace StartPlace { get; }

        public IPlace EndPlace { get; }

        /// <summary>
        /// Finds corresponding transition of a Petri net to given activity (the search is not case-sensitive). 
        /// If such transition does not exist, returns null.
        /// </summary>
        /// <param name="activity">Activity of transition to look for.</param>
        /// <returns>Transition with given activity.</returns>
        public ITransition GetTransition(string activity)
        {
            if (activity == null)
            {
                throw new ArgumentNullException("Activity string cannot be null");
            }
            return Transitions.Find(a => a.Activity.ToLower() == activity.ToLower());
        }

        /// <summary>
        /// Finds all start transitions of a Petri net (transitions which can appear at the beginning of a trace).
        /// </summary>
        /// <returns>List of start transitions.</returns>
        public List<ITransition> GetStartTransitions()
        {
            List<ITransition> startTransitions = new List<ITransition>();
            foreach(ITransition t in Transitions)
            {
                bool isStartTransition = true;
                foreach(IPlace ip in t.InputPlaces)
                {
                    if (ip.Id != StartPlace.Id)
                    {
                        isStartTransition = false;
                        break;
                    }
                }
                if (isStartTransition)
                {
                    startTransitions.Add(t);
                }
            }
            return startTransitions;
        }

        public PetriNet(List<ITransition> transitions, List<IPlace> places, IPlace startPlace, IPlace endPlace)
        {
            Transitions = transitions;
            Places = places;
            StartPlace = startPlace;
            EndPlace = endPlace;
        }
    }
}
