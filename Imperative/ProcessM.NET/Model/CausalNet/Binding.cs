using System.Collections.Generic;

namespace ProcessM.NET.Model.CausalNet
{
    /// <summary>
    /// Class which represents Binding in Causal net
    /// </summary>
    public class Binding : IBinding
    {
        /// <summary>
        /// Activities in AND relation
        /// </summary>
        public HashSet<int> Activities { get; }
        /// <summary>
        /// Frequency of binding
        /// </summary>
        public int Frequency { get; private set; }


        /// <param name="activities">Activities</param>
        /// <param name="frequency">frequency</param>
        public Binding(HashSet<int> activities, int frequency)
        {
            Activities = activities;
            Frequency = frequency;
        }

        /// <summary>
        /// Adds frequency based on value param
        /// </summary>
        /// <param name="value">frequency value</param>
        public void AddFrequency(int value)
        {
            Frequency += value;
        }
    }
}