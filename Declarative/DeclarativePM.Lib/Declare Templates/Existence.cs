using DeclarativePM.Lib.Declare_Templates.AbstractClasses;
using DeclarativePM.Lib.Enums;
using DeclarativePM.Lib.Models.DeclareModels;

namespace DeclarativePM.Lib.Declare_Templates
{
    /// <summary>
    ///     LTL Existence template
    ///     A occurs at least n times
    ///     Eventual(A && Next(Existence(n-1, A)))
    ///     Eventual(A)
    /// </summary>
    public class Existence : ExistenceTemplate
    {
        public Existence(int occurrences, string logEvent) : base(occurrences, logEvent)
        {
        }

        public override LtlExpression GetExpression()
        {
            if (Occurrences == 0)
                //tautology a || !a
                return new LtlExpression(Operators.Or,
                    new LtlExpression(LogEvent),
                    new LtlExpression(Operators.Not,
                        new LtlExpression(LogEvent)));

            if (Occurrences == 1) return new LtlExpression(Operators.Eventual, new LtlExpression(LogEvent));
            //Eventual(A && Next(Existence(n-1, A)))
            return new LtlExpression(Operators.Eventual,
                new LtlExpression(Operators.And,
                    new LtlExpression(LogEvent),
                    new LtlExpression(Operators.Next,
                        new Existence(Occurrences - 1, LogEvent).GetExpression())));
        }

        public override string ToString()
        {
            return $"Existence({Occurrences}, \"{LogEvent}\")";
        }
    }
}