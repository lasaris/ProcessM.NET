using System.Collections.Generic;
using System.Linq;

namespace ProcessM.NET.Model.DataAnalysis
{
    /// <summary>
    /// Static class for preprocessing a workflow log
    /// </summary>
    public static class WorkflowLogUtils
    {
        /// <summary>
        /// Creates same start activity and end activity for each trace in the Workflow log
        /// </summary>
        /// <param name="workflowLog">Workflow log</param>
        /// <param name="filterActivities">Activities to be filtered out of workflowLog</param>
        /// <param name="filteredTraces">Traces to be filtered out of workflowLog</param>
        public static void WorkflowLogPreprocessor(WorkflowLog workflowLog, HashSet<string> filterActivities = null, HashSet<List<string>> filteredTraces = null)
        {
            PreprocessStartActivity(workflowLog);
            PreprocessEndActivity(workflowLog);
            if (filterActivities != null)
            {
                FilterActivities(workflowLog, filterActivities);
            }
            if (filteredTraces != null)
            {
                FilterTraces(workflowLog, filteredTraces);
            }
        }

        /// <summary>
        /// Preprocess start activity
        /// </summary>
        /// <param name="workflowLog">Workflow log</param>
        private static void PreprocessStartActivity(WorkflowLog workflowLog)
        {
            // var startActivities = new HashSet<string>();
            // foreach (var trace in workflowLog.WorkflowTraces)
            // {
            //     startActivities.Add(trace.Activities[0]);
            // }
            //
            // if (startActivities.Count == 1) return;
            // {
                foreach (var trace in workflowLog.WorkflowTraces)
                {
                    if (!trace.Activities.Contains("<<start>>"))
                    {
                        trace.Activities.Insert(0, "<<start>>");
                    }
                }
            //}
        }

        /// <summary>
        /// Preprocess end activity
        /// </summary>
        /// <param name="workflowLog">Workflow log</param>
        private static void  PreprocessEndActivity(WorkflowLog workflowLog)
        {
            // var endActivities = new HashSet<string>();
            // foreach (var trace in workflowLog.WorkflowTraces)
            // {
            //     endActivities.Add(trace.Activities[^1]);
            // }
            //
            // if (endActivities.Count == 1) return;
            // {
                foreach (var trace in workflowLog.WorkflowTraces) 
                {
                    if (!trace.Activities.Contains("<<end>>"))
                    {
                        trace.Activities.Add("<<end>>");
                    }
                }
            // }
        }

        /// <summary>
        /// Remove selected activities from workflowLog
        /// </summary>
        /// <param name="workflowLog">Workflow log</param>
        /// <param name="removedActivities">Activities to be removed</param>
        private static void FilterActivities(WorkflowLog workflowLog, HashSet<string> removedActivities)
        {
            foreach (var trace in workflowLog.WorkflowTraces)
            {
                trace.Activities.RemoveAll(removedActivities.Contains);
            }
        }

        /// <summary>
        /// Remove selected traces from workflowLog
        /// </summary>
        /// <param name="workflowLog">Workflow log</param>
        /// <param name="removedTraces">Traces to be removed</param>
        private static void FilterTraces(WorkflowLog workflowLog, HashSet<List<string>> removedTraces)
        {
            workflowLog.WorkflowTraces.RemoveAll(trace => removedTraces.Any(rt => rt.SequenceEqual(trace.Activities)));
        }
    }
}
