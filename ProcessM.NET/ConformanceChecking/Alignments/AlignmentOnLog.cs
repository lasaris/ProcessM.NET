using System;
using System.Collections.Generic;
using ProcessM.NET.Model.BasicPetriNet;
using ProcessM.NET.Model.DataAnalysis;

namespace ProcessM.NET.ConformanceChecking.Alignments
{
    public class AlignmentOnLog : IAlignment
    {
        public double Fitness { get; private set; }
        public int TraceMoveCost { get; }
        public int ModelMoveCost { get; }
        public Dictionary<WorkflowTrace, Tuple<AlignmentOnTrace, int>> AlignmentsOnLog { get; }
        public double OptimalCost { get; private set; }
        public double WorstCost { get; private set; }

        public AlignmentOnLog(WorkflowLog workflowLog, PetriNet pNet, int traceMoveCost = 1, int modelMoveCost = 1)
        {
            TraceMoveCost = traceMoveCost;
            ModelMoveCost = modelMoveCost;
            AlignmentsOnLog = AlignmentUtils.OptimalAlignmentsOnLog(workflowLog, pNet, traceMoveCost, modelMoveCost);
            ComputeFitness();
        }

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
