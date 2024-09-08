using LogImport.Models;

namespace API.Models;

public class ConfiguredAlphaModelAPI
{
    public ImportedEventLogAPI importedLog { get; set; }
    public MetadataAPI metadata { get; set; }
    public BasicMineConfigurationAPI? configuration { get; set; }
}