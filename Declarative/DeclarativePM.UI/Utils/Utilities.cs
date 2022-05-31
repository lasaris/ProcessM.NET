using System;
using System.Collections.Generic;
using System.Linq;
using DeclarativePM.Lib.Enums;
using DeclarativePM.Lib.Models.ConformanceModels;
using DeclarativePM.Lib.Models.DeclareModels;
using DeclarativePM.Lib.Utils;
using DeclarativePM.UI.Data;

namespace DeclarativePM.UI.Utils
{
    public static class Utilities
    {
        public static void CreateTreeNode(out TreeNodeModel treeTemplates, List<ParametrizedTemplate> templates)
        {
            treeTemplates = new TreeNodeModel()
            {
                Name = "Discovered Constraints",
                Nodes = new[]
                {
                    GenerateInnerNodes(TemplateBookType.Existential, "Existential", templates),
                    GenerateInnerNodes(TemplateBookType.Relational, "Relational", templates),
                    GenerateInnerNodes(TemplateBookType.NotRelational, "Not Relational", templates)
                }
            };
        }

        private static TreeNodeModel GenerateInnerNodes(TemplateBookType tbt, string name,
            List<ParametrizedTemplate> templates)
        {
            return new()
            {
                Name = name,
                Nodes = templates.Where(x => x.TemplateDescription.TemplateType.GetTemplateBookType() == tbt)
                    .Select(template =>
                    {
                        return new TreeNodeModel
                        {
                            Name = template.TemplateDescription.TemplateType.ToString(),
                            Nodes = template.TemplateInstances.Select(instance => new TreeNodeModel
                            {
                                Name = instance.ToString()
                            }).ToArray()
                        };
                    }).ToArray()
            };
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