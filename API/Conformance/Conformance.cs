using API.Models;
using DeclarativePM.Lib.Declare_Templates;
using DeclarativePM.Lib.Declare_Templates.AbstractClasses;
using DeclarativePM.Lib.Models.ConformanceModels;

namespace API.Conformance;

public static class Conformance
{
    public static TemplateEvaluation GetMostViolatingTemplate(TraceEvaluation traceEvaluation)
    {
        return traceEvaluation.TemplateEvaluations.Aggregate((t1, t2) =>
            t1.Healthiness.ViolationRation > t2.Healthiness.ViolationRation ? t1 : t2);
    }

    public static TemplateEvaluation GetMostConflictingTemplate(TraceEvaluation traceEvaluation)
    {
        return traceEvaluation.TemplateEvaluations.Aggregate((t1, t2) =>
            t1.Healthiness.ConflictRation > t2.Healthiness.ConflictRation ? t1 : t2);
    }

    public static ConstraintEvaluation GetMostViolatingConstraint(TraceEvaluation traceEvaluation)
    {
        return traceEvaluation.TemplateEvaluations.SelectMany(t => t.ConstraintEvaluations)
            .Aggregate((t1, t2) =>
                t1.Healthiness.ViolationRation > t2.Healthiness.ViolationRation ? t1 : t2);
    }

    public static ConstraintEvaluation GetMostConflictingConstraint(TraceEvaluation traceEvaluation)
    {
        return traceEvaluation.TemplateEvaluations.SelectMany(t => t.ConstraintEvaluations)
            .Aggregate((t1, t2) =>
                t1.Healthiness.ConflictRation > t2.Healthiness.ConflictRation ? t1 : t2);
    }

    public static TraceEvaluationAPI PrepareConformanceEvaluationResult(TraceEvaluation traceEvaluation)
    {
        var mostConflictingTemplate = GetMostConflictingTemplate(traceEvaluation);
        var mostViolatingTemplate = GetMostViolatingTemplate(traceEvaluation);
        var mostConflictingConstraint = GetMostConflictingConstraint(traceEvaluation);
        var mostViolatingConstraint = GetMostViolatingConstraint(traceEvaluation);
        List<TemplateEvaluationAPI> templateEvals = traceEvaluation.TemplateEvaluations
            .Select(templateEvaluation => new TemplateEvaluationAPI()
            {
                ReadableName = templateEvaluation.Template.TemplateDescription.ReadableName,
                ConstraintEvaluations = templateEvaluation.ConstraintEvaluations.Select(convertConstraintEvaluationToDTO).ToList()
            }).ToList();


        var result = new TraceEvaluationAPI()
        {
            OverallTraceHealthiness = traceEvaluation.Healthiness,
            MostConflictingConstraint = new ConformanceExtremeHealthiness()
            {
                Healthiness = mostConflictingConstraint.Healthiness,
                Title = mostConflictingConstraint.Constraint.ToString(),
            },
            MostViolatingConstraint = new ConformanceExtremeHealthiness()
            {
                Healthiness = mostViolatingConstraint.Healthiness,
                Title = mostViolatingConstraint.Constraint.ToString(),
            },
            MostConflictingTemplate = new ConformanceExtremeHealthiness()
            {
                Healthiness = mostConflictingTemplate.Healthiness,
                Title = mostConflictingTemplate.Template.TemplateDescription.ReadableName,
            },
            MostViolatingTemplate = new ConformanceExtremeHealthiness()
            {
                Healthiness = mostViolatingTemplate.Healthiness,
                Title = mostViolatingTemplate.Template.TemplateDescription.ReadableName
            },
            Trace = traceEvaluation.Trace,
            TemplateEvaluations = templateEvals,
        };

        return result;
    }

    private static ConstraintEvaluationAPI convertConstraintEvaluationToDTO(ConstraintEvaluation evaluation)
    {
        var constraint = evaluation.Constraint;
        var result = new ConstraintEvaluationAPI()
        {
            ReadableName = constraint.ToString(),
        };

        switch (constraint)
        {
            case BiTemplate biTemplate:
                {
                    result.ActivityAName = biTemplate.LogEventA;
                    result.ActivityBName = biTemplate.LogEventB;
                    break;
                }
            case UniTemplate uniTemplate:
                {
                    result.ActivityAName = uniTemplate.LogEvent;
                    break;
                }
            case ExistenceTemplate existence:
                {
                    result.ActivityAName = existence.LogEvent;
                    break;
                }
        }

        return result;
    }
}