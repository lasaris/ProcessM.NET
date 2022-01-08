using DeclarativePM.Lib.Models.DeclareModels;

namespace DeclarativePM.Lib.Declare_Templates.TemplateInterfaces
{
    /// <summary>
    ///     Represents an LTL (Linear temporal logic) template
    /// </summary>
    public interface ITemplate
    {
        /// <summary>
        /// </summary>
        /// <returns>LTL expression representing the constraint</returns>
        public LtlExpression GetExpression();

        /// <summary>
        ///     Finishing expression has in case of some templates additional check, that it was "deactivated"
        ///     after its activation
        /// </summary>
        /// <returns>LTL expression representing the constraint</returns>
        public LtlExpression GetFinishingExpression()
        {
            return GetExpression();
        }
    }
}