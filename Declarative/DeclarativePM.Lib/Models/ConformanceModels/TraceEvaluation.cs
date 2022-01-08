using System.Collections.Generic;
using System.Linq;
using DeclarativePM.Lib.Models.LogModels;

namespace DeclarativePM.Lib.Models.ConformanceModels
{
    /// <summary>
    ///     Conformance of a multiple templates (model) on a trace
    /// </summary>
    public class TraceEvaluation
    {
        public TraceEvaluation(List<Event> trace, List<TemplateEvaluation> templateEvaluations)
        {
            Trace = trace;
            TemplateEvaluations = templateEvaluations;
            UpdateHealthiness();
        }

        public List<Event> Trace { get; }
        public List<TemplateEvaluation> TemplateEvaluations { get; }
        public Healthiness Healthiness { get; private set; }

        /// <summary>
        ///     Updates healthiness in case new constraint evaluations were added or some were removed
        /// </summary>
        public void UpdateHealthiness()
        {
            Healthiness = new Healthiness(TemplateEvaluations.Select(e => e.Healthiness).ToList());
        }
    }
}