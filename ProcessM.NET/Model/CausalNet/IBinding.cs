using System;
using System.Collections.Generic;
using System.Text;

namespace ProcessM.NET.Model.CausalNet
{
    public interface IBinding
    {
        HashSet<string> Activities { get; }
        int Frequency { get; }

        void AddFrequency();
    }
}
