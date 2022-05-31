using DeclarativePM.Lib.Declare_Templates.AbstractClasses;
using DeclarativePM.Lib.Enums;
using DeclarativePM.Lib.Models.DeclareModels;
using DeclarativePM.Lib.Models.LogModels;

namespace DeclarativePM.Lib.Declare_Templates
{
    /// <summary>
    ///     LTL Not Coexistence template
    ///     A and B never occur together
    ///     !(eventual(A) && eventual(B))
    /// </summary>
    public class NotCoexistence : BiTemplate
    {
        public NotCoexistence(string logEventA, string logEventB) : base(logEventA, logEventB)
        {
        }

        public override LtlExpression GetExpression()
        {
            //!(eventual(A) && eventual(B))
            return new(Operators.Not, new LtlExpression(Operators.And,
                new LtlExpression(Operators.Eventual, new LtlExpression(LogEventA)),
                new LtlExpression(Operators.Eventual, new LtlExpression(LogEventB))));
        }

        public override bool IsActivation(Event e)
        {
            return e.Activity.Equals(LogEventA) || e.Activity.Equals(LogEventB);
        }

        public override LtlExpression GetVacuityCondition()
        {
            //eventual(A) || eventual(B)
            return new(Operators.Or,
                new LtlExpression(Operators.Eventual, new LtlExpression(LogEventA)),
                new LtlExpression(Operators.Eventual, new LtlExpression(LogEventB)));
        }

        public override string ToString()
        {
            return $"NotCoexistence(\"{LogEventA}\", \"{LogEventB}\")";
        }
    }
}