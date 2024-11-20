namespace API.Models;

public class BasicMineConfigurationDTO
{
    public bool SourcePetriNet { get; set; }
    public List<List<string>>? InvisibleTraces { get; set; }
    public string[]? InvisibleActivities { get; set; }
}