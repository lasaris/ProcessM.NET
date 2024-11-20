using API.Mining;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using ProcessM.NET.Discovery.Alpha;
using ProcessM.NET.Discovery.HeuristicMiner;
using ProcessM.NET.Export;
using ProcessM.NET.Model.DataAnalysis;

namespace API.Controllers;

[ApiController]
[Route("/export")]
public class ExportController : ControllerBase
{
    [HttpPost]
    [Route("pnml/heuristic")]
    public ActionResult<string> HeuristicMineSerializePnml(ConfiguredHeuristicModelDTO configuredHeuristicModel)
    {
        // Prepare
        var configs = configuredHeuristicModel.Configuration;
        var eventLogFile = Imperative.CreateEventLogFileFromImportedModel(configuredHeuristicModel.ImportedLog, configuredHeuristicModel.Metadata);
        var resultTraces = eventLogFile.EventLog.GetTracesWithOccurrence();
        var workflowLog = Imperative.PrepareWorkflowLog(eventLogFile, configuredHeuristicModel.Configuration);

        // Mine
        var minerSettings = Imperative.PrepareHeuristicMinerSettings(configs);
        var petriNet = HeuristicMiner.MinePetriNet(workflowLog, minerSettings);

        // Serialize
        var result = PNMLExport.Serialize(petriNet);

        return Ok(result);
    }


    [HttpPost]
    [Route("pnml/alpha")]
    public ActionResult<string> AlphaMineSerializePnml(ConfiguredAlphaModelDTO configuredAlphaModel)
    {
        var importedLog = configuredAlphaModel.ImportedLog;
        var configuration = configuredAlphaModel.Configuration;
        var metadata = configuredAlphaModel.Metadata;

        if (importedLog == null || configuration == null || metadata == null)
        {
            return BadRequest("Incorrect body. Missing some values");
        }
        // Prepare
        var eventLogFile =
            Imperative.CreateEventLogFileFromImportedModel(importedLog, metadata);
        var resultTraces = eventLogFile.EventLog.GetTracesWithOccurrence();
        var workflowLog = Imperative.PrepareWorkflowLog(eventLogFile, configuration);

        // Mine
        var petriNet = Alpha.MakePetriNet(new RelationMatrix(workflowLog));

        // Serialize
        var result = PNMLExport.Serialize(petriNet);

        return Ok(result);
    }
}