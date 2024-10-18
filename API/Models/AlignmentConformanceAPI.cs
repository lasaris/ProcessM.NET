using DeclarativePM.Lib.Models.LogModels;

namespace API.Models;

public class AlignmentConformanceAPI
{
    public PetriNetAPI? PetriNet { get; set; }
    public List<Event>? Trace { get; set; }
}