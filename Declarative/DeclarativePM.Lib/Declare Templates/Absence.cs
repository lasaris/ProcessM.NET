using System;
using DeclarativePM.Lib.Declare_Templates.AbstractClasses;
using DeclarativePM.Lib.Enums;
using DeclarativePM.Lib.Models.DeclareModels;

namespace DeclarativePM.Lib.Declare_Templates
{
    /// <summary>
    ///     LTL Absence template
    ///     A occurs at most n - 1 times
    ///     !existence(n, a)
    /// </summary>
    public class Absence : ExistenceTemplate
    {
        public Absence(int occurrences, string logEvent) : base(occurrences, logEvent)
        {
            if (occurrences < 1)
                throw new ArgumentException("Absence template parameter occurrences has to be higher or equal 1");
        }

        public override LtlExpression GetExpression()
        {
            //!existence(n, a)
            return new(Operators.Not, new Existence(Occurrences, LogEvent).GetExpression());
        }

        public override string ToString()
        {
            return $"Absence({Occurrences}, \"{LogEvent}\")";
        }
    }
}