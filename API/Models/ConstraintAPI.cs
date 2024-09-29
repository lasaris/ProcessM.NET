using DeclarativePM.Lib.Enums;
using DeclarativePM.Lib.Models.DeclareModels;
using DeclarativePM.Lib.Utils;

namespace API.Models;

public class ConstraintAPI
{
    public List<TemplateAPI> TemplateInstances { get; set; }
    public List<TemplateAPI> OptionalConstraints { get; set; }
    public decimal Poe { get; set; }
    public decimal Poi { get; set; }
    public bool CheckVacuously { get; set; }
    public ConformanceTemplateDescription TemplateDescription { get; set; }

    public ParametrizedTemplate ConvertToParametrizedTemplate()
    {
        Console.WriteLine("The templateType of the TemplateDescription is: " + TemplateDescription.TemplateType);
        var template = (TemplateInstanceType) TemplateDescription.TemplateType;
        Console.WriteLine("The converted templateType of the TemplateDescription is: " + template);

        var constraints = TemplateInstances
            .Select(t => t.ConvertTemplateToTit(template))
            .Where(t => t != null)
            .Select(t => t!)
            .ToList();

        Console.WriteLine("The template is: " + template + " And the constraints length is: " + constraints.Count);

        return new ParametrizedTemplate(constraints, template, Poe, Poi, CheckVacuously);
    }
    
}