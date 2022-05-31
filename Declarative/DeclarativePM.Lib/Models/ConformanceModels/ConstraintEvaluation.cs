using System.Collections.Generic;
using DeclarativePM.Lib.Declare_Templates.TemplateInterfaces;

namespace DeclarativePM.Lib.Models.ConformanceModels
{
    /// <summary>
    ///     Conformance of a constraint on a trace
    /// </summary>
    public record ConstraintEvaluation
    {
        public ConstraintEvaluation(ITemplate constraint, Healthiness healthiness,
            List<WrappedEventActivation> activations)
        {
            Constraint = constraint;
            Healthiness = healthiness;
            Activations = activations;
        }

        public ITemplate Constraint { get; }
        public Healthiness Healthiness { get; }

        public List<WrappedEventActivation> Activations { get; }
    }
}