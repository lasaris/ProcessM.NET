using ProcessM.NET.Model.BasicPetriNet;
using ProcessM.NET.Model.CausalNet;
using ProcessM.NET.Model.DataAnalysis;

namespace ProcessM.NET.Discovery.HeuristicMiner
{
    /// <summary>
    /// Static class which represents Heuristic miner
    /// </summary>
    public static class HeuristicMiner
    {
        /// <summary>
        /// Mine Causal net from a workflow log based on given settings
        /// </summary>
        /// <param name="workflowLog">Workflow log</param>
        /// <param name="heuristicsMinerSettings">Heuristic miner settings</param>
        /// <returns>Causal net</returns>
        public static CNet MineCNet(WorkflowLog workflowLog, HeuristicMinerSettings heuristicsMinerSettings)
        {
            //Preprocessing the log; each trace starts with same activity and ends with same activity
            WorkflowLogUtils.WorkflowLogPreprocessor(workflowLog);
            return new CNet(workflowLog, heuristicsMinerSettings);
        }

        /// <summary>
        /// Mine causal net from a workflow log based on default settings
        /// </summary>
        /// <param name="workflowLog">Workflow log</param>
        /// <returns>Causal net</returns>
        public static CNet MineCNet(WorkflowLog workflowLog)
        {
            return MineCNet(workflowLog, new HeuristicMinerSettings());
        }

        /// <summary>
        /// Mine Petri net from a workflow log based on given settings
        /// </summary>
        /// <param name="workflowLog">Workflow log</param>
        /// <param name="heuristicMinerSettings">Heuristic miner settings</param>
        /// <returns></returns>
        public static PetriNet MinePetriNet(WorkflowLog workflowLog, HeuristicMinerSettings heuristicMinerSettings)
        {
            return CNetUtils.ConvertCNetToPetriNet(MineCNet(workflowLog, heuristicMinerSettings));
        }

        /// <summary>
        /// Mine Petri net from a workflow log based on default settings
        /// </summary>
        /// <param name="workflowLog">Workflow log</param>
        /// <returns>Causal net</returns>
        public static PetriNet MinePetriNet(WorkflowLog workflowLog)
        {
            return MinePetriNet(workflowLog, new HeuristicMinerSettings());
        }
    }
}
