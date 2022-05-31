using System.Collections.Generic;
using DeclarativePM.Lib.Models.LogModels;

namespace DeclarativePM.Lib.Models.ConformanceModels
{
    /// <summary>
    ///     Represents a node in Activation binary tree and a subtrace of tree trace
    /// </summary>
    public class ActivationNode
    {
        public readonly List<Event> Subtrace;
        public bool IsDead;
        public ActivationNode Left;
        public bool MaxFulfilling;
        public ActivationNode Right;

        public ActivationNode(List<Event> subtrace)
        {
            Subtrace = subtrace;
        }

        public ActivationNode(ActivationNode left = null, ActivationNode right = null, bool isDead = false,
            bool fulfilling = false, List<Event> subtrace = null)
        {
            Left = left;
            Right = right;
            IsDead = isDead;
            MaxFulfilling = fulfilling;
            Subtrace = subtrace ?? new List<Event>();
        }

        public bool IsLeaf => Left is null && Right is null;
    }
}