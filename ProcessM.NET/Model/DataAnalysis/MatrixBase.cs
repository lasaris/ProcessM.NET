using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ProcessM.NET.Model.DataAnalysis
{
    /// <summary>
    /// A class which represents a supplementary data which are used to better envision and use the matrix.
    /// </summary>
    public class MatrixBase
    {
        /// <summary>
        /// A list of activities observed in event log.
        /// </summary>
        public List<string> Activities { get; protected set; }

        /// <summary>
        /// A dictionary of activity to index mapping in relation matrix (causal footprint).
        /// </summary>
        public Dictionary<string, int> ActivityIndices { get; protected set; }

        /// <summary>
        /// A set of activities which appear at the beginning of observed traces.
        /// </summary>
        public HashSet<string> StartActivities { get; protected set; }

        /// <summary>
        /// A set of activities which appear at the end of observed traces.
        /// </summary>
        public HashSet<string> EndActivities { get; protected set; }

        public MatrixBase(List<string> activities, HashSet<string> startActivities, HashSet<string> endActivities)
        {
            Activities = activities;
            StartActivities = startActivities;
            EndActivities = endActivities;
            ActivityIndices = new Dictionary<string, int>();

            var i = 0;
            foreach (var activity in activities)
            {
                ActivityIndices.Add(activity, i);
                i++;
            }
        }

        public MatrixBase(WorkflowLog log)
        {
            StartActivities = new HashSet<string>();
            EndActivities = new HashSet<string>();
            Activities = new List<string>();
            ActivityIndices = new Dictionary<string, int>();
            FillActivities(log.WorkflowTraces);
        }

        /// <summary>
        /// Goes through given list of workflow traces and fills the Activities, StartActivities, EndActivities and ActivityIndices fields.
        /// </summary>
        /// <param name="workflowTraces">A list of (non-timestamped) workflow traces.</param>
        protected void FillActivities(List<WorkflowTrace> workflowTraces)
        {
            foreach (WorkflowTrace wft in workflowTraces)
            {
                StartActivities.Add(wft.Activities[0]);
                EndActivities.Add(wft.Activities[^1]);

                foreach (string a in wft.Activities.Where(a => !Activities.Contains(a)))
                {
                    ActivityIndices.Add(a, Activities.Count);
                    Activities.Add(a);
                }
            }
        }
    }
}
