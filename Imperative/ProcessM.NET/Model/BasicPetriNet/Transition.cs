using System.Collections.Generic;

namespace ProcessM.NET.Model.BasicPetriNet
{
    /// <summary>
    /// Basic transition implementation.
    /// </summary>
    public class Transition : ITransition
    {
        public List<IPlace> InputPlaces { get; set;}
        public List<IPlace> OutputPlaces { get; set;}
        public string Id { get; set; }
        public string Activity { get; set;}
        public int Frequency { get; set;}
        public bool Invisible { get; set; } = false;

        public Transition(string id, string activity, int frequency = 0)
        {
            InputPlaces = new List<IPlace>();
            OutputPlaces = new List<IPlace>();
            Id = id;
            Frequency = frequency;
            Activity = activity;
        }

        public void ChangeVisibility()
        {
            Invisible = true;
        }
    }
}
