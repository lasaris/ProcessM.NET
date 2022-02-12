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
        public bool Invisible { get; set; } = false;
        
        public  int Frequency { get; }

        public Transition(string id, string activity)
        {
            InputPlaces = new List<IPlace>();
            OutputPlaces = new List<IPlace>();
            Id = id;
            Activity = activity;
        }
        
        public Transition(string id, string activity, int frequency) : this(id, activity)
        {
            Frequency = frequency;
        }

        public Transition(string id, string activity, int frequency, List<IPlace> iPlaces, List<IPlace> oPlaces, bool invisible) : this(id, activity, frequency)
        {
            InputPlaces = iPlaces;
            OutputPlaces = oPlaces;
            Invisible = invisible;
        }

        public void ChangeVisibility()
        {
            Invisible = true;
        }
    }
}
