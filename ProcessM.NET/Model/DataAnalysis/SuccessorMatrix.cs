using System.Collections.Generic;
using System.Linq;

namespace ProcessM.NET.Model.DataAnalysis
{
    /// <summary>
    /// A class which represents a directly follows matrix and L2L matrix of all activities  in data loaded from event log
    /// as well as supplementary data which are used to better envision and use the matrix.
    /// </summary>
    public class SuccessorMatrix : MatrixBase
    {
        /// <summary>
        /// A directly follows matrix of relations within two activities.
        /// </summary>
        public int[,] DirectMatrix { get; }
        /// <summary>
        /// A L2L follows matrix of relation within two activities.
        /// </summary>
        public int[,] L2LMatrix { get; }
        /// <summary>
        /// A Long distance follows matrix of relation within two activities
        /// </summary>
        public int[,] LongDistanceMatrix { get; }
        /// <summary>
        /// Sum of activity occurrences
        /// </summary>
        public int[] ActivityOccurrences { get; }

        /// <summary>
        /// Is used to create a full DirectlyFollowsMatrix matrix based on WorkflowLog.
        /// </summary>
        /// <param name="log">A workflow log made from loaded data.</param>
        public SuccessorMatrix(WorkflowLog log) : base(log)
        {
            DirectMatrix = new int[Activities.Count, Activities.Count];
            L2LMatrix = new int[Activities.Count, Activities.Count];
            LongDistanceMatrix = new int[Activities.Count, Activities.Count];
            ActivityOccurrences = new int[Activities.Count];
            ComputeDirectLongMatrix(log.WorkflowTraces);
            ComputeL2L(log.WorkflowTraces);
        }

        /// <summary>
        /// Goes through given workflow traces and compute sum of long successions, direct dependencies and L1L loops
        /// </summary>
        /// <param name="workflowTraces">A list of (non-timestamped) workflow traces.</param>
        private void ComputeDirectLongMatrix(List<WorkflowTrace> workflowTraces)
        {
            foreach (var trace in workflowTraces)
            {
                var discoveredIndexes = new List<int>();
                for (int i = 0; i < trace.Activities.Count; i++)
                {
                    int aIdx = ActivityIndices[trace.Activities[i]];
                    ActivityOccurrences[aIdx] += 1;
                    foreach (var id in discoveredIndexes)
                    {
                        if (!discoveredIndexes.Contains(aIdx))
                            LongDistanceMatrix[id, aIdx] += 1;
                        else break;
                    }
                    discoveredIndexes.Add(aIdx);

                    if (i >= trace.Activities.Count - 1) continue;
                    int bIdx = ActivityIndices[trace.Activities[i + 1]];
                    DirectMatrix[aIdx, bIdx] += 1;
                }
            }
        }

        /// <summary>
        /// Computes the L2L matrix
        /// </summary>
        /// <param name="workflowTraces">List of Workflow traces</param>
        private void ComputeL2L(List<WorkflowTrace> workflowTraces)
        {
            foreach (var trace in workflowTraces)
            {
                for (int i = 0; i < trace.Activities.Count - 2; i++)
                {
                    var aIdx = ActivityIndices[trace.Activities[i]];
                    var bIdx = ActivityIndices[trace.Activities[i + 1]];
                    var cIdx = ActivityIndices[trace.Activities[i + 2]];
                    if (DirectMatrix[aIdx, aIdx] == 0 && DirectMatrix[bIdx, bIdx] == 0 && aIdx == cIdx)
                    {
                        L2LMatrix[aIdx, bIdx] += 1;
                    }
                }
            }
        }
    }
}

