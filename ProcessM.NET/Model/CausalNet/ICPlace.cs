namespace ProcessM.NET.Model.CausalNet
{
    /// <summary>
    /// Interface for a place in the Causal net
    /// </summary>
    public interface ICPlace
    {
        int Id { get; }
        int Frequency { get; }
    }
}
