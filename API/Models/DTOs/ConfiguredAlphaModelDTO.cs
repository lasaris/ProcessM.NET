using LogImport.Models;

namespace API.Models;

public class ConfiguredAlphaModelDTO
{
    public ImportedEventLogDTO? ImportedLog { get; set; }
    public MetadataDTO? Metadata { get; set; }
    public BasicMineConfigurationDTO? Configuration { get; set; }
}