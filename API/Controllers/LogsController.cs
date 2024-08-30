using API.Models;
using BakaMining.Models;
using BakaMining.Utils;
using LogImport.CsvImport;
using LogImport.Models;
using Microsoft.AspNetCore.Mvc;
using ProcessM.NET.Discovery.Alpha;
using ProcessM.NET.Export;
using ProcessM.NET.Model.DataAnalysis;
using ProcessM.NET.Model.GraphvizNet;

namespace API.Controllers;

[ApiController]
[Route("/log")]
public class LogsController : ControllerBase
{
    [HttpPost]
    public ActionResult<ImportedEventLog> UploadLog(IFormFile file)
    {
        var stream = file.OpenReadStream();

        var importer = new CsvImporter();
        var importedEventLog = importer.LoadLog(stream);

        return CreatedAtAction(nameof(UploadLog), importedEventLog);
    }
    
    [HttpPost]
    [Route("alpha")]
    public ActionResult<string> alphaMineController(ConfiguredModelAPI configuredModel)
    {
        var eventLogFile = createEventLogFileFromConfiguredModel(configuredModel);
        var workflowLog = eventLogFile.EventLog;
        
        // TODO: these _hiddenActivities and _hiddenTraces should be passed from FE
        HashSet<string> _hiddenActivities = new();
        Dictionary<string, List<string>> _hiddenTraces = new();
        WorkflowLogUtils.WorkflowLogPreprocessor(workflowLog, _hiddenActivities, _hiddenTraces.Values.ToHashSet());

        var petriNet = Alpha.MakePetriNet(new RelationMatrix(workflowLog));
        
        // TODO: Here Activities should be updated and fitness should be computed
        var graphvizNet = new GraphvizNet(petriNet, workflowLog);
        var dotString = DOTExport.Serialize(graphvizNet);

        return Ok(dotString);
    }

    private EventLogFile createEventLogFileFromConfiguredModel(ConfiguredModelAPI configuredModel)
    {
        // First I need to create the ImportedEventLog from the ConfiguredModelAPI.ImportedEventLogAPI
        var importedEventLog = configuredModel.importedLog.SerializeImportedEventLogAPI();
        
        // Then create a workflowLog from this
        var workflowLog = new WorkflowLog(importedEventLog);
        
        // And from this an EventLogFile is created
        return new EventLogFile()
            {
                Metadata = new FileMetadata()
                {
                    Name = configuredModel.metadata.Name,
                    Modified = DateTimeOffset.FromUnixTimeSeconds(configuredModel.metadata.Modified / 1000),
                    Size = configuredModel.metadata.Size
                },
                EventLog = OrderByActivityFrequency(workflowLog),
                Activity = importedEventLog.Headers[importedEventLog.Activity],
                CaseId = importedEventLog.Headers[importedEventLog.CaseId],
                Timestamp = importedEventLog.Timestamp.HasValue ? importedEventLog.Headers[importedEventLog.Timestamp.Value] : default,
                Key = configuredModel.metadata.Name
            };
    }
    
    private WorkflowLog OrderByActivityFrequency(WorkflowLog wfLog)
    {
        var comparer = new ActivitiesComparer();
        return new WorkflowLog(wfLog.WorkflowTraces
        .GroupBy(tr => tr.Activities, comparer)
        .OrderByDescending(gr => gr.Count())
        .SelectMany(gr => gr)
        .ToList());
    }
}