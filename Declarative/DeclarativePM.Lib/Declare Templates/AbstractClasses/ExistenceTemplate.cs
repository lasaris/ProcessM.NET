using DeclarativePM.Lib.Declare_Templates.TemplateInterfaces;
using DeclarativePM.Lib.Models.DeclareModels;

namespace DeclarativePM.Lib.Declare_Templates.AbstractClasses
{
    /// <summary>
    ///     Represent templates of Existential type, those templates check
    ///     an amount in which an event occurs, or not occurs.
    /// </summary>
    public abstract class ExistenceTemplate : ITemplate
    {
        public readonly string LogEvent;
        public readonly int Occurrences;

        protected ExistenceTemplate(int occurrences, string logEvent)
        {
            Occurrences = occurrences;
            LogEvent = logEvent;
        }

        public abstract LtlExpression GetExpression();

        public string GetEvent()
        {
            return LogEvent;
        }

        public int GetCount()
        {
            return Occurrences;
        }
    }
}