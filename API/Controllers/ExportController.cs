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
public class ExportController: ControllerBase
{
    [HttpPost]
    [Route("pnml/heuristic")]
    public ActionResult<string> HeuristicMineSerializePnml(ConfiguredHeuristicModelAPI configuredHeuristicModel)
    {
        // Prepare
        var configs = configuredHeuristicModel.Configuration;
        var eventLogFile = Imperative.CreateEventLogFileFromImportedModel(configuredHeuristicModel.ImportedLog,
            configuredHeuristicModel.Metadata);
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
    public ActionResult<string> AlphaMineSerializePnml(ConfiguredAlphaModelAPI configuredAlphaModel)
    {
        // Prepare
        var eventLogFile =
            Imperative.CreateEventLogFileFromImportedModel(configuredAlphaModel.importedLog,
                configuredAlphaModel.metadata);
        var resultTraces = eventLogFile.EventLog.GetTracesWithOccurrence();
        var workflowLog = Imperative.PrepareWorkflowLog(eventLogFile, configuredAlphaModel.configuration);

        // Mine
        var petriNet = Alpha.MakePetriNet(new RelationMatrix(workflowLog));
        
        // Serialize
        var result = PNMLExport.Serialize(petriNet);

        return Ok(result);
    }
}