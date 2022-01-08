namespace ProcessM.NET.Model.CausalNet
{
    /// <summary>
    /// Interface for a place in the Causal net
    /// </summary>
    public interface ICPlace
    {
        /// <summary>
        /// Id
        /// </summary>
        int Id { get; }
        /// <summary>
        /// Frequency (how many times place was visited)
        /// </summary>
        int Frequency { get; }
    }
}
