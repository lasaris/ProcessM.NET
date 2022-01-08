using System.Collections.Generic;

namespace ProcessM.NET.Model
{
    /// <summary>
    /// Interface for transitions in Petri Net or C net.
    /// </summary>
    public interface ITransition
    {
        List<IPlace> InputPlaces { get; }
        List<IPlace> OutputPlaces { get; }
        string Id { get; set; }
        string Activity { get; }
        bool Invisible { get; }

        void ChangeVisibility();
    }
}
