namespace API.Models;

public class BasicMineConfigurationAPI
{
    public bool SourcePetriNet  { get; set; }
    public bool IgnoreFrequency { get; set; }
    public List<List<string>> invisibleTraces { get; set; }
    public string[] invisibleActivities { get; set; }
}