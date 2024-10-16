using API.Models;
using BakaMining.Models;
using BakaMining.Utils;
using LogImport.Models;
using MatBlazor;
using ProcessM.NET.Discovery.HeuristicMiner;
using ProcessM.NET.Export;
using ProcessM.NET.Model;
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
            Activity = importedLog.Headers[importedLog.Activity],
            CaseId = importedLog.Headers[importedLog.CaseId],
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

        var hiddenActivities = basicConfigs.InvisibleActivities?.ToHashSet();
        var hiddenTraces = basicConfigs.InvisibleTraces?.ToHashSet();
        WorkflowLogUtils.WorkflowLogPreprocessor(workflowLog, hiddenActivities, hiddenTraces);

        return workflowLog;
    }

    public static MineResultAPI CreateResult(PetriNet? petriNet, WorkflowLog workflowLog,
        BasicMineConfigurationAPI? basicConfigs, List<Tuple<WorkflowTrace, int>> traces, List<string> activities)
    {
        var graphvizNet = new GraphvizNet(petriNet, workflowLog);
        var dotString = DOTExport.Serialize(graphvizNet, basicConfigs?.SourcePetriNet != true);

        var transitions = petriNet?.Transitions.Cast<Transition>().Select((transition) => new TransitionAPI()
        {
            Activity = transition.Activity,
            Frequency = transition.Frequency,
            Id = transition.Id,
            InputPlaces = transition.InputPlaces.Cast<Place>().ToList(),
            OutputPlaces = transition.OutputPlaces.Cast<Place>().ToList(),
            Invisible = transition.Invisible,
        }).ToList();

        var places = petriNet?.Places.Cast<Place>().ToList();

        var petriNetApi = new PetriNetAPI()
        {
            Places = places,
            Transitions = transitions,
            EndPlace = (Place?)petriNet?.EndPlace,
            StartPlace = (Place?)petriNet?.StartPlace
        };

        var result = new MineResultAPI()
        {
            MinedModel = dotString,
            WorkflowLog = workflowLog,
            Activities = activities,
            TracesWithOccurence = traces,
            PetriNet = petriNetApi
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
