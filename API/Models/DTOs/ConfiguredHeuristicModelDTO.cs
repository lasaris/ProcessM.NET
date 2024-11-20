namespace API.Models;

public class ConfiguredHeuristicModelDTO
{
   public ImportedEventLogDTO ImportedLog { get; set; } 
   public MetadataDTO Metadata { get; set; }
   public HeuristicMineConfigurationDTO? Configuration { get; set; }
}