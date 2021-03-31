using System;
using System.Collections.Generic;
using System.Text;

namespace ProcessM.NET.Model.CausalNet
{
    public class CPlace : IPlace
    {
        public string Id { get; }

        public CPlace(string id)
        {
            Id = id;
        }

        public bool Equals(IPlace other)
        {
            return other != null && Id == other.Id;
        }

        public override bool Equals(object obj)
        {
            if (ReferenceEquals(null, obj)) return false;
            if (ReferenceEquals(this, obj)) return true;
            if (obj.GetType() != this.GetType()) return false;
            return Equals((IPlace) obj);
        }
    }
}
