using API.Mining;
using API.Models;
using BakaMining.Models;
using BakaMining.Utils;
using Microsoft.AspNetCore.Mvc;
using ProcessM.NET.Discovery.Alpha;
using ProcessM.NET.Discovery.HeuristicMiner;
using ProcessM.NET.Export;
using ProcessM.NET.Model.DataAnalysis;
using ProcessM.NET.Model.GraphvizNet;

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
        var eventLogFile = Imperative.CreateEventLogFileFromImportedModel(configuredHeuristicModel.ImportedLog,
            configuredHeuristicModel.Metadata);
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
        // Prepare
        var eventLogFile =
            Imperative.CreateEventLogFileFromImportedModel(configuredAlphaModel.importedLog,
                configuredAlphaModel.metadata);
        var resultTraces = eventLogFile.EventLog.GetTracesWithOccurrence();
        var workflowLog = Imperative.PrepareWorkflowLog(eventLogFile, configuredAlphaModel.configuration);

        // Mine
        var petriNet = Alpha.MakePetriNet(new RelationMatrix(workflowLog));

        // TODO: Here Activities should be updated and fitness should be computed
        // Prepare result
        var result = Imperative.CreateResult(
                petriNet,
                workflowLog,
                configuredAlphaModel.configuration,
                resultTraces,
                configuredAlphaModel.importedLog.GetAllActivities()
            );

        return Ok(result);
    }
}
