using System;
using System.Collections.Generic;
using System.Linq;

namespace DeclarativePM.Lib.Models.LogModels
{
    /// <summary>
    ///     Represents single row in an event log
    /// </summary>
    public record Event
    {
        public Event(string activity, string caseId, params string[] res)
        {
            Activity = activity;
            CaseId = caseId;
            Resources = res.ToList();
        }

        public string Activity { get; set; }

        public int ActivityInTraceId { get; set; } = 0;
        public string CaseId { get; set; }
        public DateTime? TimeStamp { get; set; }
        public List<string> Resources { get; set; }

        public string this[int index]
        {
            get
            {
                if (index < 0 || index >= Resources.Count + 2)
                    throw new IndexOutOfRangeException("Index out of range");

                return index switch
                {
                    0 => Activity,
                    1 => CaseId,
                    _ => Resources[index - 2]
                };
            }
        }

        public int Count()
        {
            return 2 + Resources.Count;
        }
    }
}