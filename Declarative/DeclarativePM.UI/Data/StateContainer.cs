using System;
using System.Collections.Generic;
using DeclarativePM.Lib.Models.DeclareModels;
using DeclarativePM.Lib.Models.LogModels;

namespace DeclarativePM.UI.Data
{
    public class StateContainer
    {
        public List<EventLog> EventLogs { get; } = new();
        public List<DeclareModel> DeclareModels { get; } = new();

        public event Action OnChange;

        private void NotifyStateChanged()
        {
            OnChange?.Invoke();
        }
    }
}