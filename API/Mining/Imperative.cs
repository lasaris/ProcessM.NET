using API.Models;
using BakaMining.Models;
using BakaMining.Utils;
using LogImport.Models;
using ProcessM.NET.Discovery.HeuristicMiner;
using ProcessM.NET.Export;
using ProcessM.NET.Model.BasicPetriNet;
using ProcessM.NET.Model.DataAnalysis;
using ProcessM.NET.Model.GraphvizNet;

namespace API.Mining;

public static class Imperative
{
    public static EventLogFile CreateEventLogFileFromImportedModel(ImportedEventLogAPI importedLog, MetadataAPI metadata)
    {
        
        // First I need to create the ImportedEventLog from the ConfiguredModelAPI.ImportedEventLogAPI
        var importedEventLog = importedLog.SerializeImportedEventLogAPI();
    
        // Then create a workflowLog from this
        var workflowLog = new WorkflowLog(importedEventLog);
    
        // And from this an EventLogFile is created
        return new EventLogFile()
        {
            Metadata = new FileMetadata()
            {
                Name = metadata.Name,
                Modified = DateTimeOffset.FromUnixTimeSeconds(metadata.Modified / 1000),
                Size = metadata.Size
            },
            EventLog = OrderByActivityFrequency(workflowLog),
            Activity = importedEventLog.Headers[importedEventLog.Activity],
            CaseId = importedEventLog.Headers[importedEventLog.CaseId],
            Timestamp = importedEventLog.Timestamp.HasValue
                ? importedEventLog.Headers[importedEventLog.Timestamp.Value]
                : default,
            Key = metadata.Name
        };
    }

    public static WorkflowLog PrepareWorkflowLog(EventLogFile eventLogFile, BasicMineConfigurationAPI? basicConfigs)
    {
        var workflowLog = eventLogFile.EventLog;

        if (basicConfigs == null)
        {
            WorkflowLogUtils.WorkflowLogPreprocessor(workflowLog);
            return workflowLog;
        }
        
        var hiddenActivities = basicConfigs.invisibleActivities.ToHashSet();
        var hiddenTraces = basicConfigs.invisibleTraces.ToHashSet();
        WorkflowLogUtils.WorkflowLogPreprocessor(workflowLog, hiddenActivities, hiddenTraces);

        return workflowLog;
    }

    public static MineResultAPI CreateResult(PetriNet? petriNet, WorkflowLog workflowLog,
        BasicMineConfigurationAPI? basicConfigs, List<Tuple<WorkflowTrace, int>> traces, List<string> activities)
    {
        var graphvizNet = new GraphvizNet(petriNet, workflowLog);
        var dotString = DOTExport.Serialize(graphvizNet, basicConfigs?.SourcePetriNet != true);

        var result = new MineResultAPI()
        {
            MinedModel = dotString,
            WorkflowLog = workflowLog,
            Activities = activities,
            TracesWithOccurence = traces,
        };

        return result;
    }

    public static HeuristicMinerSettings PrepareHeuristicMinerSettings(HeuristicMineConfigurationAPI? configs)
    {
        if (configs == null)
        {
            return new HeuristicMinerSettings();
        }
        
        return new HeuristicMinerSettings()
        {
            DependencyThreshold = configs.Direct,
            L1LThreshold = configs.LoopLengthAA,
            L2LThreshold = configs.LoopLengthABA,
            AllTasksConnected = configs.AllTasksConnected,
            RelativeToBestThreshold = configs.RelativeToBest,
            UseLongDistance = configs.UseLongDistance,
            LongDistanceThreshold = configs.LongDistance,
        };
    }
    
    private static WorkflowLog OrderByActivityFrequency(WorkflowLog wfLog)
    {
        var comparer = new ActivitiesComparer();
        return new WorkflowLog(wfLog.WorkflowTraces
        .GroupBy(tr => tr.Activities, comparer)
        .OrderByDescending(gr => gr.Count())
        .SelectMany(gr => gr)
        .ToList());
    }
}
