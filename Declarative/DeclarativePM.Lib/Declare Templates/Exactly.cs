using DeclarativePM.Lib.Declare_Templates.AbstractClasses;
using DeclarativePM.Lib.Enums;
using DeclarativePM.Lib.Models.DeclareModels;

namespace DeclarativePM.Lib.Declare_Templates
{
    /// <summary>
    ///     LTL Exactly template
    ///     A occurs exactly n times
    ///     existence(n, A) && absence(n + 1, A)
    /// </summary>
    public class Exactly : ExistenceTemplate
    {
        public Exactly(int occurrences, string logEvent) : base(occurrences, logEvent)
        {
        }

        public override LtlExpression GetExpression()
        {
            //existence(n, A) && absence(n + 1, A)
            return new(Operators.And, new Existence(Occurrences, LogEvent).GetExpression(),
                new Absence(Occurrences + 1, LogEvent).GetExpression());
        }

        public override string ToString()
        {
            return $"Exactly({Occurrences}, \"{LogEvent}\")";
        }
    }
}