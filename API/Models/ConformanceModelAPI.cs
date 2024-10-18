using DeclarativePM.Lib.Models.DeclareModels;
using DeclarativePM.Lib.Models.LogModels;

namespace API.Models;

public class ConformanceModelAPI
{
    public DeclareModelAPI DeclareModel { get; set; }
    public List<Event> Trace { get; set; }
}