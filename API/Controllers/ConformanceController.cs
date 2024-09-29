using API.Models;
using DeclarativePM.Lib.Models.ConformanceModels;
using DeclarativePM.Lib.Models.DeclareModels;
using DeclarativePM.Lib.Models.LogModels;
using DeclarativePM.Lib.Utils;
using DeclarativePM.UI.Data;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace API.Controllers;

[ApiController]
[Route("/model/conformance")]
public class ConformanceController : ControllerBase
{
    [HttpPost]
    public ActionResult<TraceEvaluationAPI> DeclareAPI(ConformanceModelAPI conformanceModel)
    {
        var declareModel = conformanceModel.DeclareModel.ConvertToDeclareModel();

        var evaluator = new ConformanceEvaluator();
        var traceEvaluation = evaluator.EvaluateTrace(declareModel, conformanceModel.Trace);

        var temp = traceEvaluation.TemplateEvaluations.Where(t => t.ConstraintEvaluations.Count > 0).ToList();
        traceEvaluation.TemplateEvaluations.Clear();
        traceEvaluation.TemplateEvaluations.AddRange(temp);

        var result = Conformance.Conformance.PrepareConformanceEvaluationResult(traceEvaluation);

        return Ok(result);
    }

    [HttpPost]
    [Route("traces")]
    public ActionResult<List<TraceDTO>> GetEventLog(ImportedEventLogAPI importedEventLog)
    {
        var traces = importedEventLog
            .BuildEventLog()
            .GetAllTraces()
            .Select(x => new TraceDTO(x))
            .ToList();

        return Ok(traces);
    }
}