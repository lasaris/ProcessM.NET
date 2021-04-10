using System.Collections.Generic;
using ProcessM.NET.Model.BasicPetriNet;
using ProcessM.NET.Model.DataAnalysis;
using ProcessM.NET.Model.SynchronousProductNet;

namespace ProcessM.NET.ConformanceChecking.Alignments
{
    public class AlignmentOnTrace : IAlignment
    {
        public double Fitness { get; set; }
        public List<STransition> Transitions { get; private set; }
        public int TraceMoveCost { get; set; }
        public int ModelMoveCost { get; set; }
        public double OptimalCost { get; set; }
        public double WorstCost { get; }

        public AlignmentOnTrace(WorkflowTrace trace, PetriNet pNet, int traceMoveCost = 1, int modelMoveCost = 1)
        {
            InitCosts(traceMoveCost, modelMoveCost);
            InitTransitionsAndOptimalCost(trace, pNet, traceMoveCost, modelMoveCost);
            WorstCost = AlignmentUtils.ComputeWorstCostOfTrace(trace, traceMoveCost) +
                        AlignmentUtils.ComputeWorstCostOfModel(pNet, modelMoveCost);
            ComputeFitness();
        }


        public AlignmentOnTrace(WorkflowTrace trace, PetriNet pNet, double worstCostOnModel, int traceMoveCost = 1, int modelMoveCost = 1)
        {
            InitCosts(traceMoveCost, modelMoveCost);
            InitTransitionsAndOptimalCost(trace, pNet, traceMoveCost, modelMoveCost);
            WorstCost = worstCostOnModel + AlignmentUtils.ComputeWorstCostOfTrace(trace, traceMoveCost);
            ComputeFitness();
        }

        private void InitCosts(int traceMoveCost, int modelMoveCost)
        {
            TraceMoveCost = traceMoveCost;
            ModelMoveCost = modelMoveCost;
        }

        private void InitTransitionsAndOptimalCost(WorkflowTrace trace, PetriNet pNet, int traceMoveCost, int modelMoveCost)
        {
            Transitions = AlignmentUtils.OptimalAlignmentOnTrace(trace, pNet, traceMoveCost, modelMoveCost);
            OptimalCost = AlignmentUtils.ComputeCostOfAlignment(Transitions);
        }

        private void ComputeFitness()
        {
            Fitness = 1 - OptimalCost / WorstCost;
        }
    }
}
