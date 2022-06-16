namespace ProcessM.NET.Model.GraphvizNet;

public class GTransition : Node
{
    public string Color { get; set; } = "white";

    public int AbsoluteFrequency { get; set; } = 0;
    public int CaseFrequency { get; set; } = 0;
    public int MaxRepetitions { get; set; } = 0;
    public double CaseCoverage { get; set; } = 0;
    
    public bool Invisible { get; set; } = false;
}