using System;
using System.Collections.Generic;
using System.Text;
using ProcessM.NET.Model.BasicPetriNet;
using ProcessM.NET.Model.DataAnalysis;
using ProcessM.NET.Model.SynchronousProductNet;

namespace ProcessM.NET.ConformanceChecking.Alignments
{
    public class AlignmentOnNets : IAlignment
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
        /// Move cost of the pNet1
        /// </summary>
        public int TraceMoveCost { get; set; }
        /// <summary>
        /// Move cost of the pNet2
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

        /// <param name="pNet1">Petri net</param>
        /// <param name="pNet2">Petri net</param>
        /// <param name="pNet1MoveCost">Trace move cost</param>
        /// <param name="pNet2MoveCost">Model move cost</param>
        public AlignmentOnNets(PetriNet pNet1, PetriNet pNet2, int pNet1MoveCost = 1, int pNet2MoveCost = 1)
        {
            DistinguishPlacesAndTransitions(pNet1);
            InitCosts(pNet1MoveCost, pNet2MoveCost);
            InitTransitionsAndOptimalCost(pNet1, pNet2, pNet1MoveCost, pNet2MoveCost);
            WorstCost = AlignmentUtils.ComputeWorstCostOfModel(pNet1, pNet1MoveCost) +
                        AlignmentUtils.ComputeWorstCostOfModel(pNet2, pNet2MoveCost);
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

        private void DistinguishPlacesAndTransitions(PetriNet pNet)
        {
            foreach (var place in pNet.Places)
                place.Id += '\'';
            foreach (var transition in pNet.Transitions)
                transition.Id += '\'';
        }


        /// <summary>
        /// Initialize Transitions and OptimalCost
        /// </summary>
        /// <param name="trace">Workflow trace</param>
        /// <param name="pNet">Petri net</param>
        /// <param name="traceMoveCost">Trace move cost</param>
        /// <param name="modelMoveCost">Model move cost</param>
        private void InitTransitionsAndOptimalCost(PetriNet pNet1, PetriNet pNet2, int pNet1MoveCost, int pNet2MoveCost)
        {
            Transitions = AlignmentUtils.OptimalAlignmentOnNets(pNet1, pNet2, pNet1MoveCost, pNet2MoveCost);
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
