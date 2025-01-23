using DeclarativePM.Lib.Declare_Templates;
using DeclarativePM.Lib.Declare_Templates.Factories;
using DeclarativePM.Lib.Declare_Templates.TemplateInterfaces;
using DeclarativePM.Lib.Enums;
using DeclarativePM.Lib.Utils;

namespace API.Models;

/**
 * Class representing a general TemplateInstance
 * Could be one of the below:
 *  - ExistenceTemplate
 *  - UniTemplate
 *  - BiTemplate
 */
public class TemplateDTO
{
    public string? LogEvent { get; set; }
    public string? LogEventA { get; set; }
    public string? LogEventB { get; set; }
    public int? Occurrences { get; set; }

    public ITemplate? ConvertTemplateToTit(TemplateInstanceType type)
    {
        var templateType = type.GetTemplateType();

        switch (templateType)
        {
           case TemplateTypes.Existence: 
               return ExistenceFactory.GetInstance(type, Occurrences!.Value, LogEvent);
           case TemplateTypes.UniTemplate:
               return UniTemplateFactory.GetInstance(type, LogEvent);
           case TemplateTypes.BiTemplate:
               return BiTemplateFactory.GetInstance(type, LogEventA, LogEventB);
           case TemplateTypes.None: break;
        }

        return null;
    }
}