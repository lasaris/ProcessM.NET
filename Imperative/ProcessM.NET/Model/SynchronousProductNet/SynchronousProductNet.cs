using System.Collections.Generic;
using System.Linq;
using ProcessM.NET.Model.BasicPetriNet;

namespace ProcessM.NET.Model.SynchronousProductNet
{
    /// <summary>
    /// Class which represents a Synchronous product net
    /// </summary>
    public class SynchronousProductNet
    {
        /// <summary>
        /// List of transitions
        /// </summary>
        public List<STransition> Transitions { get; } = new List<STransition>();
        /// <summary>
        /// List of places
        /// </summary>
        public List<IPlace> Places { get; } = new List<IPlace>();
        /// <summary>
        /// HashSet of start places
        /// </summary>
        public HashSet<IPlace> StartPlaces { get; } = new HashSet<IPlace>();
        /// <summary>
        /// HashSet of end places
        /// </summary>
        public HashSet<IPlace> EndPlaces { get; } = new HashSet<IPlace>();
        /// <summary>
        /// Mapping places to their Transitions
        /// </summary>
        public Dictionary<IPlace, List<int>> PlacesToTransitions { get; }

        /// <param name="tNet">Petri net of the trace</param>
        /// <param name="pNet">Petri net of the model</param>
        /// <param name="traceMoveCost">Trace move cost</param>
        /// <param name="modelMoveCost">Model move cost</param>
        public SynchronousProductNet(IPetriNet tNet, IPetriNet pNet, int traceMoveCost = 1, int modelMoveCost = 1)
        {
            StartPlaces.Add(tNet.StartPlace);
            StartPlaces.Add(pNet.StartPlace);
            EndPlaces.Add(tNet.EndPlace);
            EndPlaces.Add(pNet.EndPlace);
            Places.AddRange(tNet.Places.Union(pNet.Places));

            PlacesToTransitions = Places.ToDictionary(p => p, p => new List<int>());

            InitTransitionsFromPNet(tNet, traceMoveCost, false);
            InitTransitionsFromPNet(pNet, modelMoveCost, true);

            //Add transitions for synchronous move as cost 0 + addition to make all costs positive
            foreach (var t1 in tNet.Transitions)
            {
                foreach (var t2 in pNet.Transitions)
                {
                    if (!t1.Activity.Equals(t2.Activity)) continue;
                    var transition = new Transition($"({t1.Id},{t2.Id})", t1.Activity);
                    transition.InputPlaces.AddRange(t1.InputPlaces.Union(t2.InputPlaces));
                    transition.OutputPlaces.AddRange(t1.OutputPlaces.Union(t2.OutputPlaces));
                    var syncTransition = new STransition(transition, 0);
                    
                    foreach (var place in transition.InputPlaces)
                    {
                        PlacesToTransitions[place].Add(Transitions.Count);
                    }

                    Transitions.Add(syncTransition);
                }
            }
        }

        /// <summary>
        /// Creates Synchronous net from the Petri net itself
        /// </summary>
        /// <param name="pNet">Petri net</param>
        /// <param name="modelMoveCost">Model move cost</param>
        public SynchronousProductNet(IPetriNet pNet, int modelMoveCost = 1)
        {
            StartPlaces.Add(pNet.StartPlace);
            EndPlaces.Add(pNet.EndPlace);
            Places = pNet.Places;
            
            PlacesToTransitions = Places.ToDictionary(p => p, p => new List<int>());
            InitTransitionsFromPNet(pNet, modelMoveCost, true);
        }

        /// <summary>
        /// Init transitions from the Petri net
        /// </summary>
        /// <param name="pNet">Petri net</param>
        /// <param name="cost">Cost</param>
        /// <param name="moveOnModel">Model Petri net (true), Trace Petri net (false)</param>
        private void InitTransitionsFromPNet(IPetriNet pNet, int cost, bool moveOnModel)
        {
            foreach (var transition in pNet.Transitions)
            {
                var productTransition =
                    new Transition(
                        moveOnModel
                            ? $"(>>,{transition.Id})"
                            : $"({transition.Id},>>)", transition.Activity);
                if(transition.Invisible)
                    productTransition.ChangeVisibility();
                foreach (var iPlace in transition.InputPlaces)
                {
                    productTransition.InputPlaces.Add(iPlace);
                }
                foreach (var oPlace in transition.OutputPlaces)
                {
                    productTransition.OutputPlaces.Add(oPlace);
                }
                
                // cost 0 for "invisible" transitions
                var syncTransition = new STransition(productTransition, transition.Invisible ? 0 : cost);
                
                foreach (var place in transition.InputPlaces)
                {
                    PlacesToTransitions[place].Add(Transitions.Count);
                }
                Transitions.Add(syncTransition); 
            }
        }
    }
}
