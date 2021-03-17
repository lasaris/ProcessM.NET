using System;
using System.Collections.Generic;
using Deedle;

namespace ProcessM.NET.Model.DataAnalysis
{
    /// <summary>
    /// A class which converts loaded data frames into Workflow Log, a collection of ordered collections of activities (Workflow Traces).
    /// </summary>
    public class WorkflowLog
    {
        public List<WorkflowTrace> WorkflowTraces { get; }

        /// <summary>
        /// Makes a collection of empty workflow trace shells, one for each unique "Case ID" in loaded data from an event log.
        /// </summary>
        /// <param name="ids">A "Case ID" column from the data frame, representation of a loaded event log.</param>
        /// <returns>A list of empty workflow traces, one for each unique "Case ID" in given data.</returns>
        private List<WorkflowTrace> MakeEmptyWfts(Deedle.Series<int, string> ids)
        {
            List<WorkflowTrace> traces = new List<WorkflowTrace>();
            HashSet<string> uniqueIds = new HashSet<string>(ids.Values);
            foreach (var id in uniqueIds)
            {
                traces.Add(new WorkflowTrace("" + id));
            }
            return traces;
        }

        /// <summary>
        /// Makes a collection of empty timestamped workflow trace shells, one for each unique "Case ID" in loaded data from an event log.
        /// </summary>
        /// <param name="ids">A "Case ID" column from the data frame, representation of a loaded event log.</param>
        /// <returns>A list of empty timestamped workflow traces, one for each unique "Case ID" in given data.</returns>
        private List<TimestampedWorkflowTrace> MakeEmptyTimestampedWfts(Deedle.Series<int, string> ids)
        {
            List<TimestampedWorkflowTrace> traces = new List<TimestampedWorkflowTrace>();
            HashSet<string> uniqueIds = new HashSet<string>(ids.Values);
            foreach (var id in uniqueIds)
            {
                traces.Add(new TimestampedWorkflowTrace("" + id));
            }
            return traces;
        }

        /// <summary>
        /// Fills workflow trace shells stored in WorkflowTraces field with activities based on how they are ordered in loaded data from an event log.
        /// </summary>
        /// <param name="importedData">Loaded data from an event log.</param>
        /// <returns>List of filled workflow traces.</returns>
        private List<WorkflowTrace> MakeWftsBasedOnOrder(Model.ImportedEventLog importedData)
        {
            List<WorkflowTrace> traces = MakeEmptyWfts(importedData.Contents.GetColumn<string>(importedData.CaseId));

            for (int i = 0; i < importedData.Contents.RowCount; i++)
            {
                OptionalValue<Series<string, string>> row = importedData.Contents.TryGetRow<string>(i);
                foreach (WorkflowTrace wft in traces)
                {
                    if (wft.CaseId == row.Value.Get(importedData.CaseId))
                    {
                        wft.AddActivity(row.Value.Get(importedData.Activity));
                    }
                }
            }
            return traces;
        }

        /// <summary>
        /// Fills workflow trace shells stored in WorkflowTraces field with with activities from loaded data, then sorts them based on given timestamp
        /// and converts them into ordinary workflow traces.
        /// </summary>
        /// <param name="importedData">Loaded data from an event log.</param>
        /// <returns>List of filled workflow traces.</returns>
        private List<WorkflowTrace> MakeWftsBasedOnTimestamp(Model.ImportedEventLog importedData)
        {
            List<TimestampedWorkflowTrace> traces = MakeEmptyTimestampedWfts(importedData.Contents.GetColumn<string>(importedData.CaseId));

            for (int i = 0; i < importedData.Contents.RowCount; i++)
            {
                OptionalValue<Series<string, string>> row = importedData.Contents.TryGetRow<string>(i);
                foreach (TimestampedWorkflowTrace wft in traces)
                {
                    if (wft.CaseId == row.Value.Get(importedData.CaseId))
                    {
                        bool parseSuccess = DateTime.TryParse(row.Value.Get(importedData.Timestamp), out DateTime timestamp);
                        if (!parseSuccess && wft.Activities.Count > 0)
                        {
                            timestamp = new DateTime();
                        }
                        wft.AddActivity(row.Value.Get(importedData.Activity), timestamp);
                    }
                }
            }

            List<WorkflowTrace> outTraces = new List<WorkflowTrace>();

            foreach (TimestampedWorkflowTrace twft in traces)
            {
                outTraces.Add(twft.ConvertToWorkflowTrace());
            }
            return outTraces;
        }

        public WorkflowLog(Model.ImportedEventLog importedData)
        {
            if (importedData.Timestamp == null)
            {
                WorkflowTraces = MakeWftsBasedOnOrder(importedData);
            }
            else
            {
                WorkflowTraces = MakeWftsBasedOnTimestamp(importedData);
            }
        }

        public WorkflowLog(List<WorkflowTrace> workflowTraces)
        {
            WorkflowTraces = workflowTraces;
        }
    }
}
