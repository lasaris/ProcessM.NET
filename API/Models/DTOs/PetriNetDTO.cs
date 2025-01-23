using ProcessM.NET.Model;
using ProcessM.NET.Model.BasicPetriNet;

namespace API.Models;

public class PetriNetDTO
{
    public List<TransitionDTO>? Transitions { get; set; }
    public List<Place>? Places { get; set; }
    public Place? StartPlace { get; set; }
    public Place? EndPlace { get; set; }

    public PetriNet ConvertToPetriNet()
    {
        if (Transitions == null || Places == null)
        {
            return new PetriNet(new List<ITransition>(), new List<IPlace>(), StartPlace, EndPlace);
        }

        var transitions = Transitions.Select((transition) => transition.ConvertToTransition()).Cast<ITransition>().ToList();
        var places = Places.Cast<IPlace>().ToList();

        return new PetriNet(transitions, places, StartPlace, EndPlace);
    }
}