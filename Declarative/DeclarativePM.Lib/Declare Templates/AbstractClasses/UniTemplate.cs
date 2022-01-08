using DeclarativePM.Lib.Declare_Templates.TemplateInterfaces;
using DeclarativePM.Lib.Models.DeclareModels;

namespace DeclarativePM.Lib.Declare_Templates.AbstractClasses
{
    /// <summary>
    ///     Represents templates which take only one parameter and no additional parameters are taken.
    ///     These templates are related to only position of single event
    /// </summary>
    public abstract class UniTemplate : ITemplate
    {
        public readonly string LogEvent;

        protected UniTemplate(string logEvent)
        {
            LogEvent = logEvent;
        }

        public abstract LtlExpression GetExpression();

        public string GetEventA()
        {
            return LogEvent;
        }
    }
}