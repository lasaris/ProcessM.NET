namespace ProcessM.NET.Model.CausalNet
{
    /// <summary>
    /// Class which represents a place in the Causal net
    /// </summary>
    public class CPlace : ICPlace
    {
        /// <summary>
        /// Index of place
        /// </summary>
        public int Id { get; }
        /// <summary>
        /// Frequency of place
        /// </summary>
        public int Frequency { get; }

        /// <param name="id">Index</param>
        /// <param name="frequency">Frequency</param>
        public CPlace(int id, int frequency)
        {
            Id = id;
            Frequency = frequency;
        }
    }
}