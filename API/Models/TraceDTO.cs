using DeclarativePM.Lib.Models.LogModels;

namespace API.Models
{
    public class TraceDTO
    {
        public TraceDTO(List<Event> events)
        {
            Events = events;
            Case = events.Count > 0 ? events.First().CaseId : "NO EVENTS INCLUDED!";
        }

        public List<Event> Events { get; set; }

        public string Case { get; set; }
    }
}