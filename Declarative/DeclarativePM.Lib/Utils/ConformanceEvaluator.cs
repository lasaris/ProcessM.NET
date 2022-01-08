using System.Collections.Generic;
using System.Linq;
using DeclarativePM.Lib.Declare_Templates.AbstractClasses;
using DeclarativePM.Lib.Enums;
using DeclarativePM.Lib.Models.ConformanceModels;
using DeclarativePM.Lib.Models.DeclareModels;
using DeclarativePM.Lib.Models.LogModels;

namespace DeclarativePM.Lib.Utils
{
    public class ConformanceEvaluator
    {
        /// <summary>
        ///     Get all fulfilling activations from the activation tree.
        /// </summary>
        /// <param name="tree">Tree representing evaluation of constraint over some trace.</param>
        /// <returns>All fulfilling activations.</returns>
        public List<Event> GetFulfillment(ActivationBinaryTree tree)
        {
            return tree.Leaves
                .Where(x => x.MaxFulfilling)
                .Select(x => x.Subtrace)
                .Aggregate((x, y) => x
                    .Intersect(y, new EventEqualityComparer())
                    .ToList())
                .Where(x => tree.Constraint.IsActivation(x))
                .ToList();
        }

        /// <summary>
        ///     Get all violating activations from the activation tree.
        /// </summary>
        /// <param name="tree">Tree representing evaluation of constraint over some trace.</param>
        /// <returns>All violating activations.</returns>
        public List<Event> GetViolation(ActivationBinaryTree tree)
        {
            var all = tree.Leaves
                .Where(x => x.MaxFulfilling)
                .SelectMany(x => x.Subtrace);
            return tree.Leaves
                .SelectMany(x => x.Subtrace)
                .Except(all)
                .Where(x => tree.Constraint.IsActivation(x))
                .ToList();
        }

        /// <summary>
        ///     Get all conflicting activations from the activation tree.
        /// </summary>
        /// <param name="tree">Tree representing evaluation of constraint over some trace.</param>
        /// <returns>All conflicting activations.</returns>
        public List<Event> GetConflict(ActivationBinaryTree tree, List<Event> violations = null,
            List<Event> fulfilments = null)

        {
            violations ??= GetViolation(tree);
            fulfilments ??= GetFulfillment(tree);
            return tree.Leaves
                .Where(x => x.MaxFulfilling)
                .SelectMany(x => x.Subtrace)
                .Except(violations)
                .Except(fulfilments)
                .Where(x => tree.Constraint.IsActivation(x))
                .ToList();
        }

        /// <summary>
        ///     Get nodes (maximal subtraces) containing conflicting activation
        /// </summary>
        /// <param name="tree">Tree representing evaluation of constraint over some trace.</param>
        /// <param name="conflicts">
        ///     List of conflicting activations for which nodes should be returned.
        ///     If null, all conflicting nodes in the tree will be returned.
        /// </param>
        /// <returns>List of conflicting nodes</returns>
        public List<ActivationNode> GetConflictNodes(ActivationBinaryTree tree, List<Event> conflicts = null)
        {
            conflicts ??= GetConflict(tree);
            return GetNodesWith(tree, conflicts).ToList();
        }

        /// <summary>
        ///     Get nodes (maximal subtraces) containing violating activation
        /// </summary>
        /// <param name="tree">Tree representing evaluation of constraint over some trace.</param>
        /// <param name="conflicts">
        ///     List of violating activations for which nodes should be returned.
        ///     If null, all violating nodes in the tree will be returned.
        /// </param>
        /// <returns>List of violating nodes</returns>
        public List<ActivationNode> GetViolationNodes(ActivationBinaryTree tree, List<Event> violations = null)
        {
            violations ??= GetViolation(tree);
            return GetNodesWith(tree, violations).ToList();
        }

        /// <summary>
        ///     Get nodes (maximal subtraces) containing fulfilling activation
        /// </summary>
        /// <param name="tree">Tree representing evaluation of constraint over some trace.</param>
        /// <param name="conflicts">
        ///     List of fulfilling activations for which nodes should be returned.
        ///     If null, all fulfilling nodes in the tree will be returned.
        /// </param>
        /// <returns>List of fulfilling nodes</returns>
        public List<ActivationNode> GetFulfillNodes(ActivationBinaryTree tree, List<Event> fulfillments = null)
        {
            fulfillments ??= GetFulfillment(tree);
            return GetNodesWith(tree, fulfillments).ToList();
        }

        /// <summary>
        ///     Get nodes (maximal subtraces) containing given activation
        /// </summary>
        /// <param name="tree">Tree representing evaluation of constraint over some trace.</param>
        /// <param name="intr">List of activations for which corresponding nodes should be returned.</param>
        /// <returns>List of nodes containing at least one of activities from parameter intr</returns>
        private IEnumerable<ActivationNode> GetNodesWith(ActivationBinaryTree tree, List<Event> intr)
        {
            if (intr is null)
                return new List<ActivationNode>();
            return tree.Leaves.Where(node => !node.IsDead
                                             && node.MaxFulfilling
                                             && node.Subtrace.Intersect(intr).Any());
        }

        /// <summary>
        ///     Local likelihood of conflict resolutions (conflicting maximal subtrace).
        /// </summary>
        /// <param name="tree">Tree representing evaluation of constraint over some trace.</param>
        /// <param name="conflictResolution">List of conflicting leaves/subtraces</param>
        /// <returns>
        ///     Dictionary where key is conflicting resolution and value is its
        ///     local likelihood from interval (0, 1)
        /// </returns>
        public Dictionary<ActivationNode, double> LocalLikelihood(ActivationBinaryTree tree,
            List<ActivationNode> conflictResolution = null)
        {
            var conflicts = GetConflict(tree);
            conflictResolution ??= GetConflictNodes(tree, conflicts);

            var na = conflictResolution
                .Aggregate(0, (num, c) => num + c.Subtrace
                    .Count(tree.Constraint.IsActivation));
            return conflictResolution
                .ToDictionary(x => x, y => LocalLikelihoodNode(y, na, tree.Constraint));
        }

        public double LocalLikelihood(ActivationBinaryTree tree,
            ActivationNode conflictResolution)
        {
            var trace = tree.Leaves.Where(n => n.MaxFulfilling)
                .SelectMany(n => n.Subtrace)
                .Distinct(new EventEqualityComparer())
                .ToList();
            var nf = conflictResolution.Subtrace.Count(tree.Constraint.IsActivation);
            var na = trace.Count(tree.Constraint.IsActivation);

            return nf / (double) na;
        }

        private double LocalLikelihoodNode(ActivationNode node, int na, BiTemplate constraint)
        {
            return node.Subtrace.Count(constraint.IsActivation) / (double) na;
        }

        public double GlobalLikelihood(ActivationBinaryTree tree,
            List<ParametrizedTemplate> model, ActivationNode conflictResolution)
        {
            double result = 0;
            ActivationTreeBuilder treeBuilder = new();
            var kOfConflictActivations = GetConflict(tree);
            var constraints = model
                .Where(x => x.TemplateDescription.TemplateParametersType == TemplateTypes.BiTemplate)
                .SelectMany(x => x.TemplateInstances).Cast<BiTemplate>().ToList();

            foreach (var resolution in kOfConflictActivations)
            {
                var gama = 0;
                foreach (var constraint in constraints)
                {
                    var tempTree = treeBuilder.BuildTree(conflictResolution.Subtrace, constraint);
                    if (GetFulfillment(tempTree).Contains(resolution))
                        gama += 1;
                    else if (GetViolation(tempTree).Contains(resolution))
                        gama += 1;
                }

                result += gama;
            }

            return result / kOfConflictActivations.Count;
        }

        /// <summary>
        ///     Evaluates trace on a declare model
        /// </summary>
        /// <param name="model">Declare model towards which trace is to be checked</param>
        /// <param name="trace">Trace to be checked</param>
        /// <returns>Evaluation of trace for a model and each template and constraint in it.</returns>
        public TraceEvaluation EvaluateTrace(DeclareModel model, List<Event> trace)
        {
            var templateEvaluations = new List<TemplateEvaluation>();
            TraceEvaluation evaluation = new(trace, templateEvaluations);

            foreach (var template in model.Constraints)
            {
                if (template.TemplateDescription.TemplateParametersType != TemplateTypes.BiTemplate)
                    continue;

                var templateEvaluation = EvaluateTrace(template, trace);
                templateEvaluations.Add(templateEvaluation);
            }

            evaluation.UpdateHealthiness();
            return evaluation;
        }

        /// <summary>
        ///     Evaluates trace on a template
        /// </summary>
        /// <param name="template">Template towards which trace is to be checked</param>
        /// <param name="trace">Trace to be checked</param>
        /// <returns>Evaluation of trace for template and each constraint in it.</returns>
        public TemplateEvaluation EvaluateTrace(ParametrizedTemplate template, List<Event> trace)
        {
            if (template.TemplateDescription.TemplateParametersType != TemplateTypes.BiTemplate)
                return null;

            var constraintEvaluations = new List<ConstraintEvaluation>();
            TemplateEvaluation temp = new(constraintEvaluations, template);
            foreach (var constraint in template.TemplateInstances)
            {
                var constraintEvaluation = ConformTrace((BiTemplate) constraint, trace);
                constraintEvaluations.Add(constraintEvaluation);
            }

            temp.UpdateHealthiness();

            return temp;
        }

        /// <summary>
        ///     Evaluates trace on a constraint
        /// </summary>
        /// <param name="constraint">Constraint towards which trace is to be confirmed</param>
        /// <param name="trace">Trace to be checked</param>
        /// <returns>Conformance of trace for constraint.</returns>
        public ConstraintEvaluation ConformTrace(BiTemplate constraint, List<Event> trace)
        {
            ActivationTreeBuilder treeBuilder = new();
            var tree = treeBuilder.BuildTree(trace, constraint);
            var f = GetFulfillment(tree);
            var v = GetViolation(tree);
            var c = GetConflict(tree, v, f);
            var eventActivations =
                GetEventActivationTypes(trace, f, c, v);
            var healthiness = new Healthiness(tree, v.Count, f.Count, c.Count);

            return new ConstraintEvaluation(constraint, healthiness, eventActivations);
        }

        /// <summary>
        ///     Assigns activation type (fulfillment, conflict, violation, none) to
        ///     each event in provided list based on activation tree.
        /// </summary>
        /// <param name="tree">Tree representing evaluation of constraint over some trace.</param>
        /// <param name="events">Events to which type should be assigned.</param>
        /// <returns>Wrapped events from list events with assigned type.</returns>
        private List<WrappedEventActivation> GetEventActivationTypes(ActivationBinaryTree tree, List<Event> events)
        {
            var fulfilment = GetFulfillment(tree);
            var violation = GetViolation(tree);
            var conflict = GetConflict(tree, violation, fulfilment);

            return GetEventActivationTypes(events, fulfilment, conflict, violation);
        }

        /// <summary>
        ///     Assigns activation type (fulfillment, conflict, violation, none) to
        ///     each event in provided list based on its occurrence in list of activations, violations, and conflicts.
        /// </summary>
        /// <param name="events">Events to which type should be assigned.</param>
        /// <param name="fulfilment">Fulfillments</param>
        /// <param name="conflict">Conflicts</param>
        /// <param name="violation">Violations</param>
        /// <returns>Wrapped events from list events with assigned type.</returns>
        private List<WrappedEventActivation> GetEventActivationTypes(List<Event> events,
            List<Event> fulfilment, List<Event> conflict, List<Event> violation)
        {
            List<WrappedEventActivation> lst = new();
            foreach (var e in events)
                if (fulfilment.Contains(e, new EventEqualityComparer()))
                    lst.Add(new WrappedEventActivation(e, EventActivationType.Fulfilment));
                else if (conflict.Contains(e, new EventEqualityComparer()))
                    lst.Add(new WrappedEventActivation(e, EventActivationType.Conflict));
                else if (violation.Contains(e, new EventEqualityComparer()))
                    lst.Add(new WrappedEventActivation(e, EventActivationType.Violation));
                else
                    lst.Add(new WrappedEventActivation(e, EventActivationType.None));

            return lst;
        }
    }
}