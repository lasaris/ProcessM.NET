namespace API.Models;

public class BasicMineConfigurationAPI
{
    public bool SourcePetriNet { get; set; }
    public bool IgnoreFrequency { get; set; }
    public List<List<string>>? InvisibleTraces { get; set; }
    public string[]? InvisibleActivities { get; set; }
}