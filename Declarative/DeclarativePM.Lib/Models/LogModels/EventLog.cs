using System.Collections.Generic;
using System.Linq;

namespace DeclarativePM.Lib.Models.LogModels
{
    /// <summary>
    ///     Represents an event log
    /// </summary>
    public class EventLog
    {
        public EventLog() { }

        public EventLog(List<Event> logs, string name = null)
        {
            Name = name ?? DefaultName;
            if (!logs.Any())
            {
                Headers = new List<string>();
                Logs = new List<Event>();
                return;
            }

            Headers = Enumerable.Range(0, logs.FirstOrDefault().Count()).Select(i => i.ToString()).ToList();
            Logs = logs;
        }

        public EventLog(List<Event> logs, List<string> headers, string name = null)
        {
            Logs = logs;
            Headers = headers;
            Name = name ?? DefaultName;
        }

        public List<string> Headers { get; }
        public List<Event> Logs { get; }

        public string Name { get; set; }

        private string DefaultName
            => "DEFAULT LOG NAME";

        /// <summary>
        /// </summary>
        /// <returns>All unique cases in the log</returns>
        public List<string> Cases()
        {
            return Logs.Select(e => e.CaseId).Distinct().ToList();
        }

        /// <summary>
        /// </summary>
        /// <param name="case">search case</param>
        /// <returns>the trace under specific case</returns>
        public List<Event> SpecificCase(string @case)
        {
            return Logs.Where(e => e.CaseId.Equals(@case)).ToList();
        }

        /// <summary>
        /// </summary>
        /// <returns>All unique activities in the log</returns>
        public List<string> GetAllActivities()
        {
            return Logs.Select(x => x.Activity).Distinct().ToList();
        }

        /// <summary>
        /// </summary>
        /// <returns>List of all traces in the log</returns>
        public List<List<Event>> GetAllTraces()
        {
            return Logs.GroupBy(x => x.CaseId, x => x, (_, events) => events.ToList()).ToList();
        }
    }
}