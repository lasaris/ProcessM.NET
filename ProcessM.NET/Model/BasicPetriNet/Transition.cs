using System.Collections.Generic;

namespace ProcessM.NET.Model.BasicPetriNet
{
    /// <summary>
    /// Basic transition implementation.
    /// </summary>
    public class Transition : ITransition
    {
        public List<IPlace> InputPlaces { get; }
        public List<IPlace> OutputPlaces { get; }
        public string Id { get; }
        public string Activity { get; }
        public bool Invisible { get; private set; } = false;

        public Transition(string id, string activity)
        {
            InputPlaces = new List<IPlace>();
            OutputPlaces = new List<IPlace>();
            Id = id;
            Activity = activity;
        }

        public void MakeInvisible()
        {
            Invisible = true;
        }
    }
}
