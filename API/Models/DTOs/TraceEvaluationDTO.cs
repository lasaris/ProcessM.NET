using DeclarativePM.Lib.Models.ConformanceModels;
using DeclarativePM.Lib.Models.LogModels;

namespace API.Models;

public class TraceEvaluationDTO
{
    public Healthiness OverallTraceHealthiness { get; set; }
    public ConformanceExtremeHealthiness MostViolatingTemplate { get; set; }
    public ConformanceExtremeHealthiness MostConflictingTemplate { get; set; }
    public ConformanceExtremeHealthiness MostViolatingConstraint { get; set; }
    public ConformanceExtremeHealthiness MostConflictingConstraint { get; set; }
    public List<Event> Trace { get; set; }
    public List<TemplateEvaluationDTO> TemplateEvaluations { get; set; }
}