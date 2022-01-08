namespace ProcessM.NET.Model.BasicPetriNet
{
    /// <summary>
    /// Basic place implementation.
    /// </summary>
    public class Place : IPlace
    {
        public string Id { get; set; } = "";

        public Place(string id)
        {
            Id = id;
        }

        public bool Equals(IPlace other)
        {
            return other != null && Id == other.Id;
        }

        public override bool Equals(object obj)
        {
            if (ReferenceEquals(null, obj)) return false;
            if (ReferenceEquals(this, obj)) return true;
            if (obj.GetType() != this.GetType()) return false;
            return Equals((IPlace)obj);
        }
    }
}
