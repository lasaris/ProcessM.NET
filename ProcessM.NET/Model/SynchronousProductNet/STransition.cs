using System.Collections.Generic;

namespace ProcessM.NET.Model.SynchronousProductNet
{
    /// <summary>
    /// Class which represents synchronous product net transition
    /// </summary>
    public class STransition : ITransition
    {
        /// <summary>
        /// Input places of transition
        /// </summary>
        public List<IPlace> InputPlaces { get; }
        /// <summary>
        /// Output places of transition
        /// </summary>
        public List<IPlace> OutputPlaces { get; }
        /// <summary>
        /// Id of transition
        /// </summary>
        public string Id { get; }
        /// <summary>
        /// Activity
        /// </summary>
        public string Activity { get; }
        /// <summary>
        /// Cost of transition
        /// </summary>
        public int Cost { get; }
        /// <summary>
        /// Visibility
        /// </summary>
        public bool Invisible { get; private set; }


        /// <param name="transition">Transition</param>
        /// <param name="cost">Cost</param>
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

        /// <summary>
        /// Methods which change transitions visibility
        /// </summary>
        public void ChangeVisibility()
        {
            Invisible = !Invisible;
        }
    }
}
