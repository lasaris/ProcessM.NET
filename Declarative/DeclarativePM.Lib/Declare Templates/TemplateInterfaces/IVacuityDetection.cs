using DeclarativePM.Lib.Models.DeclareModels;

namespace DeclarativePM.Lib.Declare_Templates.TemplateInterfaces
{
    /// <summary>
    ///     Interface for vacuity detection.
    ///     Usually relational and not relational templates implement this interface.
    ///     Ensures that constraint was activated and not fulfilled trivially
    /// </summary>
    public interface IVacuityDetection
    {
        /// <summary>
        ///     Gets vacuity condition which ensures that a constraint was activated at least once
        /// </summary>
        /// <returns>Ltl expression representing vacuity condition</returns>
        public LtlExpression GetVacuityCondition();

        /// <summary>
        ///     Witness expression is a constraint expression enhanced with vacuity condition,
        ///     which ensures that constraint was activated at least once,
        ///     and so was not trivially fulfilled
        /// </summary>
        /// <returns>Ltl expression representing constraint enhanced with vacuity condition</returns>
        public LtlExpression GetWitnessExpression();
    }
}