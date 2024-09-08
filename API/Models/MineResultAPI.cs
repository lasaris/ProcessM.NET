using ProcessM.NET.Model.DataAnalysis;

namespace API.Models;

public class MineResultAPI
{
    public string MinedModel { get; set; }
    public WorkflowLog WorkflowLog { get; set; }
    public List<string> Activities { get; set; }
    public List<Tuple<WorkflowTrace, int>> TracesWithOccurence { get; set; }
}