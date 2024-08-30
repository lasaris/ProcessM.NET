using System.Reflection.Metadata;
using BakaMining.Components;
using BakaMining.Models;
using BakaMining.Utils;
using LogImport.CsvImport;
using Microsoft.AspNetCore.Mvc;
using ProcessM.NET.Discovery.HeuristicMiner;
using ProcessM.NET.Export;
using ProcessM.NET.Model.DataAnalysis;
using ProcessM.NET.Model.GraphvizNet;

namespace API.Controllers;

[ApiController]
[Route("api/logUpload")]
public class DotStringController : ControllerBase
{
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    public ActionResult<string> UploadLog(IFormFile file)
    {
        var stream = file.OpenReadStream();
        
        var importer = new CsvImporter();
        var importedEventLog = importer.LoadLog(stream);
        importedEventLog.CaseId = 0;
        importedEventLog.Activity = 1;

        var workflowLog = new WorkflowLog((importedEventLog));

        var logFile = new EventLogFile()
        {
            Metadata = new FileMetadata()
            {
                Name = file.Name,
                Size = file.Length,
            },
            EventLog = OrderByActivityFrequency(workflowLog),
            Activity = importedEventLog.Headers[importedEventLog.Activity],
            CaseId = importedEventLog.Headers[importedEventLog.CaseId],
            Key = file.Name + importedEventLog.Activity + importedEventLog.CaseId
        };

        var petriNet = HeuristicMiner.MinePetriNet(workflowLog);

        var graph = new GraphvizNet(petriNet, workflowLog);
        var dotString = DOTExport.Serialize(graph);

        return CreatedAtAction(nameof(UploadLog), dotString);
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