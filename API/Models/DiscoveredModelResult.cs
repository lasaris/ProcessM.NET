using DeclarativePM.Lib.Models.DeclareModels;
using DeclarativePM.UI.Data;

namespace API.Models;

public class DiscoveredModelResult
{
    public string? Model { get; set; }
    public TreeNodeModel? TreeModel { get; set; }
    public string? DotGraph { get; set; }
}