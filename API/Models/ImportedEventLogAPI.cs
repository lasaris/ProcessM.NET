using BakaMining.Models;
using LogImport.Models;

namespace API.Models;

public class ImportedEventLogAPI
{
    public int Activity { get; set; }
    public int CaseId { get; set; }
    public string[] Headers { get; set; }
    public List<string[]> Rows { get; set; }
    public int? Timestamp { get; set; }
    public string? TimestampFormat { get; set; }

    public ImportedEventLog SerializeImportedEventLogAPI()
    {
        return new ImportedEventLog(this.Rows, this.Headers, this.Activity, this.CaseId, this.Timestamp,
            this.TimestampFormat);
    }
}