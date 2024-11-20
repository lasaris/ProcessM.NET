using DeclarativePM.Lib.Models.LogModels;

namespace API.Models;

public class AlignmentConformanceDTO
{
    public PetriNetDTO? PetriNet { get; set; }
    public List<Event>? Trace { get; set; }
}