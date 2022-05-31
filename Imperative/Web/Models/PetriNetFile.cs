using ProcessM.NET.Model.BasicPetriNet;

namespace BakaMining.Models
{
    public class PetriNetFile
    {
        public FileMetadata Metadata { get; set; }
        public PetriNet PetriNet { get; set; }
    }
}
