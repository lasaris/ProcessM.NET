using LogImport.Models;

namespace API.Models;

public class LogWithTimestampFormatAPI
{
    public ImportedEventLogAPI? ImportedLog { get; set; }
    public string? TimestampFormat { get; set; }
}