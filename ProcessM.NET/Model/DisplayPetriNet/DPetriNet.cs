using System;
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
        public new List<DTransition> Transitions { get; }
        public new List<DPlace> Places { get; }

        public new DPlace StartPlace { get; }

        public new DPlace EndPlace { get; }
        
        public DPetriNet(IPetriNet net)
        {
            Transitions = new List<DTransition>();
            foreach (var t in net.Transitions)
            {
                Transitions.Add( new DTransition(
                    t.Id,
                    t.Activity,
                    t.InputPlaces.Clone<List<DPlace>>(),
                    t.OutputPlaces.Clone<List<DPlace>>(),
                    t.Invisible
                ));
            }
            Places = net.Places.Clone<List<DPlace>>();
            StartPlace = net.StartPlace.Clone<DPlace>();
            EndPlace = net.EndPlace.Clone<DPlace>();
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
        
    }
    public static class ObjectExtension
    {
        public static T Clone<T>(this object objSource)
        {
            return  JsonSerializer.Deserialize<T>(JsonSerializer.Serialize(objSource));
        }
    }
    
}
