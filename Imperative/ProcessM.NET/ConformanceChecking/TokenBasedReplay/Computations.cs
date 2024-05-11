using LogImport.Models;
using ProcessM.NET.Model;
using ProcessM.NET.Model.DataAnalysis;

namespace ProcessM.NET.ConformanceChecking.TokenBasedReplay
{
    /// <summary>
    /// This class contains methods for computing token-based replay fitness of event log to a Petri Net.
    /// </summary>
    public static class Computations
    {
        /// <summary>
        /// Computes token-based replay fitness of given event log to a given Petri Net.
        /// </summary>
        /// <param name="eventLog">Event log to be replayed.</param>
        /// <param name="net">Petri net used for replaying given traces.</param>
        /// <returns>Fitness metric of given event log to given Petri Net.</returns>
        public static double ComputeFitness(WorkflowLog eventLog, IPetriNet net)
        {
            PetriNetTokenDiagnosticsOverlay netDiagnostics = new PetriNetTokenDiagnosticsOverlay(net);

            foreach (WorkflowTrace t in eventLog.WorkflowTraces)
            {
                netDiagnostics.ReplayTrace(t);
            }

            double sumProduced = 0;
            double sumConsumed = 0;
            double sumMissing = 0;
            double sumRemaining = 0;

            foreach (PlaceTokenDiagnosticsOverlay diagnostics in netDiagnostics.Diagnostics.Values)
            {
                sumProduced += diagnostics.Produced;
                sumConsumed += diagnostics.Consumed;
                sumMissing += diagnostics.Missing;
                sumRemaining += diagnostics.Remaining;
            }

            if (sumConsumed == 0 && sumProduced == sumRemaining && sumProduced == sumMissing) // this should only be true if compared log is 100% different from given Petri Net.
            {
                return 0.0;
            }

            return 0.5 * (1 - sumMissing / sumConsumed) + 0.5 * (1 - sumRemaining / sumProduced);
        }

        /// <summary>
        /// Computes token-based replay fitness of given event log to a given Petri Net.
        /// </summary>
        /// <param name="log">Event log to be replayed.</param>
        /// <param name="net">Petri net used for replaying given traces.</param>
        /// <returns>Fitness metric of given event log to given Petri Net.</returns>
        public static double ComputeFitness(ImportedEventLog log, IPetriNet net)
        {
            return ComputeFitness(new WorkflowLog(log), net);
        }
    }
}
