namespace API.Models;

public class HeuristicMineConfigurationAPI: BasicMineConfigurationAPI
{
    public float Direct { get; set; }
    public float LoopLengthAA { get; set; }
    public float LoopLengthABA { get; set; }
    public bool UseLongDistance { get; set; }
    public bool AllTasksConnected { get; set; }
    public float RelativeToBest { get; set; }
    public float LongDistance { get; set; }
}