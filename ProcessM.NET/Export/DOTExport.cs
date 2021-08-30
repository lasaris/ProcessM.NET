﻿using ProcessM.NET.Model;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ProcessM.NET.Export
{
    /// <summary>
    /// This is a Petri Net to .DOT file export tool. DOT files can be read and displayed by software such as Graphviz, thus providing
    /// visialization options of Petri Nets.
    /// </summary>
    public static class DOTExport
    {
        /// <summary>
        /// Creates a .DOT graph header for given Petri Net.
        /// </summary>
        /// <param name="graphName">A string value of graph name, default is G.</param>
        /// <returns>A string containing .DOT graph header of given Petri Net.</returns>
        private static string GetGraphHeader(string graphName = "G")
        {
            return "digraph " + graphName + "{\n";
        }

        /// <summary>
        /// Creates a .DOT subgraph header for places in given Petri Net (displayed as circles in Graphviz).
        /// </summary>
        /// <param name="indentation">Indentation symbol, this class uses "\t" as default.</param>
        /// <returns>A string containing .DOT subgraph header of places in given Petri Net.</returns>
        private static string GetPlacesHeader(string indentation)
        {
            string doubleIndent = indentation + indentation;
            return indentation + "subgraph place {\n" +
                doubleIndent + "graph [shape = circle, color = gray];\n" +
                doubleIndent + "node [shape = circle, fixedsize = true, width = 0.5, label = \" \"];\n";
        }

        /// <summary>
        /// Creates a .DOT subgraph header for transitions in given Petri Net (displayed as rectangles in Graphviz).
        /// </summary>
        /// <param name="indentation">Indentation symbol, this class uses "\t" as default.</param>
        /// <returns>A string containing .DOT subgraph header of transitions in given Petri Net.</returns>
        private static string GetTransitionsHeader(string indentation)
        {
            string doubleIndent = indentation + indentation;
            return indentation + "subgraph transitions {\n" +
                doubleIndent + "node [shape = rect, height = 0.2, width = 2];\n";
        }
        
        private static string GetInvisibleTransitionsHeader(string indentation)
        {
            string doubleIndent = indentation + indentation;
            return indentation + "subgraph invisible_transitions {\n" +
                   doubleIndent + "node [shape = rect, height = 0.1, width = 1, label = \" \", fillcolor = black, style=filled];\n";
        }

        /// <summary>
        /// Fills the .DOT subgraph of places with place representation from exported Petri Net.
        /// </summary>
        /// <param name="places">A collection of places in exported Petri Net.</param>
        /// <param name="indentation">Indentation symbol, this class uses "\t" as default.</param>
        /// <returns>A StringBuilder containing a string .DOT representation of places in exported Petri Net.</returns>
        private static StringBuilder GetPlaces(IEnumerable<IPlace> places, string indentation)
        {
            string doubleIndent = indentation + indentation;
            StringBuilder outStr = new StringBuilder("");
            outStr.Append(GetPlacesHeader(indentation));
            foreach (IPlace p in places)
            {
                outStr.Append(doubleIndent + "\"" + p.Id + "\"\n");
            }
            outStr.Append(indentation + "}\n");
            return outStr;
        }

        /// <summary>
        /// Fills the .DOT subgraph of transitions with transition representation from exported Petri Net.
        /// </summary>
        /// <param name="transitions">A collection of transitions in exported Petri Net.</param>
        /// <param name="indentation">Indentation symbol, this class uses "\t" as default.</param>
        /// <returns>A StringBuilder containing a string .DOT representation of transitions in exported Petri Net.</returns>
        private static StringBuilder GetTransitions(IEnumerable<ITransition> transitions, string indentation)
        {
            string doubleIndent = indentation + indentation;
            StringBuilder outStr = new StringBuilder("");
            outStr.Append(GetTransitionsHeader(indentation));
            foreach (ITransition t in transitions.Where(tr => !tr.Invisible))
            {
                outStr.Append(doubleIndent + "\"" + t.Activity + "\";\n");
            }
            outStr.Append(indentation + "}\n");
            return outStr;
        }

        private static StringBuilder GetInvisibleTransitions(IEnumerable<ITransition> transitions, string indentation)
        {
            string doubleIndent = indentation + indentation;
            StringBuilder outStr = new StringBuilder("");
            outStr.Append(GetInvisibleTransitionsHeader(indentation));
            foreach (ITransition t in transitions.Where(tr => tr.Invisible))
            {
                outStr.Append(doubleIndent + "\"" + t.Id + "\";\n");
            }
            outStr.Append(indentation + "}\n");
            return outStr;
        }
        /// <summary>
        /// Fills the .DOT graph with arc representation based on transitions of exported Petri Net.
        /// </summary>
        /// <param name="transitions">A collection of transitions in exported Petri Net.</param>
        /// <param name="indentation">Indentation symbol, this class uses "\t" as default.</param>
        /// <returns>A StringBuilder containing a string .DOT representation of arcs in exported Petri Net.</returns>
        private static StringBuilder GetArcs(List<ITransition> transitions, string indentation)
        {
            StringBuilder outStr = new StringBuilder("");
            foreach (ITransition t in transitions)
            {
                foreach (IPlace ip in t.InputPlaces)
                {
                    outStr.Append(indentation + "\"" + ip.Id + "\" -> \"" + (t.Invisible ? t.Id : t.Activity) + "\";\n");
                }
                foreach (IPlace op in t.OutputPlaces)
                {
                    outStr.Append(indentation + "\"" + (t.Invisible ? t.Id : t.Activity) + "\" -> \"" + op.Id + "\";\n");
                }
            }
            outStr.Append("}");
            return outStr;
        }

        /// <summary>
        /// Serializes given Petri Net compliant with IPetriNet interface to a .DOT file string.
        /// </summary>
        /// <param name="net">An IPetriNet compliant Petri Net.</param>
        /// <param name="indentation">Indentation symbol, this class uses "\t" as default.</param>
        /// <returns>.dot file string</returns>
        public static string Serialize(IPetriNet net, string indentation = "\t")
        {
            StringBuilder outStr = new StringBuilder("");
            outStr.Append(GetGraphHeader());
            outStr.Append(GetPlaces(net.Places, indentation));
            outStr.Append(GetTransitions(net.Transitions, indentation));
            outStr.Append(GetInvisibleTransitions(net.Transitions, indentation));
            outStr.Append(GetArcs(net.Transitions, indentation));
            return outStr.ToString();
        }
    }
}
