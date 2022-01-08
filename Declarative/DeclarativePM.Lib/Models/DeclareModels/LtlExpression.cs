using System;
using System.Reflection;
using DeclarativePM.Lib.Enums;

namespace DeclarativePM.Lib.Models.DeclareModels
{
    /// <summary>
    ///     Recursive Ltl (Linear temporal logic) expression
    /// </summary>
    public class LtlExpression
    {
        /// <summary>
        ///     Constructor for Ltl expression for unary operators
        /// </summary>
        /// <param name="operator">Unary operator</param>
        /// <param name="inner"></param>
        /// <exception cref="TargetParameterCountException">Operator provided was not unary</exception>
        public LtlExpression(Operators @operator, LtlExpression inner)
        {
            if ((int) @operator > 31)
                throw new TargetParameterCountException("Unary operators take only 1 expression as parameter");
            Operator = @operator;
            InnerLeft = inner;
        }

        /// <summary>
        ///     Constructor for Ltl expression for binary operators
        /// </summary>
        /// <param name="operator">Binary operator</param>
        /// <param name="innerLeft"></param>
        /// <param name="innerRight"></param>
        public LtlExpression(Operators @operator, LtlExpression innerLeft, LtlExpression innerRight)
        {
            Operator = @operator;
            InnerLeft = innerLeft;
            InnerRight = innerRight;
        }

        public LtlExpression(string atom)
        {
            Operator = Operators.None;
            Atom = atom;
        }

        public Operators Operator { get; }

        /// <summary>
        ///     Default expression when dealing with unary operator.
        ///     Null when atomic expression.
        /// </summary>
        public LtlExpression InnerLeft { get; set; }

        /// <summary>
        ///     Null when dealing with unary operator or atomic expression
        /// </summary>
        public LtlExpression InnerRight { get; set; }

        public string Atom { get; }

        public override string ToString()
        {
            return Operator switch
            {
                Operators.None => Atom,
                Operators.Not => $"!({InnerLeft})",
                Operators.Next => $"next({InnerLeft})",
                Operators.Subsequent => $"subsequent({InnerLeft})",
                Operators.Eventual => $"Eventual({InnerLeft})",
                Operators.And => $"({InnerLeft} && {InnerRight})",
                Operators.Or => $"({InnerLeft} || {InnerRight})",
                Operators.Imply => $"({InnerLeft} => {InnerRight})",
                Operators.Equivalence => $"({InnerLeft} <=> {InnerRight})",
                Operators.Least => $"({InnerLeft} U {InnerRight})",
                _ => throw new ArgumentOutOfRangeException()
            };
        }
    }
}