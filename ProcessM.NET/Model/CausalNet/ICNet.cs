using ProcessM.NET.Model.CausalNet;
using System;
using System.Collections.Generic;
using System.Text;

namespace ProcessM.NET.Model.CausalNet
{
    public interface ICNet
    {
        List<ICPlace> Activities { get; }

        ICPlace StartActivity { get; }

        ICPlace EndActivity { get; }
    }
}
