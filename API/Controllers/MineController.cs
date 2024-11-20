using API.Mining;
using API.Models;
using API.Utils;
using DeclarativePM.Lib.Discovery;
using DeclarativePM.Lib.Enums;
using DeclarativePM.Lib.Utils;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using ProcessM.NET.Discovery.Alpha;
using ProcessM.NET.Discovery.HeuristicMiner;
using ProcessM.NET.Model.DataAnalysis;

namespace API.Controllers;

[ApiController]
[Route("/mine")]
public class MineController : ControllerBase
{
    [HttpPost]
    [Route("imperative/heuristic")]
    public ActionResult<MineResultDTO> HeuristicMine(ConfiguredHeuristicModelDTO configuredHeuristicModel)
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
    [Route("imperative/alpha")]
    public ActionResult<MineResultDTO> AlphaMine(ConfiguredAlphaModelDTO configuredAlphaModel)
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

    [HttpPost]
    [Route("declare")]
    public async Task<ActionResult<DiscoveredModelResult>> Discover(DiscoverLogDTO log)
    {
        var eventLog = log.ImportedEventLog.BuildEventLog();
        var templates = API.Discover.Discover.ConvertApiParametrizedTemplates(log.ParametrizedTemplates);

        var ctk = new CancellationToken();

        var discovery = new Discovery();
        var declareModel = await discovery.DiscoverModelAsync(eventLog, templates, ctk);
        var declareModelJson = JsonConvert.SerializeObject(declareModel, new JsonSerializerSettings { ContractResolver = new Newtonsoft.Json.Serialization.CamelCasePropertyNamesContractResolver() });

        var dotGraph = Utilities.CreateDotGraph(templates);

        var result = new DiscoveredModelResult()
        {
            Model = declareModelJson,
            DotGraph = dotGraph,
        };

        return Ok(result);
    }

    [HttpGet]
    [Route("declare/templates")]
    public ActionResult<List<TemplateDescriptionDTO>> GetTemplateDescriptions()
    {
        var templateInstanceTypes = Enum.GetValues(typeof(TemplateInstanceType))
            .Cast<TemplateInstanceType>()
            .Where(x => x != TemplateInstanceType.None)
            .Select(e => new TemplateDescriptionDTO()
            {
                Description = e.GetTemplateDescription(),
                TitName = e.ToString()
            })
            .ToList();

        return Ok(templateInstanceTypes);
    }
}
