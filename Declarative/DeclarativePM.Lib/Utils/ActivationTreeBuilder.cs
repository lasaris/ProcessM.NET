using System.Collections.Generic;
using System.Linq;
using DeclarativePM.Lib.Declare_Templates;
using DeclarativePM.Lib.Declare_Templates.AbstractClasses;
using DeclarativePM.Lib.Models.ConformanceModels;
using DeclarativePM.Lib.Models.DeclareModels;
using DeclarativePM.Lib.Models.LogModels;

namespace DeclarativePM.Lib.Utils
{
    /// <summary>
    ///     Class for building an activation trees for conformance checking.
    /// </summary>
    public class ActivationTreeBuilder
    {
        /// <summary>
        ///     Builds an ActivationBinaryTree from a trace and a constraint.
        ///     Idea behind this algorithm is taken from
        ///     https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=6337271
        /// </summary>
        /// <param name="trace">Trace</param>
        /// <param name="constraint">Constraint</param>
        /// <returns></returns>
        public ActivationBinaryTree BuildTree(List<Event> trace, BiTemplate constraint)
        {
            trace = UtilMethods.PreprocessTraceForEvaluation(constraint, trace);
            ActivationBinaryTree tree = new(constraint);
            var id = 1;
            foreach (var e in trace)
            {
                e.ActivityInTraceId = id;
                id++;
                foreach (var leaf in tree.Leaves.ToList())
                {
                    if (leaf.IsDead)
                        continue;

                    if (constraint.IsActivation(e))
                    {
                        //left
                        ActivationNode left = new(leaf.Subtrace.ToList());
                        tree.AddNodeLeft(leaf, left);

                        //right
                        ActivationNode right = new(leaf.Subtrace.ToList());
                        right.Subtrace.Add(e);
                        tree.AddNodeRight(leaf, right);
                    }
                    else
                    {
                        leaf.Subtrace.Add(e);
                    }
                }
            }

            AssignLeavesStatus(tree.Leaves, constraint);

            return tree;
        }

        /// <summary>
        ///     Checks a set of leaves whether they fulfill the constraint and
        ///     assigns them dead status. Dead if they do no fulfill the constraint, true otherwise.
        /// </summary>
        /// <param name="nodes"></param>
        /// <param name="constraint"></param>
        private void AssignLeavesStatus(List<ActivationNode> nodes, BiTemplate constraint)
        {
            ConstraintEvaluator evaluator = new();
            LtlExpression expr;
            foreach (var leaf in nodes)
            {
                if (constraint is AlternateSuccession asu)
                    expr = asu.GetFinishingExpression();
                else if (constraint is AlternateResponse ar)
                    expr = ar.GetFinishingExpression();
                else
                    expr = constraint.GetExpression();
                leaf.IsDead = !evaluator
                    .EvaluateExpression(leaf.Subtrace, expr);
            }

            var maxFulfillingSubtraces = GetMaximalFulfillingSubtraces(nodes);
            foreach (var node in maxFulfillingSubtraces) node.MaxFulfilling = true;
        }

        /// <summary>
        ///     From set of subtraces chooses those which are maximal fulfilling in the given set.
        /// </summary>
        /// <param name="nodes">Nodes containing subtraces</param>
        /// <returns>Nodes containing maximal fulfilling subtraces</returns>
        private List<ActivationNode> GetMaximalFulfillingSubtraces(List<ActivationNode> nodes)
        {
            Queue<ActivationNode> fifo = new(nodes
                .Where(node => !node.IsDead)
                .OrderByDescending(x => x.Subtrace.Count));
            if (fifo.Count == 0)
                return new List<ActivationNode>();
            var longest = fifo.Dequeue();
            List<ActivationNode> result = new();
            var counter = fifo.Count;

            while (fifo.Count > 0)
            {
                var candidate = fifo.Dequeue();
                counter--;

                if (!IsSubtrace(new Stack<Event>(longest.Subtrace), new Stack<Event>(candidate.Subtrace)))
                    fifo.Enqueue(candidate);

                if (counter == 0)
                {
                    result.Add(longest);
                    fifo.TryDequeue(out longest);
                    counter = fifo.Count;
                }
            }

            if (longest is not null && !result.Contains(longest))
                result.Add(longest);

            return result;
        }

        /// <summary>
        ///     Returns bool whether b is subtrace of a.
        /// </summary>
        /// <param name="a">Trace a</param>
        /// <param name="b">Trace b</param>
        /// <returns></returns>
        private bool IsSubtrace(Stack<Event> a, Stack<Event> b)
        {
            if (a.Count < b.Count)
                return false;

            while (a.Count > 0 && b.Count > 0)
            {
                if (a.Peek().Activity.Equals(b.Peek().Activity) &&
                    a.Peek().ActivityInTraceId == b.Peek().ActivityInTraceId)
                {
                    a.Pop();
                    b.Pop();
                    continue;
                }

                a.Pop();
            }

            return b.Count == 0;
        }
    }
}