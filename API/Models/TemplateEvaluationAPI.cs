namespace API.Models;

public class TemplateEvaluationAPI
{
    public string? ReadableName { get; set; }
    public List<ConstraintEvaluationAPI>? ConstraintEvaluations { get; set; }
}