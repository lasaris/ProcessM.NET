using System.Globalization;
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
                row[CaseId]
            );

            if (Timestamp.HasValue && Timestamp < Headers.Length && TimestampFormat != null)
            {
                e.TimeStamp = DateTime.ParseExact(row[Timestamp.Value], TimestampFormat, CultureInfo.CurrentCulture);
            }

            return e;
        }));

        // If the log has timestamps, then the events can be ordered by timestamp here
        if (Timestamp.HasValue)
        {
            events = events.OrderBy(e => e.TimeStamp).ToList();
        }

        return new EventLog(events, Headers.ToList());
    }
}