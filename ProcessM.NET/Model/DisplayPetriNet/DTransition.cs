using System.Collections.Generic;
using ProcessM.NET.Model.BasicPetriNet;

namespace ProcessM.NET.Model.DisplayPetriNet;

public class DTransition : Transition
{
    public new List<DPlace> InputPlaces { get; set;}
    public new List<DPlace> OutputPlaces { get; set;}
    public DTransition(string id, string activity, List<DPlace> inputPlaces, List<DPlace> outputPlaces, bool invisible) : base(id, activity)
    {
        InputPlaces = inputPlaces;
        OutputPlaces = outputPlaces;
        Invisible = invisible;
    }

    public string Color { get; set; } = "white";
}