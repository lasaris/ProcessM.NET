using DeclarativePM.Lib.Declare_Templates.AbstractClasses;
using DeclarativePM.Lib.Enums;
using DeclarativePM.Lib.Models.DeclareModels;
using DeclarativePM.Lib.Models.LogModels;

namespace DeclarativePM.Lib.Declare_Templates
{
    /// <summary>
    ///     LTL Response template
    ///     If A occurs, then B occurs after A
    ///     subsequent(A => eventual(B))
    /// </summary>
    public class Response : BiTemplate
    {
        public Response(string logEventA, string logEventB) : base(logEventA, logEventB)
        {
        }

        public override LtlExpression GetExpression()
        {
            //subsequent(A => eventual(B))
            return new(Operators.Subsequent,
                new LtlExpression(Operators.Imply, new LtlExpression(LogEventA),
                    new LtlExpression(Operators.Eventual, new LtlExpression(LogEventB))));
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
            return $"Response(\"{LogEventA}\", \"{LogEventB}\")";
        }
    }
}