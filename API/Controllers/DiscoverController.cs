using System.Text.Json;
using API.Models;
using DeclarativePM.Lib.Discovery;
using DeclarativePM.Lib.Enums;
using DeclarativePM.Lib.Models.DeclareModels;
using DeclarativePM.Lib.Utils;
using DeclarativePM.UI.Data;
using DeclarativePM.UI.Utils;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace API.Controllers;

[ApiController]
[Route("/log/discover")]
public class DiscoverController: ControllerBase
{
    [HttpPost]
    public async Task<ActionResult<DiscoveredModelResult>> Discover(DiscoverLogAPI log)
    {
        var eventLog = log.ImportedEventLog.BuildEventLog();
        var templates = API.Discover.Discover.ConvertApiParametrizedTemplates(log.ParametrizedTemplates);

        var ctk = new CancellationToken();

        var discovery = new Discovery();
        var declareModel = await discovery.DiscoverModelAsync(eventLog, templates, ctk);
        var declareModelJson = JsonConvert.SerializeObject(declareModel);

        Utilities.CreateTreeNode(out var treeNodeModel, templates);

        var result = new DiscoveredModelResult()
        {
            Model = declareModelJson,
            TreeModel = treeNodeModel,
        };

        return Ok(result);
    }

    [HttpGet]
    [Route("constraints")]
    public ActionResult<List<TemplateDescriptionAPI>> GetTemplateDescriptions()
    {
        var templateInstanceTypes = Enum.GetValues(typeof(TemplateInstanceType))
            .Cast<TemplateInstanceType>()
            .Where(x => x != TemplateInstanceType.None)
            .Select(e => new TemplateDescriptionAPI()
            {
                Description =e.GetTemplateDescription(),
                TitName = e.ToString()
            })
            .ToList();

        return Ok(templateInstanceTypes);
    }
}
