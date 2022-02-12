using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using ProcessM.NET.Model.BasicPetriNet;

namespace ProcessM.NET.Model.DisplayPetriNet
{
    /// <summary>
    /// Display Petri Net implementation.
    /// </summary>
    public class DPetriNet : PetriNet
    {

        public Dictionary<string, string> TransitionColor { get; } = new();


        public DPetriNet(IPetriNet net)
        {
            Transitions = new List<ITransition>();
            foreach (var t in net.Transitions)
            {
                Transitions.Add( new Transition(
                    t.Id,
                    t.Activity,
                    t.Frequency,
                    t.InputPlaces.Clone<List<Place>>().ToList<IPlace>(),
                    t.OutputPlaces.Clone<List<Place>>().ToList<IPlace>(),
                    t.Invisible
                ));
            }
            Places = net.Places.Clone<List<Place>>().ToList<IPlace>();
            StartPlace = net.StartPlace.Clone<Place>();
            EndPlace = net.EndPlace.Clone<Place>();
            Preprocess();
        }

        private void Preprocess()
        {
            var transform = new Dictionary<string, string>();

            foreach (IPlace p in Places)
            {
                var inTransitions = string.Join(",", Transitions.Where(a => a.OutputPlaces.Contains(p)).Select(t => t.Activity));
                var outTransitions = string.Join(",", Transitions.Where(a => a.InputPlaces.Contains(p)).Select(t => t.Activity));
                var placeId = "(" + inTransitions + ") place (" + outTransitions + ")";
                transform.Add(p.Id, placeId);
                p.Id = placeId;
            }

            foreach (var t in Transitions)
            {
                foreach (var p in t.OutputPlaces)
                {
                    
                    string newId;
                    if (transform.TryGetValue(p.Id, out newId))
                    {
                        p.Id = newId;
                    };
                    
                }
                foreach (var p in t.InputPlaces)
                {
                    string newId;
                    if (transform.TryGetValue(p.Id, out newId))
                    {
                        p.Id = newId;
                    };
                }

                if (t.Invisible)
                {
                    t.Id = string.Join(",", t.InputPlaces.Select(p => p.Id)) + " | " +
                           string.Join(",", t.OutputPlaces.Select(p => p.Id));
                }
            }
        }
        
        public void ToggleActivityHidden(string transitionId)
        {
            var transition = Transitions.First(t => t.Id == transitionId);
            transition.ChangeVisibility();
        }
        
        public void ChangeActivityColor(string transitionId, string color)
        {
            TransitionColor[transitionId] = color;
        }
    }
    
    public static class ObjectExtension
    {
        public static T Clone<T>(this object objSource)
        {
            return  JsonSerializer.Deserialize<T>(JsonSerializer.Serialize(objSource));
        }
    }
    
}
