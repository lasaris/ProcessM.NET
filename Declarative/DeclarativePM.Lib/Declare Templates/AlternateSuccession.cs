using DeclarativePM.Lib.Declare_Templates.AbstractClasses;
using DeclarativePM.Lib.Enums;
using DeclarativePM.Lib.Models.DeclareModels;
using DeclarativePM.Lib.Models.LogModels;

namespace DeclarativePM.Lib.Declare_Templates
{
    /// <summary>
    ///     LTL Alternate Succession template
    ///     A and B occur if and only if the latter follows the former, and they alternate each other
    ///     alternateResponse(A, B) && AlternatePrecedence(A, B)
    /// </summary>
    public class AlternateSuccession : BiTemplate
    {
        public AlternateSuccession(string logEventA, string logEventB) : base(logEventA, logEventB)
        {
        }

        public override LtlExpression GetExpression()
        {
            //AlternateResponse(A, B) && AlternatePrecedence(A, B)
            return new(Operators.And, new AlternateResponse(LogEventA, LogEventB).GetExpression(),
                new AlternatePrecedence(LogEventA, LogEventB).GetExpression());
        }

        public LtlExpression GetFinishingExpression()
        {
            //AlternateResponse(A, B) && AlternatePrecedence(A, B)
            return new(Operators.And, new AlternateResponse(LogEventA, LogEventB).GetFinishingExpression(),
                new AlternatePrecedence(LogEventA, LogEventB).GetExpression());
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
            return $"AlternateSuccession(\"{LogEventA}\", \"{LogEventB}\")";
        }
    }
}