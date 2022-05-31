using System;
using System.Collections.Generic;

namespace ProcessM.NET.Model.DataAnalysis
{
    /// <summary>
    /// A class representing a single workflow trace in an event log.
    /// </summary>
    public class WorkflowTrace
    {
        public string CaseId { get; }
        public List<string> Activities { get; set;}

        public WorkflowTrace(string caseId)
        {
            CaseId = caseId;
            Activities = new List<string>();
        }

        /// <summary>
        /// Adds an activity to the workflow trace.
        /// </summary>
        /// <param name="activity">String representation of activity of be added.</param>
        public void AddActivity(string activity)
        {
            if (activity == null)
            {
                throw new ArgumentNullException("Activity in AddActivity cannot be null");
            }

            Activities.Add(activity);
        }

        /// <summary>
        /// Adds multiple activities represented by strings in a collection to the workflow trace.
        /// </summary>
        /// <param name="activities">A collection of strings representing activities to be added.</param>
        public void AddActivities(IEnumerable<string> activities)
        {
            Activities.AddRange(activities);
        }

        public override bool Equals(object obj)
        {
            if (!(obj is WorkflowTrace trace))
            {
                return false;
            }

            for (int i = 0; i < Activities.Count; i++)
            {
                if (Activities[i] != trace.Activities[i])
                {
                    return false;
                }
            }

            return CaseId == trace.CaseId;
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(CaseId, Activities);
        }
    }
}
