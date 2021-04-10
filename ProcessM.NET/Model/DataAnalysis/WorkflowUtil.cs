using System;
using System.Collections.Generic;
using System.Text;

namespace ProcessM.NET.Model.DataAnalysis
{
    public static class WorkflowLogUtil
    {
        public static void WorkflowLogPreprocessor(WorkflowLog workflowLog)
        {
            PreprocessStartActivity(workflowLog);
            PreprocessEndActivity(workflowLog);
        }

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
