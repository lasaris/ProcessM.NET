using System.Collections.Generic;

namespace ProcessM.NET.Model.BasicPetriNet
{
    /// <summary>
    /// Basic transition implementation.
    /// </summary>
    public class Transition : ITransition
    {
        public List<IPlace> InputPlaces { get; } = new List<IPlace>();
        public List<IPlace> OutputPlaces { get; } = new List<IPlace>();
        public string Id { get; }
        public string Activity { get; }

        public Transition(string id, string activity)
        {
            InputPlaces = new List<IPlace>();
            OutputPlaces = new List<IPlace>();
            Id = id;
            Activity = activity;
        }
    }
}
