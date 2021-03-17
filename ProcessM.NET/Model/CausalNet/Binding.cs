using System;
using System.Collections.Generic;
using System.Text;

namespace ProcessM.NET.Model.CausalNet
{
    public class Binding : IBinding
    {
        public HashSet<string> Activities { get; }
        public int Frequency { get; private set; } = 0;

        public Binding(HashSet<string> activities)
        {
            Activities = activities;
        }

        public void AddFrequency()
        {
            Frequency++;
        }
    }
}
