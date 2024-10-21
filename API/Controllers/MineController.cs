using API.Mining;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using ProcessM.NET.Discovery.Alpha;
using ProcessM.NET.Discovery.HeuristicMiner;
using ProcessM.NET.Model.DataAnalysis;

namespace API.Controllers;

[ApiController]
[Route("/log/mine")]
public class MineController : ControllerBase
{
    [HttpPost]
    [Route("heuristic")]
    public ActionResult<MineResultAPI> HeuristicMine(ConfiguredHeuristicModelAPI configuredHeuristicModel)
    {
        // Prepare
        var configs = configuredHeuristicModel.Configuration;
        var eventLogFile = Imperative.CreateEventLogFileFromImportedModel(configuredHeuristicModel.ImportedLog, configuredHeuristicModel.Metadata);
        var resultTraces = eventLogFile.EventLog.GetTracesWithOccurrence();
        var workflowLog = Imperative.PrepareWorkflowLog(eventLogFile, configuredHeuristicModel.Configuration);

        // Mine
        var minerSettings = Imperative.PrepareHeuristicMinerSettings(configs);
        var petriNet = HeuristicMiner.MinePetriNet(workflowLog, minerSettings);

        // Prepare Result
        var result = Imperative.CreateResult(petriNet, workflowLog, configs, resultTraces,
            configuredHeuristicModel.ImportedLog.GetAllActivities());

        return Ok(result);
    }


    [HttpPost]
    [Route("alpha")]
    public ActionResult<MineResultAPI> AlphaMine(ConfiguredAlphaModelAPI configuredAlphaModel)
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

        // TODO: Here Activities should be updated and fitness should be computed
        // Prepare result
        var result = Imperative.CreateResult(
                petriNet,
                workflowLog,
                configuration,
                resultTraces,
                importedLog.GetAllActivities()
            );

        return Ok(result);
    }
}
