using System.Collections.Generic;

namespace ProcessM.NET.Model.CausalNet
{
    public interface IBinding
    {
        HashSet<int> Activities { get; }
        int Frequency { get; }

        void AddFrequency(int val);
    }
}