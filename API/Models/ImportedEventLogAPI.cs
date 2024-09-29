using BakaMining.Models;
using DeclarativePM.Lib.Models.LogModels;
using ImportedEventLog = LogImport.Models.ImportedEventLog;

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
    
    public List<string> GetAllActivities()
    {
        var result = new List<string>();

        foreach (var strings in Rows)
        {
            var currentActivity = strings[Activity];

            if (!result.Contains(currentActivity))
            {
                result.Add(currentActivity);
            }
        }

        return result;
    }
    
    public EventLog BuildEventLog()
    {
        var events = new List<Event>(Rows.Capacity);
        
        events.AddRange(Rows.Select(row =>
        {
            var e = new Event(
                row[Activity],
                row[CaseId],
                // TODO: Add the resources
                new string[1]
            );

            // TODO: Add timestamping
            // if (_timestamp.HasValue && _timestamp < _headers.Length)
            // {
            //     e.TimeStamp = row[_timestamp.Value];
            // }

            return e;
        }));

        return new EventLog(events, Headers.ToList());
    }
}