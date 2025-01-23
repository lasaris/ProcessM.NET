﻿using System;
using ProcessM.NET.Model;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ProcessM.NET.Model.GraphvizNet;

namespace ProcessM.NET.Export
{
    /// <summary>
    /// This is a Petri Net to .DOT file export tool. DOT files can be read and displayed by software such as Graphviz, thus providing
    /// visualization options of Petri Nets.
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
            return indentation + "subgraph places {\n" +
                doubleIndent + "node [shape = circle, fixedsize = true, width = 0.5, label = \" \", tooltip = \" \"]\n";
        }

        /// <summary>
        /// Creates a .DOT subgraph header for visible transitions in given Petri Net (displayed as rectangles in Graphviz).
        /// </summary>
        /// <param name="indentation">Indentation symbol, this class uses "\t" as default.</param>
        /// <returns>A string containing .DOT subgraph header of transitions in given Petri Net.</returns>
        private static string GetTransitionsHeader(string indentation)
        {
            string doubleIndent = indentation + indentation;
            return indentation + "subgraph transitions {\n" +
                doubleIndent + "node [class = transition, shape = rect, style=filled, fillcolor = white, height = 0.1, width = 1]\n";
        }
        
        /// <summary>
        /// Creates a .DOT subgraph header for invisible transitions in given Petri Net (displayed as rectangles in Graphviz).
        /// </summary>
        /// <param name="indentation">Indentation symbol, this class uses "\t" as default.</param>
        /// <returns>A string containing .DOT subgraph header of invisible transitions in given Petri Net.</returns>
        private static string GetInvisibleTransitionsHeader(string indentation)
        {
            string doubleIndent = indentation + indentation;
            return indentation + "subgraph invisible_transitions {\n" +
                   doubleIndent + "node [shape = rect, height = 0.1, width = 1, label = \" \", tooltip = \" \", fillcolor = lightgrey, style=filled]\n";
        }

        /// <summary>
        /// Fills the .DOT subgraph of places with place representation from exported Petri Net.
        /// </summary>
        /// <param name="places">A collection of places in exported Petri Net.</param>
        /// <param name="indentation">Indentation symbol, this class uses "\t" as default.</param>
        /// <returns>A StringBuilder containing a string .DOT representation of places in exported Petri Net.</returns>
        private static StringBuilder GetPlaces(IEnumerable<GPlace> places, string indentation)
        {
            string doubleIndent = indentation + indentation;
            StringBuilder outStr = new StringBuilder("");
            outStr.Append(GetPlacesHeader(indentation));
            foreach (var p in places)
            {
                outStr.Append(doubleIndent + "\"" + p.Id + "\"\n");
            }
            outStr.Append(indentation + "}\n");
            return outStr;
        }

        /// <summary>
        /// Fills the .DOT subgraph of visible transitions with transition representation from exported Petri Net.
        /// </summary>
        /// <param name="transitions">A collection of transitions in exported Petri Net.</param>
        /// <param name="indentation">Indentation symbol, this class uses "\t" as default.</param>
        /// <returns>A StringBuilder containing a string .DOT representation of visible transitions in exported Petri Net.</returns>
        private static StringBuilder GetTransitions(IEnumerable<GTransition> transitions, string indentation)
        {
            string doubleIndent = indentation + indentation;
            StringBuilder outStr = new StringBuilder("");
            outStr.Append(GetTransitionsHeader(indentation));
            foreach (var t in transitions.Where(tr => !tr.Invisible))
            {
                outStr.Append(doubleIndent + "\"" + t.Id + "\" [");
                outStr.Append("id=\"" + t.Id + "\",");
                outStr.Append("fillcolor=" + t.Color + ",");

                var label = t.Label.Trim('<', '>');
                if (t.AbsoluteFrequency != 0)
                {
                    outStr.Append("shape=record, ");
                    outStr.Append("label=< <B>" + label + "</B> | <FONT POINT-SIZE=\"10\">" + t.AbsoluteFrequency + "</FONT>>, ");
                    outStr.Append("tooltip=\"" +
                                  "Absolute frequency: " + t.AbsoluteFrequency + "&#10;" +
                                  "Case frequency: " + t.CaseFrequency + "&#10;" +
                                  "Case coverage: " + Math.Round(t.CaseCoverage * 100) + " %&#10;" +
                                  "Max repetitions: " + t.MaxRepetitions + "\"");
                }
                else
                {
                    outStr.Append("label =< <B>" + label + "</B> >");
                }
                outStr.Append("];\n");
            }
            outStr.Append(indentation + "}\n");
            return outStr;
        }

        /// <summary>
        /// Fills the .DOT subgraph of transitions with invisible transition representation from exported Petri Net.
        /// </summary>
        /// <param name="transitions">A collection of transitions in exported Petri Net.</param>
        /// <param name="indentation">Indentation symbol, this class uses "\t" as default.</param>
        /// <returns>A StringBuilder containing a string .DOT representation of invisible transitions in exported Petri Net.</returns>
        private static StringBuilder GetInvisibleTransitions(IEnumerable<GTransition> transitions, string indentation)
        {
            string doubleIndent = indentation + indentation;
            StringBuilder outStr = new StringBuilder("");
            outStr.Append(GetInvisibleTransitionsHeader(indentation));
            foreach (var t in transitions.Where(tr => tr.Invisible))
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
        private static StringBuilder GetArcs(IEnumerable<GEdge> edges, string indentation)
        {
            StringBuilder outStr = new StringBuilder("");
            foreach (var e in edges)
            {
                outStr.Append(indentation + "\"" + e.Start + "\" -> \"" + e.End + "\"");
                if (e.Frequency != 0)
                {
                    outStr.Append(indentation + " [label =<<FONT POINT-SIZE=\"10\">" + e.Frequency + "</FONT>>]");
                }
                outStr.Append(indentation + "\n");
            }
            outStr.Append("}");
            return outStr;
        }

        /// <summary>
        /// Serializes given GraphvizNet to a .DOT file string.
        /// </summary>
        /// <param name="sourceNet">An IPetriNet compliant Petri Net.</param>
        /// <param name="simplified">Export simplified graph only</param>
        /// <param name="indentation">Indentation symbol, this class uses "\t" as default.</param>
        /// <returns>.dot file string</returns>
        public static string Serialize(GraphvizNet net, bool simplified = false, string indentation = "\t")
        {
            net.Simplify = simplified;
            StringBuilder outStr = new StringBuilder("");
            outStr.Append(GetGraphHeader());
            if (net.Places.Any())
            {
                outStr.Append(GetPlaces(net.Places, indentation));
            }
            outStr.Append(GetTransitions(net.Transitions, indentation));
            if (net.Transitions.Any(t => t.Invisible))
            {
                outStr.Append(GetInvisibleTransitions(net.Transitions, indentation));
            }
            outStr.Append(GetArcs(net.Edges, indentation));
            return outStr.ToString();
        }
        
        /// <summary>
        /// Serializes given Petri Net compliant with IPetriNet interface to a .DOT file string.
        /// </summary>
        /// <param name="sourceNet">An IPetriNet compliant Petri Net.</param>
        /// <param name="simplified">Export simplified graph only</param>
        /// <param name="indentation">Indentation symbol, this class uses "\t" as default.</param>
        /// <returns>.dot file string</returns>
        public static string Serialize(IPetriNet sourceNet, bool simplified = false, string indentation = "\t")
        {
            return Serialize(new GraphvizNet(sourceNet), simplified, indentation);
        }
    }
}
