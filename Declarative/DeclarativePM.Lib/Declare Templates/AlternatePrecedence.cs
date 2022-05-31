using DeclarativePM.Lib.Declare_Templates.AbstractClasses;
using DeclarativePM.Lib.Enums;
using DeclarativePM.Lib.Models.DeclareModels;
using DeclarativePM.Lib.Models.LogModels;

namespace DeclarativePM.Lib.Declare_Templates
{
    /// <summary>
    ///     LTL Alternate Precedence template
    ///     Each time B occurs, it is preceded by A and no other B can recur in between
    ///     precedence(A, B) && subsequent(B => next(precedence(A, B)))
    /// </summary>
    public class AlternatePrecedence : BiTemplate
    {
        public AlternatePrecedence(string logEventA, string logEventB) : base(logEventA, logEventB)
        {
        }

        public override LtlExpression GetExpression()
        {
            //precedence(A, B) && subsequent(B => next(precedence(A, B)))
            return new(Operators.And, new Precedence(LogEventA, LogEventB).GetExpression(),
                new LtlExpression(Operators.Subsequent, new LtlExpression(Operators.Imply,
                    new LtlExpression(LogEventB), new LtlExpression(Operators.Next,
                        new Precedence(LogEventA, LogEventB).GetExpression()))));
        }

        public override bool IsActivation(Event e)
        {
            return e.Activity.Equals(LogEventB);
        }

        public override LtlExpression GetVacuityCondition()
        {
            //eventual(B)
            return new(Operators.Eventual, new LtlExpression(LogEventB));
        }

        public override string ToString()
        {
            return $"AlternatePrecedence(\"{LogEventA}\", \"{LogEventB}\")";
        }
    }
}