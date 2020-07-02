namespace ProcessM.NET.Model.BasicPetriNet
{
    /// <summary>
    /// Basic place implementation.
    /// </summary>
    public class Place : IPlace
    {
        public string Id { get; } = "";

        public Place(string id)
        {
            Id = id;
        }
    }
}
