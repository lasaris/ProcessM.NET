using ProcessM.NET.Model.DataAnalysis;
using System;
using System.Collections.Generic;
using System.Text;

namespace ProcessM.NET.Discovery.Heuristic_Miner
{
    /// <summary>
    /// A class which represents a directly follows matrix of all activities in data loaded from event log
    /// as well as supplementary data which are used to better envision and use the matrix.
    /// </summary>
    public class DirectlyFollowsMatrix : MatrixBase
    {
        /// <summary>
        /// A directly follows matrix of relations within two activities.
        /// </summary>
        public int[,] Matrix { get; }

        /// <summary>
        /// Goes through given workflow traces and compute sum of direct succession (B comes directly after A) of all loaded activities.
        /// </summary>
        /// <param name="workflowTraces">A list of (non-timestamped) workflow traces.</param>
        private void ComputeDirectMatrix(List<WorkflowTrace> workflowTraces)
        {
            foreach (WorkflowTrace wft in workflowTraces)
            {
                for (int i = 0; i < wft.Activities.Count - 1; i++)
                {
                    int fromIndex = ActivityIndices[wft.Activities[i]];
                    int toIndex = ActivityIndices[wft.Activities[i + 1]];
                    Matrix[fromIndex, toIndex] += 1;
                }
            }
        }

        /// <summary>
        /// Is used to create an empty DirectlyFollowsMatrix based only on given activities.
        /// </summary>
        /// <param name="activities">A list of activities in all traces.</param>
        /// <param name="startActivities">A set of activities which can appear at the beginning of traces.</param>
        /// <param name="endActivities">A set of activities which can appear at the end of traces.</param>
        public DirectlyFollowsMatrix(List<string> activities, HashSet<string> startActivities, HashSet<string> endActivities) 
            : base(activities, startActivities, endActivities)
        {
            Matrix = new int[activities.Count, activities.Count];
        }

        /// <summary>
        /// Is used to create a full DirectlyFollowsMatrix matrix based on WorkflowLog.
        /// </summary>
        /// <param name="log">A workflow log made from loaded data.</param>
        public DirectlyFollowsMatrix(WorkflowLog log) : base(log)
        {
            Matrix = new int[Activities.Count, Activities.Count];
            ComputeDirectMatrix(log.WorkflowTraces);
        }
    }
}

