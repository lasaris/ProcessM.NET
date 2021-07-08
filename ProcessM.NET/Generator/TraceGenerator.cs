using ProcessM.NET.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace ProcessM.NET.Generator
{
    /// <summary>
    /// Handler to a simple recursive generator of traces from given Petri net of given maximum length.
    /// </summary>
    public class TraceGenerator
    {
        /// <summary>
        /// Petri net from which traces should be generated.
        /// </summary>
        private IPetriNet Net { get; }

        /// <summary>
        /// Maximum length of generated traces (necessary for Petri nets with cycles).
        /// </summary>
        private int MaxLength { get; }

        /// <summary>
        /// Looks for all transitions which can fire in the Petri net given a certain marking of places with tokens.
        /// </summary>
        /// <param name="marking">Token marking of places of the Petri net.</param>
        /// <returns>List of all transitions which can fire in given marking.</returns>
        private List<ITransition> CanFire(int[] marking)
        {
            var fireableTransitions = new List<ITransition>();

            foreach (ITransition transition in Net.Transitions)
            {
                bool allMarked = true;
                foreach (IPlace inputPlace in transition.InputPlaces)
                {
                    if (marking[Net.Places.IndexOf(inputPlace)] == 0)
                    {
                        allMarked = false;
                        break;
                    }
                }

                if (allMarked)
                {
                    fireableTransitions.Add(transition);
                }
            }

            return fireableTransitions;
        }

        /// <summary>
        /// Calculates a new marking from an old one by subtracting tokens from given input places 
        /// and incrementing tokens in given output places.
        /// </summary>
        /// <param name="inputPlaces">Enumerable collection of input places.</param>
        /// <param name="outputPlaces">Enumerable collection of output places.</param>
        /// <param name="originalMarking">Original token marking of places in the Petri net.</param>
        /// <returns></returns>
        private int[] RecalculateMarking(IEnumerable<IPlace> inputPlaces, IEnumerable<IPlace> outputPlaces, 
            int[] originalMarking)
        {
            int[] newMarking = new int[originalMarking.Length];
            originalMarking.CopyTo(newMarking, 0);
            
            foreach (IPlace ip in inputPlaces)
            {
                newMarking[Net.Places.IndexOf(ip)]--;
            }

            foreach (IPlace op in outputPlaces)
            {
                newMarking[Net.Places.IndexOf(op)]++;
            }

            return newMarking;
        }

        /// <summary>
        /// Checks whether a given marking is an empty marking (contains tokens only in end place).
        /// </summary>
        /// <param name="marking">Token marking of places in the Petri net.</param>
        /// <returns>True if given marking is empty. Otherwise returns false.</returns>
        private bool MarkingIsEmpty(int[] marking)
        {
            int endPlaceIndex = Net.Places.IndexOf(Net.EndPlace);

            for (int i = 0; i < marking.Length; ++i)
            {
                if (i == endPlaceIndex)
                {
                    continue;
                }
                if (marking[i] > 0)
                {
                    return false;
                }
            }

            return true;
        }

        /// <summary>
        /// "Fires" given transition - adds its activity to a corresponding trace a accordingly reassigns tokens in the Petri net.
        /// It then recursively "fires" all transitions which can be fired in the new marking.
        /// If a trace reaches its end (marking becomes empty) or if a length limit is reached or the marking becomes invalid, 
        /// the recursion is stopped.
        /// All valid traces are continuously being added to a set of traces.
        /// </summary>
        /// <param name="transition">Transition which should be fired in this step.</param>
        /// <param name="marking">Token marking of places in the Petri net in this step.</param>
        /// <param name="currentTrace">Trace of activities which have been accumulated so far.</param>
        /// <param name="traces">A set of valid, finished traces.</param>
        private void Fire(ITransition transition, int[] marking, 
            List<string> currentTrace, ref HashSet<List<string>> traces)
        {
            currentTrace.Add(transition.Activity);
            int[] newMarking = RecalculateMarking(transition.InputPlaces, transition.OutputPlaces, marking);

            List<ITransition> fireable = CanFire(newMarking);

            if (currentTrace.Count > MaxLength || (fireable.Count == 0 && !MarkingIsEmpty(newMarking)))
            {
                return;
            }
            
            if (MarkingIsEmpty(newMarking))
            {
                traces.Add(currentTrace);
                return;
            }

            foreach (ITransition t in fireable)
            {
                int[] markingCopy = new int[newMarking.Length];
                newMarking.CopyTo(markingCopy, 0);
                Fire(t, markingCopy, new List<string>(currentTrace), ref traces);
            }
        }

        /// <summary>
        /// Recursively generates possible traces of given Petri net and of given maximum length.
        /// </summary>
        /// <returns>A set of valid, finished traces of activities of given maximum length.</returns>
        public HashSet<List<string>> GenerateTraces()
        {
            var traces = new HashSet<List<string>>();

            int[] initialMarking = new int[Net.Places.Count];
            initialMarking[Net.Places.IndexOf(Net.StartPlace)] = 1;

            foreach (ITransition transition in CanFire(initialMarking))
            {
                Fire(transition, initialMarking, new List<string>(), ref traces);
            }

            return traces;
        }

        public TraceGenerator(IPetriNet net, int maxLength = 10)
        {
            Net = net;
            MaxLength = maxLength;
        }
    }
}
