using ProcessM.NET.Model.BasicPetriNet;
using ProcessM.NET.Model.CausalNet;
using ProcessM.NET.Model.DataAnalysis;
using System;
using System.Collections.Generic;
using System.Text;

namespace ProcessM.NET.Discovery.Heuristic_Miner
{
    public static class HeuristicMiner
    {
        public static CNet MakeCNet(WorkflowLog workflowLog, int minFreq, float minDependency, int minBind, int windowSize)
        {
            WorkflowLogUtil.WorkflowLogPreprocessor(workflowLog);
            return new CNet(workflowLog, minFreq, minDependency, minBind, windowSize);
        }
    }
}
