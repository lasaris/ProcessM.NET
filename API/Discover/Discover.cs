using API.Models;
using DeclarativePM.Lib.Enums;
using DeclarativePM.Lib.Models.DeclareModels;

namespace API.Discover;

public static class Discover
{

    public static List<ParametrizedTemplate> ConvertApiParametrizedTemplates(
        List<ParametrizedTemplateDTO> parametrizedTemplateApis)
    {
        var res = new List<ParametrizedTemplate>();

        foreach (var templateApi in parametrizedTemplateApis)
        {
            res.Add(convertApiParametrizedTemplate((templateApi)));
        }

        return res;
    }

    private static ParametrizedTemplate convertApiParametrizedTemplate(ParametrizedTemplateDTO template)
    {
        TemplateInstanceType.TryParse(template.Template, out TemplateInstanceType templateInstance);
        
        return new ParametrizedTemplate(templateInstance)
                {
                    Poe = template.Poe,
                    Poi = template.Poi,
                    CheckVacuously = template.CheckVacuously
                };
    }
}