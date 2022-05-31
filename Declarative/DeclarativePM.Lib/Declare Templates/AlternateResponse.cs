using DeclarativePM.Lib.Declare_Templates.AbstractClasses;
using DeclarativePM.Lib.Enums;
using DeclarativePM.Lib.Models.DeclareModels;
using DeclarativePM.Lib.Models.LogModels;

namespace DeclarativePM.Lib.Declare_Templates
{
    /// <summary>
    ///     LTL Alternate Response template
    ///     Each time A occurs, then B occurs afterwards, before A recurs
    ///     subsequent(A => next(!A U B))
    /// </summary>
    public class AlternateResponse : BiTemplate
    {
        public AlternateResponse(string logEventA, string logEventB) : base(logEventA, logEventB)
        {
        }

        public override LtlExpression GetExpression()
        {
            //subsequent(A => next(!A U B))
            return new(Operators.Subsequent, new LtlExpression(Operators.Imply,
                new LtlExpression(LogEventA), new LtlExpression(Operators.Next,
                    new LtlExpression(Operators.Least, new LtlExpression(Operators.Not,
                            new LtlExpression(LogEventA)),
                        new LtlExpression(LogEventB)))));
        }

        public LtlExpression GetFinishingExpression()
        {
            //subsequent(A => next(!A U B) && eventual(B))
            var expr = GetExpression();
            expr.InnerLeft.InnerRight = new LtlExpression(Operators.And, expr.InnerLeft.InnerRight,
                new LtlExpression(Operators.Eventual, new LtlExpression(LogEventB)));

            return expr;
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
            return $"AlternateResponse(\"{LogEventA}\", \"{LogEventB}\")";
        }
    }
}