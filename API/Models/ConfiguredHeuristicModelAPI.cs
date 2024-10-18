namespace API.Models;

public class ConfiguredHeuristicModelAPI
{
   public ImportedEventLogAPI ImportedLog { get; set; } 
   public MetadataAPI Metadata { get; set; }
   public HeuristicMineConfigurationAPI? Configuration { get; set; }
}