using System;
using System.Collections.Generic;
using System.Text;

namespace ProcessM.NET.Model.CausalNet
{
    public class CPlace : ICPlace
    {
        public int Id { get; }
        public int Frequency { get; }

        public CPlace(int id, int frequency)
        {
            Id = id;
            Frequency = frequency;
        }
    }
}