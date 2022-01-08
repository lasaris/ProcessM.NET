using System.Collections.Generic;

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
        public static void WorkflowLogPreprocessor(WorkflowLog workflowLog)
        {
            PreprocessStartActivity(workflowLog);
            PreprocessEndActivity(workflowLog);
        }

        /// <summary>
        /// Preprocess start activity
        /// </summary>
        /// <param name="workflowLog">Workflow log</param>
        private static void PreprocessStartActivity(WorkflowLog workflowLog)
        {
            var startActivities = new HashSet<string>();
            foreach (var trace in workflowLog.WorkflowTraces)
            {
                startActivities.Add(trace.Activities[0]);
            }

            if (startActivities.Count == 1) return;
            {
                foreach (var trace in workflowLog.WorkflowTraces)
                {
                    trace.Activities.Insert(0, "a_i");
                }
            }
        }

        /// <summary>
        /// Preprocess end activity
        /// </summary>
        /// <param name="workflowLog">Workflow log</param>
        private static void  PreprocessEndActivity(WorkflowLog workflowLog)
        {
            var endActivities = new HashSet<string>();
            foreach (var trace in workflowLog.WorkflowTraces)
            {
                endActivities.Add(trace.Activities[^1]);
            }

            if (endActivities.Count == 1) return;
            {
                foreach (var trace in workflowLog.WorkflowTraces)
                {
                    trace.Activities.Add( "a_0");
                }
            }
        }
    }
}
