using DeclarativePM.Lib.Declare_Templates.AbstractClasses;
using DeclarativePM.Lib.Enums;
using DeclarativePM.Lib.Models.DeclareModels;
using DeclarativePM.Lib.Models.LogModels;

namespace DeclarativePM.Lib.Declare_Templates
{
    /// <summary>
    ///     LTL Chain Response template
    ///     Each time A occurs, then B occurs immediately after
    ///     subsequent(A => next(B))
    /// </summary>
    public class ChainResponse : BiTemplate
    {
        public ChainResponse(string logEventA, string logEventB) : base(logEventA, logEventB)
        {
        }

        public override LtlExpression GetExpression()
        {
            //subsequent(A => next(B))
            return new(Operators.Subsequent, new LtlExpression(Operators.Imply,
                new LtlExpression(LogEventA),
                new LtlExpression(Operators.Next, new LtlExpression(LogEventB))));
        }

        public override bool IsActivation(Event e)
        {
            return e.Activity.Equals(LogEventA);
        }

        public override LtlExpression GetVacuityCondition()
        {
            //eventual(A)
            return new(Operators.Eventual, new LtlExpression(LogEventA));
        }

        public override string ToString()
        {
            return $"ChainResponse(\"{LogEventA}\", \"{LogEventB}\")";
        }
    }
}