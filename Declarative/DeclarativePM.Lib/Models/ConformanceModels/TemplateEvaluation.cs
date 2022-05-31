using System.Collections.Generic;
using System.Linq;
using DeclarativePM.Lib.Models.DeclareModels;

namespace DeclarativePM.Lib.Models.ConformanceModels
{
    /// <summary>
    ///     Conformance of a template on a trace
    /// </summary>
    public record TemplateEvaluation
    {
        public TemplateEvaluation(List<ConstraintEvaluation> constraintEvaluations, ParametrizedTemplate template)
        {
            ConstraintEvaluations = constraintEvaluations ?? new List<ConstraintEvaluation>();
            Template = template;
            UpdateHealthiness();
        }

        public List<ConstraintEvaluation> ConstraintEvaluations { get; }
        public ParametrizedTemplate Template { get; }

        public Healthiness Healthiness { get; private set; }

        /// <summary>
        ///     Updates healthiness in case new constraint evaluations were added or some were removed
        /// </summary>
        public void UpdateHealthiness()
        {
            Healthiness = new Healthiness(ConstraintEvaluations.Select(e => e.Healthiness).ToList());
        }
    }
}