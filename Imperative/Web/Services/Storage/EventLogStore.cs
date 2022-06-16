using BakaMining.Models;
using TG.Blazor.IndexedDB;

namespace BakaMining.Services.Storage
{
    public class EventLogStore : Store<EventLogFile>
    {
        public EventLogStore(IndexedDBManager dbManager) : base(dbManager, Enums.Storename.EventLogFile) {}
    }
}