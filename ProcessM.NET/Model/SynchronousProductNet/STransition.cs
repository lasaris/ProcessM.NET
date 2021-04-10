using System.Collections.Generic;

namespace ProcessM.NET.Model.SynchronousProductNet
{
    public class STransition : ITransition
    {
        public List<IPlace> InputPlaces { get; }
        public List<IPlace> OutputPlaces { get; }
        public string Id { get; }
        public string Activity { get; }
        public int Cost { get; }
        public bool Invisible { get; private set; }

        public STransition(ITransition transition, int cost)
        {
            InputPlaces = new List<IPlace>();
            OutputPlaces = new List<IPlace>();
            Id = transition.Id;
            Activity = transition.Activity;
            InputPlaces = transition.InputPlaces;
            OutputPlaces = transition.OutputPlaces;
            Cost = cost;
            Invisible = transition.Invisible;
        }

        public void MakeInvisible()
        {
            Invisible = true;
        }
    }
}
