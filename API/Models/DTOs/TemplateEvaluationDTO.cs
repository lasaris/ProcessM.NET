namespace API.Models;

public class TemplateEvaluationDTO
{
    public string? ReadableName { get; set; }
    public List<ConstraintEvaluationDTO>? ConstraintEvaluations { get; set; }
}