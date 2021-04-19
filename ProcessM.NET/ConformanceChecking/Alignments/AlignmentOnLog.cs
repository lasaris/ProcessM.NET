using System;
using System.Collections.Generic;
using ProcessM.NET.Model.BasicPetriNet;
using ProcessM.NET.Model.DataAnalysis;

namespace ProcessM.NET.ConformanceChecking.Alignments
{
    /// <summary>
    /// A class that represents Conformance checking based on alignments for an event log and a Petri Net
    /// </summary>
    public class AlignmentOnLog : IAlignment
    {
        /// <summary>
        /// Fitness of the event log
        /// </summary>
        public double Fitness { get; private set; }
        /// <summary>
        /// Cost of move on the trace
        /// </summary>
        public int TraceMoveCost { get; }
        /// <summary>
        /// Cost of move on th emodel
        /// </summary>
        public int ModelMoveCost { get; }
        /// <summary>
        /// Dictionary which store Traces with their Alignment based on the trace and occurrence of the trace
        /// </summary>
        public Dictionary<WorkflowTrace, Tuple<AlignmentOnTrace, int>> AlignmentsOnLog { get; }
        /// <summary>
        /// Optimal cost of the event log
        /// </summary>
        public double OptimalCost { get; private set; }
        /// <summary>
        /// Worst cost of the event log
        /// </summary>
        public double WorstCost { get; private set; }


        /// <param name="workflowLog">Workflow log</param>
        /// <param name="pNet">Petri net</param>
        /// <param name="traceMoveCost">Trace move cost</param>
        /// <param name="modelMoveCost">Model move cost</param>
        public AlignmentOnLog(WorkflowLog workflowLog, PetriNet pNet, int traceMoveCost = 1, int modelMoveCost = 1)
        {
            TraceMoveCost = traceMoveCost;
            ModelMoveCost = modelMoveCost;
            AlignmentsOnLog = AlignmentUtils.OptimalAlignmentsOnLog(workflowLog, pNet, traceMoveCost, modelMoveCost);
            ComputeFitness();
        }

        /// <summary>
        /// Method for computing the fitness of the event log
        /// </summary>
        private void ComputeFitness()
        {
            foreach (var (_, (alignment, count)) in AlignmentsOnLog)
            {
                OptimalCost += alignment.OptimalCost * count;
                WorstCost += alignment.WorstCost * count;
            }

            Fitness = 1 - OptimalCost / WorstCost;
        }
    }
}
