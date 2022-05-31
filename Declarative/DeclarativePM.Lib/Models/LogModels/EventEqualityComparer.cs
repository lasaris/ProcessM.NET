using System;
using System.Collections.Generic;

namespace DeclarativePM.Lib.Models.LogModels
{
    /// <summary>
    ///     Compares events on activity, case and its position in the case (ActivityInTraceId)
    /// </summary>
    public class EventEqualityComparer : IEqualityComparer<Event>
    {
        public bool Equals(Event x, Event y)
        {
            if (ReferenceEquals(x, y)) return true;
            if (ReferenceEquals(x, null)) return false;
            if (ReferenceEquals(y, null)) return false;
            if (x.GetType() != y.GetType()) return false;
            return x.Activity == y.Activity
                   && x.ActivityInTraceId == y.ActivityInTraceId
                   && x.CaseId == y.CaseId
                   && Nullable.Equals(x.TimeStamp, y.TimeStamp);
        }

        public int GetHashCode(Event obj)
        {
            return HashCode.Combine(obj.Activity, obj.ActivityInTraceId, obj.CaseId, obj.TimeStamp);
        }
    }
}