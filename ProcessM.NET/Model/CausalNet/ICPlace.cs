using System;
using System.Collections.Generic;
using System.Text;

namespace ProcessM.NET.Model.CausalNet
{
    public class ICPlace : IPlace
    {
        public string Id { get; }

        public ICPlace(string id)
        {
            Id = id;
        }
    }
}
