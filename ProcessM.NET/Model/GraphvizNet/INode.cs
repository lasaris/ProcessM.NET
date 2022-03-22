using System.Collections.Generic;

namespace ProcessM.NET.Model.GraphvizNet;

public class INode
{
    public string Id { get; set; }
    public string Label { get; set; }
    public int? Frequency { get; set; }
}