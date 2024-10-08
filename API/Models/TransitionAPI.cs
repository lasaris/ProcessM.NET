using ProcessM.NET.Model;
using ProcessM.NET.Model.BasicPetriNet;

namespace API.Models
{
    /// <summary>
    /// Basic transition implementation.
    /// </summary>
    public class TransitionAPI
    {
        public List<Place>? InputPlaces { get; set; }
        public List<Place>? OutputPlaces { get; set; }
        public string? Id { get; set; }
        public string? Activity { get; set; }
        public int Frequency { get; set; }
        public bool Invisible { get; set; } = false;

        public Transition ConvertToTransition()
        {
            var transition = new Transition(Id, Activity, Frequency);

            if (InputPlaces != null)
            {
                transition.InputPlaces = InputPlaces.Cast<IPlace>().ToList();
            }

            if (OutputPlaces != null)
            {
                transition.OutputPlaces = OutputPlaces.Cast<IPlace>().ToList();
            }

            transition.Invisible = Invisible;

            return transition;
        }

    }
}
