using System.Collections.Generic;
using System.Linq;
using ProcessM.NET.Model.BasicPetriNet;

namespace ProcessM.NET.Model.SynchronousProductNet
{
    public class SynchronousProductNet
    {
        public List<STransition> Transitions { get; } = new List<STransition>();
        public List<IPlace> Places { get; } = new List<IPlace>();
        public HashSet<IPlace> StartPlaces { get; } = new HashSet<IPlace>();
        public HashSet<IPlace> EndPlaces { get; } = new HashSet<IPlace>();
        public Dictionary<IPlace, List<STransition>> PlacesToTransitions { get; private set; }

        public SynchronousProductNet(IPetriNet tNet, IPetriNet pNet, int traceMoveCost = 1, int modelMoveCost = 1)
        {
            StartPlaces.Add(tNet.StartPlace);
            StartPlaces.Add(pNet.StartPlace);
            EndPlaces.Add(tNet.EndPlace);
            EndPlaces.Add(pNet.EndPlace);
            Places.AddRange(tNet.Places.Union(pNet.Places));

            PlacesToTransitions = Places.ToDictionary(p => p, p => new List<STransition>());

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
                    Transitions.Add(syncTransition);
                    foreach (var place in transition.InputPlaces)
                    {
                        PlacesToTransitions[place].Add(syncTransition);
                    }
                }
            }
        }

        public SynchronousProductNet(IPetriNet pNet, int modelMoveCost = 1)
        {
            StartPlaces.Add(pNet.StartPlace);
            EndPlaces.Add(pNet.EndPlace);
            Places = pNet.Places;
            
            PlacesToTransitions = Places.ToDictionary(p => p, p => new List<STransition>());
            InitTransitionsFromPNet(pNet, modelMoveCost, true);
        }

        private void InitTransitionsFromPNet(IPetriNet pNet, int cost, bool moveOnModel)
        {
            foreach (var transition in pNet.Transitions)
            {
                var productTransition =
                    new Transition(
                        moveOnModel
                            ? $"(>>,{transition.Id})"
                            : $"({transition.Id},>>)", transition.Activity);
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
                    PlacesToTransitions[place].Add(syncTransition);
                }
                Transitions.Add(syncTransition); 
            }
        }
    }
}
