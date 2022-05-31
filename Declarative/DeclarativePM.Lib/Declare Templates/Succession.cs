using DeclarativePM.Lib.Declare_Templates.AbstractClasses;
using DeclarativePM.Lib.Enums;
using DeclarativePM.Lib.Models.DeclareModels;
using DeclarativePM.Lib.Models.LogModels;

namespace DeclarativePM.Lib.Declare_Templates
{
    /// <summary>
    ///     LTL Succession template
    ///     A occurs if and only if B occurs after A
    ///     response(A, B) && precedence(A, B)
    /// </summary>
    public class Succession : BiTemplate
    {
        public Succession(string logEventA, string logEventB) : base(logEventA, logEventB)
        {
        }

        public override LtlExpression GetExpression()
        {
            //response(A, B) && precedence(A, B)
            return new(Operators.And, new Response(LogEventA, LogEventB).GetExpression(),
                new Precedence(LogEventA, LogEventB).GetExpression());
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
            return $"Succession(\"{LogEventA}\", \"{LogEventB}\")";
        }
    }
}