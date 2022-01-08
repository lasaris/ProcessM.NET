using System.Collections.Generic;
using DeclarativePM.Lib.Declare_Templates.AbstractClasses;

namespace DeclarativePM.Lib.Models.ConformanceModels
{
    /// <summary>
    ///     Represents a tree of activations obtained after conformance checking of a trace on a constraint
    /// </summary>
    public class ActivationBinaryTree
    {
        public ActivationBinaryTree(BiTemplate constraint)
        {
            Root = new ActivationNode();
            Leaves = new List<ActivationNode>() {Root};
            Constraint = constraint;
        }

        public ActivationNode Root { get; set; }
        public List<ActivationNode> Leaves { get; }
        public BiTemplate Constraint { get; }

        /// <summary>
        ///     Add a new node on the left of current leaf node and updates list of leaves
        /// </summary>
        /// <param name="current">Leaf not to which we want append</param>
        /// <param name="node">Node to append</param>
        public void AddNodeLeft(ActivationNode current, ActivationNode node)
        {
            if (current == node)
                return;
            current.Left = node;
            UpdateLeavesList(current, node);
        }

        /// <summary>
        ///     Add a new node on the right of current leaf node and updates list of leaves
        /// </summary>
        /// <param name="current">Leaf not to which we want append</param>
        /// <param name="node">Node to append</param>
        public void AddNodeRight(ActivationNode current, ActivationNode node)
        {
            if (current == node)
                return;
            current.Right = node;
            UpdateLeavesList(current, node);
        }

        /// <summary>
        ///     Removes current from leaves list and adds node there instead
        /// </summary>
        /// <param name="current"></param>
        /// <param name="node"></param>
        private void UpdateLeavesList(ActivationNode current, ActivationNode node)
        {
            if (!Leaves.Contains(node))
                Leaves.Add(node);
            Leaves.Remove(current);
        }
    }
}