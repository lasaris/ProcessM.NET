using ProcessM.NET.Model.CausalNet;
using ProcessM.NET.Model.DataAnalysis;

namespace ProcessM.NET.Discovery.HeuristicMiner
{
    public static class HeuristicMiner
    {
        public static CNet MineCNet(WorkflowLog workflowLog, HeuristicMinerSettings heuristicsMinerSettings)
        {
            //Preprocessing the log; each trace starts with same activity and ends with same activity
            WorkflowLogUtils.WorkflowLogPreprocessor(workflowLog);
            return new CNet(workflowLog, heuristicsMinerSettings);
        }

        public static CNet MineCNet(WorkflowLog workflowLog)
        {
            return MineCNet(workflowLog, new HeuristicMinerSettings());
        }
    }
}
