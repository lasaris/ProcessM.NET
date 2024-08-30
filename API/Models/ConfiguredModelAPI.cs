using LogImport.Models;

namespace API.Models;

public class ConfiguredModelAPI
{
    public ImportedEventLogAPI importedLog { get; set; }
    public MetadataAPI metadata { get; set; }
}