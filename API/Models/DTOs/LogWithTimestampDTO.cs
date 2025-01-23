using LogImport.Models;

namespace API.Models;

public class LogWithTimestampFormatAPI
{
    public ImportedEventLogDTO? ImportedLog { get; set; }
    public string? TimestampFormat { get; set; }
}