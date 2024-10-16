using LogImport.Models;

namespace API.Models;

public class ConfiguredAlphaModelAPI
{
    public ImportedEventLogAPI? ImportedLog { get; set; }
    public MetadataAPI? Metadata { get; set; }
    public BasicMineConfigurationAPI? Configuration { get; set; }
}