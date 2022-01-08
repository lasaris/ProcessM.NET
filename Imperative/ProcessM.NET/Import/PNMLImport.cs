using ProcessM.NET.Model;
using ProcessM.NET.Model.BasicPetriNet;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Xml.Linq;

namespace ProcessM.NET.Import
{
    /// <summary>
    /// This class is a PNML (Petri Net Markup Language) standard compliant PNML-to-single-PetriNet import tool.
    /// </summary>
    public class PNMLImport
    {
        /// <summary>
        /// Takes loaded Petri net data and makes and returns list of places.
        /// </summary>
        /// <param name="xPlaces">Loaded places from PNML.</param>
        /// <returns>List of places.</returns>
        private static List<IPlace> GetPlaces(IEnumerable<XElement> xPlaces)
        {
            List<IPlace> places = new List<IPlace>();
            foreach (XElement p in xPlaces)
            {
                places.Add(new Place(p.Attribute("id").Value));
            }
            return places;
        }

        /// <summary>
        /// Takes loaded Petri net data and makes and returns list of transitions.
        /// </summary>
        /// <param name="xTransitions">Loaded transitions from PNML.</param>
        /// <param name="xArcs">Loaded arcs from PNML.</param>
        /// <param name="places">Places of Petri net.</param>
        /// <param name="ns">PNML namespace.</param>
        /// <returns>List of transitions.</returns>
        private static List<ITransition> GetTransitions(IEnumerable<XElement> xTransitions, IEnumerable<XElement> xArcs, List<IPlace> places, XNamespace ns)
        {
            List<ITransition> transitions = new List<ITransition>();
            foreach (XElement t in xTransitions)
            {
                transitions.Add(new Transition(t.Attribute("id").Value, t.Element(ns + "name").Element(ns + "text").Value));
            }
            
            foreach (XElement a in xArcs)
            {
                string sourceId = a.Attribute("source").Value;
                string targetId = a.Attribute("target").Value;
                if (sourceId[0] == 'p')
                {
                    transitions.Find(a => a.Id == targetId).InputPlaces.Add(places.Find(a => a.Id == sourceId));
                }
                else
                {
                    transitions.Find(a => a.Id == sourceId).OutputPlaces.Add(places.Find(a => a.Id == targetId));
                }
            }

            return transitions;
        }

        /// <summary>
        /// Takes loaded Petri net data and finds and returns a tuple with start and end places respectively.
        /// </summary>
        /// <param name="xArcs">Loaded arcs from PNML.</param>
        /// <param name="places">Places of Petri net.</param>
        /// <returns>Tuple with start place at first position and end place at second position.</returns>
        private static Tuple<IPlace, IPlace> GetStartAndEndPlaces(IEnumerable<XElement> xArcs, IEnumerable<IPlace> places)
        {
            HashSet<string> targetIds = new HashSet<string>();
            HashSet<string> sourceIds = new HashSet<string>();

            foreach (XElement a in xArcs)
            {
                string targetId = a.Attribute("target").Value;
                string sourceId = a.Attribute("source").Value;
                if (targetId[0] == 'p')
                {
                    targetIds.Add(targetId);
                }
                if (sourceId[0] == 'p')
                {
                    sourceIds.Add(sourceId);
                }
            }

            IPlace startPlace = null;
            IPlace endPlace = null;
            foreach (IPlace p in places)
            {
                if (startPlace == null && !targetIds.Contains(p.Id))
                {
                    startPlace = p;
                }
                if (endPlace == null && !sourceIds.Contains(p.Id))
                {
                    endPlace = p;
                }
            }
            return new Tuple<IPlace, IPlace>(startPlace, endPlace);
        }

        /// <summary>
        /// Takes a stream of PNML file and builds a Petri Net according to its content.
        /// The net is expected to have exactly one start place and exactly one end place.
        /// </summary>
        /// <param name="stream">Stream containing data of PNML file.</param>
        /// <returns>PetriNet built from given PNML.</returns>
        public static IPetriNet Deserialize(Stream stream)
        {
            XElement pnmlRoot = XElement.Load(stream);
            XNamespace ns = pnmlRoot.Attribute("xmlns").Value;
            XElement netNode = pnmlRoot.Element(ns + "net");
            XElement pageNode = netNode.Element(ns + "page");
            IEnumerable<XElement> xPlaces = pageNode.Elements(ns + "place");
            IEnumerable<XElement> xTransitions = pageNode.Elements(ns + "transition");
            IEnumerable<XElement> xArcs = pageNode.Elements(ns + "arc");

            List<IPlace> places = GetPlaces(xPlaces);
            List<ITransition> transitions = GetTransitions(xTransitions, xArcs, places, ns);
            Tuple<IPlace, IPlace> startAndEndPlace = GetStartAndEndPlaces(xArcs, places);

            return new PetriNet(transitions, places, startAndEndPlace.Item1, startAndEndPlace.Item2);
        }
        
        /// <summary>
        /// Takes a location of PNML file and builds a Petri Net according to its content.
        /// The net is expected to have exactly one start place and exactly one end place.
        /// </summary>
        /// <param name="path">Path containing data of PNML file.</param>
        /// <returns>PetriNet built from given PNML.</returns>
        public static IPetriNet Deserialize(string path)
        {
            XElement pnmlRoot = XElement.Load(path);
            XNamespace ns = pnmlRoot.Attribute("xmlns").Value;
            XElement netNode = pnmlRoot.Element(ns + "net");
            XElement pageNode = netNode.Element(ns + "page");
            IEnumerable<XElement> xPlaces = pageNode.Elements(ns + "place");
            IEnumerable<XElement> xTransitions = pageNode.Elements(ns + "transition");
            IEnumerable<XElement> xArcs = pageNode.Elements(ns + "arc");

            List<IPlace> places = GetPlaces(xPlaces);
            List<ITransition> transitions = GetTransitions(xTransitions, xArcs, places, ns);
            Tuple<IPlace, IPlace> startAndEndPlace = GetStartAndEndPlaces(xArcs, places);

            return new PetriNet(transitions, places, startAndEndPlace.Item1, startAndEndPlace.Item2);
        }
    }
}
