
using System.Text;
using DeclarativePM.Lib.Declare_Templates.AbstractClasses;
using DeclarativePM.Lib.Enums;
using DeclarativePM.Lib.Models.ConformanceModels;
using DeclarativePM.Lib.Models.DeclareModels;
using DeclarativePM.Lib.Utils;

namespace API.Utils
{
    public static class Utilities
    {
        private static string _generateEdge(string activity1, string activity2, string label, string color, string arrowhead)
        {
            return $"\t\"{activity1}\" -> \"{activity2}\" [label=<<font color=\"{color}\"><b>{label}</b></font>>, color=\"{color}\", arrowhead=\"{arrowhead}\"]\n";
        }
        private static readonly Dictionary<TemplateInstanceType, string> _colorMap = new()
        {
            { TemplateInstanceType.None, "#000000" },               // Black
            { TemplateInstanceType.Absence, "#D32F2F" },            // Dark Red
            { TemplateInstanceType.AlternatePrecedence, "#388E3C" },// Dark Green
            { TemplateInstanceType.AlternateResponse, "#1976D2" },  // Medium Blue
            { TemplateInstanceType.AlternateSuccession, "#F57C00" },// Dark Orange
            { TemplateInstanceType.ChainPrecedence, "#7B1FA2" },    // Dark Magenta
            { TemplateInstanceType.ChainResponse, "#0097A7" },      // Dark Cyan
            { TemplateInstanceType.ChainSuccession, "#6A1B9A" },    // Dark Purple
            { TemplateInstanceType.Coexistence, "#E65100" },        // Deep Orange
            { TemplateInstanceType.Exactly, "#2E7D32" },            // Dark Green
            { TemplateInstanceType.Existence, "#424242" },          // Dark Gray
            { TemplateInstanceType.Init, "#C2185B" },               // Dark Pink
            { TemplateInstanceType.NotChainSuccession, "#5D4037" }, // Dark Brown
            { TemplateInstanceType.NotCoexistence, "#FF8F00" },     // Dark Gold/Amber
            { TemplateInstanceType.NotSuccession, "#C62828" },      // Deep Red
            { TemplateInstanceType.Precedence, "#1565C0" },         // Deep Blue
            { TemplateInstanceType.RespondedExistence, "#8E24AA" }, // Deep Orchid
            { TemplateInstanceType.Response, "#283593" },           // Dark Indigo
            { TemplateInstanceType.Succession, "#00838F" }          // Deep Turquoise
        };

        // Absence
        // Existence
        // Exactly
        private static string GenerateExistenceTemplateEdges(List<ExistenceTemplate> existenceTemplates, string color)
        {
            var sb = new StringBuilder();

            var existanceTemplates = new Dictionary<string, ExistenceTemplate>();

            foreach (var tit in existenceTemplates)
            {
                var activity = tit.GetEvent();
                var occurences = tit.GetCount();

                if (!existanceTemplates.ContainsKey(activity))
                {
                    existanceTemplates.Add(activity, tit);
                    continue;
                }

                if (occurences > existanceTemplates[activity].GetCount())
                {
                    existanceTemplates[activity] = tit;
                }
            }

            foreach (var (activity, tit) in existanceTemplates)
            {
                sb.Append(_generateEdge(activity, activity, tit.ToString(), color, "none"));
            }

            return sb.ToString(); ;
        }

        // AlternatePrecedence
        // AlternateResponse
        // AlternateSuccession
        // ChainPrecedence
        // ChainResponse
        // ChainSuccession
        // Coexistence
        // NotChainSuccession
        // NotCoexistence
        // NotSuccession
        // Precedence
        // RespondedExistence
        // Response
        // Succession
        private static string GenerateBiTemplateEdges(List<BiTemplate> biTemplates, string color)
        {
            var sb = new StringBuilder();

            foreach (var tit in biTemplates)
            {
                sb.Append(_generateEdge(tit.GetEventA(), tit.GetEventB(), tit.ToString(), color, "normal"));
            }

            return sb.ToString();
        }

        // Init
        private static string GenerateUniTemplateEdges(List<UniTemplate> uniTemplates, string color)
        {
            var sb = new StringBuilder();

            foreach (var tit in uniTemplates)
            {
                sb.Append(_generateEdge(tit.GetEventA(), tit.GetEventA(), tit.ToString(), color, "none"));
            }

            return sb.ToString();
        }

        public static string CreateDotGraph(List<ParametrizedTemplate> templates)
        {
            var sb = new StringBuilder();

            sb.Append("digraph G {\n");
            sb.Append("\tnode [shape=\"box\", color=\"black\", style=\"rounded,filled\", fillcolor=\"lightgray\", fontcolor=\"black\", fontsize=12, penwidth=2, width=0.7, height=0.7];\n\n");

            foreach (var template in templates)
            {
                var color = _colorMap[template.TemplateDescription.TemplateType];
                switch (template.TemplateDescription.TemplateParametersType)
                {
                    case TemplateTypes.Existence:
                        {
                            sb.Append(GenerateExistenceTemplateEdges(template.TemplateInstances.Cast<ExistenceTemplate>().ToList(), color));
                            break;
                        }
                    case TemplateTypes.BiTemplate:
                        {
                            sb.Append(GenerateBiTemplateEdges(template.TemplateInstances.Cast<BiTemplate>().ToList(), color));
                            break;
                        }
                    case TemplateTypes.UniTemplate:
                        {
                            sb.Append(GenerateUniTemplateEdges(template.TemplateInstances.Cast<UniTemplate>().ToList(), color));
                            break;
                        }
                    default: break;
                }
            }

            sb.Append("}\n");

            return sb.ToString();
        }

        public static string GetExpansionBackground<T>(T current, T selected)
        {
            return current.Equals(selected) ? "background: #ffd5ff" : "background: #f3f3f3";
        }

        public static string GetExpansionBackground<T>(T current, List<T> from)
        {
            return from.Contains(current) ? "background: #ffd5ff" : "background: #f3f3f3";
        }

        public static string GetTreeBackground(string current, List<TemplateEvaluation> evaluations)
        {
            if (evaluations is null)
                return "background: #ffffff";
            if (evaluations.Any(x => x.ConstraintEvaluations
                .Where(c => c is not null)
                .Any(y => y.Constraint.ToString()
                    .Equals(current) && Math.Abs(x.Healthiness.FulfillmentRation - 1) > 0.01)))
                return "background: #ffd5ff";
            return "background: #ffffff";
        }
    }
}
public class ActivitiesComparer : IEqualityComparer<IList<string>>
{
    public bool Equals(IList<string> x, IList<string> y)
    {
        if (x == null || y == null) return false;
        return x.SequenceEqual(y);
    }

    public int GetHashCode(IList<string> arr)
    {
        int hash = 19;
        foreach (var s in arr)
        {
            hash += s.GetHashCode();
        }
        return hash;
    }
}