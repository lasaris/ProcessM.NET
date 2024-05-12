using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Text.Json;
using LogImport.Models;

namespace ProcessM.NET.Model.DataAnalysis
{
    /// <summary>
    /// A class which converts loaded data frames into Workflow Log, a collection of ordered collections of activities (Workflow Traces).
    /// </summary>
    public class WorkflowLog
    {
        public List<WorkflowTrace> WorkflowTraces { get; set; }

        /// <summary>
        /// Makes a collection of empty workflow trace shells, one for each unique "Case ID" in loaded data from an event log.
        /// </summary>
        /// <param name="ids">A "Case ID" column from the data frame, representation of a loaded event log.</param>
        /// <returns>A list of empty workflow traces, one for each unique "Case ID" in given data.</returns>
        private List<WorkflowTrace> MakeEmptyWfts(List<string> ids)
        {
            List<WorkflowTrace> traces = new List<WorkflowTrace>();
            HashSet<string> uniqueIds = new HashSet<string>(ids);
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
        private List<TimestampedWorkflowTrace> MakeEmptyTimestampedWfts(List<string> ids)
        {
            List<TimestampedWorkflowTrace> traces = new List<TimestampedWorkflowTrace>();
            HashSet<string> uniqueIds = new HashSet<string>(ids);
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
        private List<WorkflowTrace> MakeWftsBasedOnOrder(ImportedEventLog importedData)
        {
            List<WorkflowTrace> traces = MakeEmptyWfts(importedData.GetNthColumn(importedData.CaseId));

            foreach (var row in importedData.Rows)
            {
                foreach (WorkflowTrace wft in traces)
                {
                    var rowCaseId = row[importedData.CaseId];
                    if (wft.CaseId == rowCaseId)
                    {
                        var rowActivity = row[importedData.Activity];
                        wft.AddActivity(rowActivity);
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
        private List<WorkflowTrace> MakeWftsBasedOnTimestamp(ImportedEventLog importedData)
        {
            List<TimestampedWorkflowTrace> traces = MakeEmptyTimestampedWfts(importedData.GetNthRow(importedData.CaseId));

            foreach (var row in importedData.Rows)
            {
                foreach (TimestampedWorkflowTrace wft in traces)
                {
                    var rowCaseId = row[importedData.CaseId];
                    if (wft.CaseId == rowCaseId)
                    {
                        var timeStampValue = row[importedData.Timestamp.Value];
                        var timestamp = DateTime.ParseExact(timeStampValue, importedData.TimestampFormat, CultureInfo.CurrentCulture);

                        var activity = row[importedData.Activity];
                        wft.AddActivity(activity, timestamp);
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

        public WorkflowLog(ImportedEventLog importedData)
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

        public WorkflowLog() { }

        public WorkflowLog Clone()
        {
            return JsonSerializer.Deserialize<WorkflowLog>(JsonSerializer.Serialize(this));
        }

        public List<Tuple<WorkflowTrace, int>> GetTracesWithOccurrence()
        {
            var dictionary = new Dictionary<WorkflowTrace, int>();
            foreach (var trace in WorkflowTraces)
            {
                var dictElement = dictionary.FirstOrDefault(e => e.Key.Activities.SequenceEqual(trace.Activities));
                if (dictElement.Key == null)
                {
                    dictionary.Add(trace, 1);
                }
                else dictionary[dictElement.Key] = dictElement.Value + 1;
            }

            return dictionary.Select(x => new Tuple<WorkflowTrace, int>(x.Key, x.Value)).ToList();
        }

        public override string ToString()
        {
            StringBuilder sb = new StringBuilder();
            sb.AppendLine("These are the workflow traces:");
            foreach (var wft in this.WorkflowTraces)
            {
                sb.Append($"Case id: {wft.CaseId} - ");
                foreach (var activity in wft.Activities)
                {
                    sb.Append($"{activity}, ");
                }
                sb.Append("\n");
            }

            return sb.ToString();
        }


    }
}
