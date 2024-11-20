using DeclarativePM.Lib.Models.DeclareModels;
using DeclarativePM.Lib.Models.LogModels;

namespace API.Models;

public class ConformanceModelDTO
{
    public DeclareModelDTO DeclareModel { get; set; }
    public List<Event> Trace { get; set; }
}