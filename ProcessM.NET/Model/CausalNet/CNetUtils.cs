using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ProcessM.NET.Model.BasicPetriNet;

namespace ProcessM.NET.Model.CausalNet
{
    /// <summary>
    /// Class which represents basic utils for Causal Net
    /// </summary>
    public static class CNetUtils
    {
        /// <summary>
        /// Convert Causal net to Petri net
        /// </summary>
        /// <param name="causalNet"></param>
        /// <returns></returns>
        public static PetriNet ConvertCNetToPetriNet(CNet causalNet)
        {
            var inputPlaces = new Dictionary<int, int>();
            var outputPlaces = new Dictionary<int, int>();
            var actTransitions = new Dictionary<int, int>(); //Stores the transitions of each activity
            var places = new List<IPlace>();
            var transitions = new List<ITransition>();
            var transitionCount = -1;
            var placeCount = -1;
            
            foreach (var activity in causalNet.Activities) //CREATE INPUT AND OUTPUT PLACES
            {
                var actTransition = new Transition("t" + ++transitionCount, causalNet.IndexToActivity[activity.Id], activity.Frequency);
                
                var inputPlace = new Place("p" + ++placeCount);
                places.Add(inputPlace);
                inputPlaces.Add(activity.Id, places.Count - 1);
                actTransition.InputPlaces.Add(inputPlace);
                
                var outPlace = new Place("p" + ++placeCount);
                places.Add(outPlace);
                outputPlaces.Add(activity.Id, places.Count - 1);
                actTransition.OutputPlaces.Add(outPlace);

                transitions.Add(actTransition);
                actTransitions.Add(activity.Id, transitions.Count - 1);
            }

            foreach (var (aIdx, bindings) in causalNet.InputBindings)
            {
                var placeOut = places[inputPlaces[aIdx]];
                foreach (var bind in bindings.Where(t => t.Activities.Count > 1)) //ONLY MULTIPLE BINDS NEEDED (OTHERS COMES FROM OUT BINDINGS)
                {
                    var bindTransition = new Transition("t" + ++transitionCount, "");
                    bindTransition.ChangeVisibility();
                    bindTransition.OutputPlaces.Add(placeOut);
                    foreach (var bIdx in bind.Activities) //PREDECESSOR ACTIVITY IDX
                    {
                        bindTransition.InputPlaces.Add(places[outputPlaces[bIdx]]);
                    }
                    transitions.Add(bindTransition);
                }
            }

            foreach (var (aIdx, bindings) in causalNet.OutputBindings)
            {
                var placeIn = places[outputPlaces[aIdx]];
                foreach (var bind in bindings)
                {
                    var bindTransition = new Transition("t" + ++transitionCount, "");
                    bindTransition.ChangeVisibility();
                    bindTransition.InputPlaces.Add(placeIn);
                    foreach (var bIdx in bind.Activities) //SUCCESSOR ACTIVITY IDX
                    {
                        bindTransition.OutputPlaces.Add(places[inputPlaces[bIdx]]);
                    }
                    transitions.Add(bindTransition);
                }
            }

            foreach (var (from, to) in causalNet.LongDependencies) //MY APPROACH TO HANDLE LONG DISTANCE DEPENDENCIES
            {
                places.Add(new Place("p" + ++placeCount));
                transitions[actTransitions[from]].OutputPlaces.Add(places[^1]);
                transitions[actTransitions[to]].InputPlaces.Add(places[^1]);
            }

            var startPlace = places[inputPlaces[causalNet.StartActivity.Id]];
            var endPlace = places[outputPlaces[causalNet.EndActivity.Id]];
            return new PetriNet(transitions, places, startPlace, endPlace);
        }
    }
}
