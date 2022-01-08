using DeclarativePM.Lib.Declare_Templates.AbstractClasses;
using DeclarativePM.Lib.Enums;
using DeclarativePM.Lib.Models.DeclareModels;
using DeclarativePM.Lib.Models.LogModels;

namespace DeclarativePM.Lib.Declare_Templates
{
    /// <summary>
    ///     LTL Precedence template
    ///     B occurs only if preceded by A
    ///     (!B U A) || subsequent(!B)
    /// </summary>
    public class Precedence : BiTemplate
    {
        public Precedence(string logEventA, string logEventB) : base(logEventA, logEventB)
        {
        }

        public override LtlExpression GetExpression()
        {
            //(!B U A) || subsequent(!B)
            return new(Operators.Or, new LtlExpression(Operators.Least,
                    new LtlExpression(Operators.Not, new LtlExpression(LogEventB)),
                    new LtlExpression(LogEventA)),
                new LtlExpression(Operators.Subsequent,
                    new LtlExpression(Operators.Not, new LtlExpression(LogEventB))));
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
            return $"Precedence(\"{LogEventA}\", \"{LogEventB}\")";
        }
    }
}