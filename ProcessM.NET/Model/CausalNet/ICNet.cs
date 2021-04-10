using ProcessM.NET.Model.CausalNet;
using System;
using System.Collections.Generic;
using System.Text;

namespace ProcessM.NET.Model.CausalNet
{
    public interface ICNet
    {
        List<CPlace> Activities { get; }

        CPlace StartActivity { get; }

        CPlace EndActivity { get; }
    }
}
