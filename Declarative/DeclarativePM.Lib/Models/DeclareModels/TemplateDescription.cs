using DeclarativePM.Lib.Enums;
using DeclarativePM.Lib.Utils;
using Newtonsoft.Json;

namespace DeclarativePM.Lib.Models.DeclareModels
{
    /// <summary>
    ///     Description and specifications of template
    /// </summary>
    public readonly struct TemplateDescription
    {
        [JsonIgnore] public string ReadableName { get; }
        [JsonIgnore] public string Type { get; }
        [JsonIgnore] public string Description { get; }
        [JsonIgnore] public string LtlExpression { get; }
        [JsonIgnore] public string Activations { get; }
        [JsonIgnore] public TemplateTypes TemplateParametersType { get; }
        [JsonIgnore] public TemplateBookType TemplateCategory { get; }

        public TemplateInstanceType TemplateType { get; }

        public TemplateDescription(string readableName, string type, string description, string ltlExpression,
            string activations, TemplateInstanceType templateType)
        {
            ReadableName = readableName;
            Type = type;
            Description = description;
            LtlExpression = ltlExpression;
            Activations = activations;
            TemplateType = templateType;
            TemplateCategory = templateType.GetTemplateBookType();
            TemplateParametersType = templateType.GetTemplateType();
        }
    }
}