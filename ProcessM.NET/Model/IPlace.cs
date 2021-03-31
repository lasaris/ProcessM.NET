using System;

namespace ProcessM.NET.Model
{
    /// <summary>
    /// Interface for places in Petri Net.
    /// </summary>
    public interface IPlace : IEquatable<IPlace>
    {
        string Id { get; }
    }
}
