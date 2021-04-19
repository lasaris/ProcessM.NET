using System.Collections.Generic;
using ProcessM.NET.Model.BasicPetriNet;
using ProcessM.NET.Model.DataAnalysis;
using ProcessM.NET.Model.SynchronousProductNet;

namespace ProcessM.NET.ConformanceChecking.Alignments
{
    /// <summary>
    /// Class which represents conformance checking based on alignments for a trace and a Petri Net
    /// </summary>
    public class AlignmentOnTrace : IAlignment
    {
        /// <summary>
        /// Fitness of the trace
        /// </summary>
        public double Fitness { get; set; }
        /// <summary>
        /// Alignment
        /// </summary>
        public List<STransition> Transitions { get; private set; }
        /// <summary>
        /// Move cost of the trace
        /// </summary>
        public int TraceMoveCost { get; set; }
        /// <summary>
        /// Move cost of 
        /// </summary>
        public int ModelMoveCost { get; set; }
        /// <summary>
        /// Optimal cost of the alignment on the trace
        /// </summary>
        public double OptimalCost { get; set; }
        /// <summary>
        /// Worst cost of the alignment on the trace
        /// </summary>
        public double WorstCost { get; }


        /// <param name="trace">Workflow trace</param>
        /// <param name="pNet">Petri net</param>
        /// <param name="traceMoveCost">Trace move cost</param>
        /// <param name="modelMoveCost">Model move cost</param>
        public AlignmentOnTrace(WorkflowTrace trace, PetriNet pNet, int traceMoveCost = 1, int modelMoveCost = 1)
        {
            InitCosts(traceMoveCost, modelMoveCost);
            InitTransitionsAndOptimalCost(trace, pNet, traceMoveCost, modelMoveCost);
            WorstCost = AlignmentUtils.ComputeWorstCostOfTrace(trace, traceMoveCost) +
                        AlignmentUtils.ComputeWorstCostOfModel(pNet, modelMoveCost);
            ComputeFitness();
        }

        /// <param name="trace">Workflow trace</param>
        /// <param name="pNet">Petri net</param>
        /// <param name="worstCostOnModel">Worst cost on the model</param>
        /// <param name="traceMoveCost">Trace move cost</param>
        /// <param name="modelMoveCost">Model move cost</param>
        public AlignmentOnTrace(WorkflowTrace trace, PetriNet pNet, double worstCostOnModel, int traceMoveCost = 1, int modelMoveCost = 1)
        {
            InitCosts(traceMoveCost, modelMoveCost);
            InitTransitionsAndOptimalCost(trace, pNet, traceMoveCost, modelMoveCost);
            WorstCost = worstCostOnModel + AlignmentUtils.ComputeWorstCostOfTrace(trace, traceMoveCost);
            ComputeFitness();
        }

        /// <summary>
        /// Initialize Trace and Move cost
        /// </summary>
        /// <param name="traceMoveCost">Trace move cost</param>
        /// <param name="modelMoveCost">Model move cost</param>
        private void InitCosts(int traceMoveCost, int modelMoveCost)
        {
            TraceMoveCost = traceMoveCost;
            ModelMoveCost = modelMoveCost;
        }


        /// <summary>
        /// Initialize Transitions and OptimalCost
        /// </summary>
        /// <param name="trace">Workflow trace</param>
        /// <param name="pNet">Petri net</param>
        /// <param name="traceMoveCost">Trace move cost</param>
        /// <param name="modelMoveCost">Model move cost</param>
        private void InitTransitionsAndOptimalCost(WorkflowTrace trace, PetriNet pNet, int traceMoveCost, int modelMoveCost)
        {
            Transitions = AlignmentUtils.OptimalAlignmentOnTrace(trace, pNet, traceMoveCost, modelMoveCost);
            OptimalCost = AlignmentUtils.ComputeCostOfAlignment(Transitions);
        }

        /// <summary>
        /// Compute fitness of the trace and the Petri net
        /// </summary>
        private void ComputeFitness()
        {
            Fitness = 1 - OptimalCost / WorstCost;
        }
    }
}
