using System.Collections.Generic;

namespace ProcessM.NET.Model.CausalNet
{
    public class Binding : IBinding
    {
        public HashSet<int> Activities { get; }
        public int Frequency { get; private set; }

        public Binding(HashSet<int> activities, int frequency)
        {
            Activities = activities;
            Frequency = frequency;
        }

        public void AddFrequency(int value)
        {
            Frequency += value;
        }
    }
}