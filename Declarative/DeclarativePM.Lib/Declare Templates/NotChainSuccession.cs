using DeclarativePM.Lib.Declare_Templates.AbstractClasses;
using DeclarativePM.Lib.Enums;
using DeclarativePM.Lib.Models.DeclareModels;
using DeclarativePM.Lib.Models.LogModels;

namespace DeclarativePM.Lib.Declare_Templates
{
    /// <summary>
    ///     LTL Not Chain Succession template
    ///     A and B occur if and only if the latter does not immediately follow the former
    ///     subsequent(A => next(!B))
    /// </summary>
    public class NotChainSuccession : BiTemplate
    {
        public NotChainSuccession(string logEventA, string logEventB) : base(logEventA, logEventB)
        {
        }

        public override LtlExpression GetExpression()
        {
            //subsequent(A => next(!B))
            return new(Operators.Subsequent,
                new LtlExpression(Operators.Imply,
                    new LtlExpression(LogEventA),
                    new LtlExpression(Operators.Next,
                        new LtlExpression(Operators.Not,
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
            return $"NotChainSuccession(\"{LogEventA}\", \"{LogEventB}\")";
        }
    }
}