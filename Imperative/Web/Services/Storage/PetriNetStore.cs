using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BakaMining.Models;
using TG.Blazor.IndexedDB;

namespace BakaMining.Services.Storage
{
    public class PetriNetStore : Store<PetriNetFile>
    {
        public PetriNetStore(IndexedDBManager dbManager) : base(dbManager, Enums.Storename.PetriNetFile) {}
    }
}