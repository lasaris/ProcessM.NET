using System;
using System.Collections.Generic;
using System.Linq;

namespace ProcessM.NET.Model.DataAnalysis
{
    /// <summary>
    /// A class representing a single workflow trace with timestamps in an event log. 
    /// Can be converted to workflow trace with activities ordered based on their timestamps instead of the order they've been loaded in.
    /// </summary>
    class TimestampedWorkflowTrace
    {
        public string CaseId { get; }
        public Dictionary<string, DateTime> Activities { get; }

        public TimestampedWorkflowTrace(string caseId)
        {
            CaseId = caseId;
            Activities = new Dictionary<string, DateTime>();
        }

        /// <summary>
        /// Adds an activity to the workflow trace.
        /// </summary>
        /// <param name="activity">String representation of an activity.</param>
        /// <param name="timestamp">DateTime representation of timestamp of an activity.</param>
        public void AddActivity(string activity, DateTime timestamp)
        {
            if (activity == null)
            {
                throw new ArgumentNullException("Activity in AddActivity cannot be null");
            }

            Activities.Add(activity, timestamp);
        }

        /// <summary>
        /// Converts timestamped workflow trace into ordinary workflow trace. The activities in the output
        /// workflow trace will be ordered by their timestamps.
        /// </summary>
        /// <returns>WorkflowTrace representation of this timestamped workflow trace.</returns>
        public WorkflowTrace ConvertToWorkflowTrace()
        {
            List<string> orderedActivities = new List<string>();
            var newActivities = Activities.OrderBy(a => a.Value);
            foreach (var timestampedActivity in newActivities)
            {
                orderedActivities.Add(timestampedActivity.Key);
            }
            
            WorkflowTrace outTrace = new WorkflowTrace(CaseId);
            outTrace.AddActivities(orderedActivities);
            return outTrace;
        }
    }
}
