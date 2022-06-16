using ProcessM.NET.Model;
using ProcessM.NET.Model.DataAnalysis;

namespace BakaMining.Models
{
    public class EventLogFile
    {
        public FileMetadata Metadata { get; set; }
        public WorkflowLog EventLog { get; set; }
        
        public string Activity { get;set; }
        public string CaseId { get; set;}
        public string Timestamp { get; set;}
        public string Key { get; set;}
    }
}