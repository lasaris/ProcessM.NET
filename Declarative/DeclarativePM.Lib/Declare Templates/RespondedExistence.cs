using DeclarativePM.Lib.Declare_Templates.AbstractClasses;
using DeclarativePM.Lib.Enums;
using DeclarativePM.Lib.Models.DeclareModels;
using DeclarativePM.Lib.Models.LogModels;

namespace DeclarativePM.Lib.Declare_Templates
{
    /// <summary>
    ///     LTL Responded Existence template
    ///     If A occurs, then B occurs
    ///     eventual(A) => eventual(B)
    /// </summary>
    public class RespondedExistence : BiTemplate
    {
        public RespondedExistence(string logEventA, string logEventB) : base(logEventA, logEventB)
        {
        }

        public override LtlExpression GetExpression()
        {
            //eventual(A) => eventual(B)
            return new(Operators.Imply,
                new LtlExpression(Operators.Eventual, new LtlExpression(LogEventA)),
                new LtlExpression(Operators.Eventual, new LtlExpression(LogEventB)));
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
            return $"RespondedExistence(\"{LogEventA}\", \"{LogEventB}\")";
        }
    }
}