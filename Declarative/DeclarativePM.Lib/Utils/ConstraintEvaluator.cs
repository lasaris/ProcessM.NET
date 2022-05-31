using System;
using System.Collections.Generic;
using DeclarativePM.Lib.Declare_Templates;
using DeclarativePM.Lib.Declare_Templates.TemplateInterfaces;
using DeclarativePM.Lib.Enums;
using DeclarativePM.Lib.Models.DeclareModels;
using DeclarativePM.Lib.Models.LogModels;

namespace DeclarativePM.Lib.Utils
{
    public class ConstraintEvaluator
    {
        /// <summary>
        ///     Evaluates whether expression holds for the case.
        ///     The main idea taken from https://link.springer.com/content/pdf/10.1007%2F11575771_11.pdf
        /// </summary>
        /// <param name="events">Sorted list of event in a case.</param>
        /// <param name="expression">Expression to be evaluated.</param>
        /// <param name="position">Starting position from which we start the evaluation.</param>
        /// <returns>Bool whether expression holds.</returns>
        /// <exception cref="ArgumentOutOfRangeException">Expression contains undefined operator.</exception>
        public bool EvaluateExpression(List<Event> events, LtlExpression expression, int position = 0)
        {
            if (position >= events.Count)
                return false;

            switch (expression.Operator)
            {
                case Operators.None:
                    return events[position].Activity == expression.Atom;

                case Operators.Not:
                    return !EvaluateExpression(events, expression.InnerLeft, position);

                case Operators.Next:
                    if (position >= 0 && position < events.Count - 1)
                        return EvaluateExpression(events, expression.InnerLeft, position + 1);

                    return false;

                case Operators.Subsequent:
                    if (position >= 0 && position < events.Count - 1)
                        return EvaluateExpression(events, expression.InnerLeft, position) &&
                               EvaluateExpression(events, expression, position + 1);

                    return EvaluateExpression(events, expression.InnerLeft, position);

                case Operators.Eventual:
                    if (position >= 0 && position < events.Count - 1)
                        return EvaluateExpression(events, expression.InnerLeft, position) ||
                               EvaluateExpression(events, expression, position + 1);

                    return EvaluateExpression(events, expression.InnerLeft, position);

                case Operators.And:
                    return EvaluateExpression(events, expression.InnerLeft, position) &&
                           EvaluateExpression(events, expression.InnerRight, position);

                case Operators.Or:
                    return EvaluateExpression(events, expression.InnerLeft, position) ||
                           EvaluateExpression(events, expression.InnerRight, position);

                case Operators.Imply:
                    return !EvaluateExpression(events, expression.InnerLeft, position) ||
                           EvaluateExpression(events, expression.InnerRight, position);

                case Operators.Equivalence:
                    var a = EvaluateExpression(events, expression.InnerLeft, position);
                    var b = EvaluateExpression(events, expression.InnerRight, position);
                    return a && b || !a && !b;

                case Operators.Least:
                    if (position >= 0 && position < events.Count - 1)
                        return EvaluateExpression(events, expression.InnerRight, position) ||
                               EvaluateExpression(events, expression.InnerLeft, position) &&
                               EvaluateExpression(events, expression, position + 1);

                    return EvaluateExpression(events, expression.InnerLeft, position) ||
                           EvaluateExpression(events, expression.InnerRight, position);

                default:
                    throw new ArgumentOutOfRangeException();
            }
        }

        /// <summary>
        ///     Evaluates whether trace is complaint with the the constraint.
        /// </summary>
        /// <param name="events">A trace for evaluation</param>
        /// <param name="template">constraint for evaluation</param>
        /// <param name="preprocessing">
        ///     Some expressions need preprocessing for strict evaluation.
        ///     This involves mainly expressions containing precedence. True to preprocess, False otherwise.
        /// </param>
        /// <returns></returns>
        public bool EvaluateConstraint(List<Event> events, ITemplate template,
            bool preprocessing = true)
        {
            var expr = template switch
            {
                AlternateResponse ar => ar.GetFinishingExpression(),
                AlternateSuccession asu => asu.GetFinishingExpression(),
                _ => template.GetExpression()
            };

            if (expr is null)
                return false;
            if (preprocessing)
                events = UtilMethods.PreprocessTraceForEvaluation(template, events);
            return EvaluateExpression(events, expr);
        }
    }
}