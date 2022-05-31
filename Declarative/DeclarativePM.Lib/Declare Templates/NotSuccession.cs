using DeclarativePM.Lib.Declare_Templates.AbstractClasses;
using DeclarativePM.Lib.Enums;
using DeclarativePM.Lib.Models.DeclareModels;
using DeclarativePM.Lib.Models.LogModels;

namespace DeclarativePM.Lib.Declare_Templates
{
    /// <summary>
    ///     LTL Not Succession template
    ///     A never occurs before B
    ///     subsequent(A => !eventual(B))
    /// </summary>
    public class NotSuccession : BiTemplate
    {
        public NotSuccession(string logEventA, string logEventB) : base(logEventA, logEventB)
        {
        }

        public override LtlExpression GetExpression()
        {
            //subsequent(A => !eventual(B))
            return new(Operators.Subsequent,
                new LtlExpression(Operators.Imply,
                    new LtlExpression(LogEventA),
                    new LtlExpression(Operators.Not,
                        new LtlExpression(Operators.Eventual,
                            new LtlExpression(LogEventB)))));
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
            return $"NotSuccession(\"{LogEventA}\", \"{LogEventB}\")";
        }
    }
}