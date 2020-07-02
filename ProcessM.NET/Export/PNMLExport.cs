using ProcessM.NET.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Xml;
using System.Xml.Linq;

namespace ProcessM.NET.Export
{
    /// <summary>
    /// This class is a PNML (Petri Net Markup Language) standard compliant single-PetriNet-to-PNML export tool.
    /// </summary>
    public static class PNMLExport
    {
        /// <summary>
        /// Creates an XElement node representing header to a PNML file with an appropriate PNML namespace.
        /// </summary>
        /// <param name="ns">A namespace of PNML file.</param>
        /// <returns>XElement containing a properly set up header node to a PNML file.</returns>
        private static XElement GetPnmlHeader(XNamespace ns)
        {
            XElement xRoot = new XElement(ns + "pnml");
            return xRoot;
        }

        /// <summary>
        /// Creates an XElement node representing the (Petri) net object with an appropriate PNML namespace.
        /// </summary>
        /// <param name="ns">A namespace of PNML file.</param>
        /// <param name="id">A string attribute net identificator, default is "net".</param>
        /// <returns>XElement containing a properly set up net node.</returns>
        private static XElement GetNetNode(XNamespace ns, string id = "net")
        {
            XElement xNet = new XElement(ns + "net");
            xNet.SetAttributeValue("id", id);
            xNet.SetAttributeValue("type", ns.NamespaceName);
            return xNet;
        }

        /// <summary>
        /// Creates an XElement node representing a formal Page node with an appropriate PNML namespace.
        /// </summary>
        /// <param name="ns">A namespace of PNML file.</param>
        /// <param name="num">Int attribute of page number, default is 0.</param>
        /// <returns>XElement containing a properly set up page node.</returns>
        private static XElement GetPageNode(XNamespace ns, int num = 0)
        {
            XElement xPage = new XElement(ns + "page");
            xPage.SetAttributeValue("id", "page-" + num);
            return xPage;
        }

        /// <summary>
        /// Adds place nodes to the page node based on places in exported Petri Net.
        /// </summary>
        /// <param name="xPage">A page container node.</param>
        /// <param name="places">A collection of places of exported Petri Net.</param>
        /// <param name="ns">A namespace of PNML file.</param>
        private static void AddPlaces(XElement xPage, IEnumerable<IPlace> places, XNamespace ns)
        {
            foreach (IPlace p in places)
            {
                XElement xPlace = new XElement(ns + "place");
                xPlace.SetAttributeValue("id", p.Id);
                XElement xPlaceName = new XElement(ns + "name");
                xPlaceName.Add(new XElement(ns + "text") { Value = p.Id });
                xPlace.Add(xPlaceName);
                xPage.Add(xPlace);
            }
        }

        /// <summary>
        /// Adds transition nodes to the page node based on transitions in exported Petri Net.
        /// </summary>
        /// <param name="xPage">A page container node.</param>
        /// <param name="transitions">A collection of transitions of exported Petri Net.</param>
        /// <param name="ns">A namespace of PNML file.</param>
        private static void AddTransitions(XElement xPage, IEnumerable<ITransition> transitions, XNamespace ns)
        {
            foreach (ITransition t in transitions)
            {
                XElement xTransition = new XElement(ns + "transition");
                xTransition.SetAttributeValue("id", t.Id);
                XElement xTransitionName = new XElement(ns + "name");
                xTransitionName.Add(new XElement(ns + "text") { Value = t.Activity });
                xTransition.Add(xTransitionName);
                xPage.Add(xTransition);
            }
        }

        /// <summary>
        /// Adds arc nodes (all weighted equally) to the page node based on transitions and their input and output places.
        /// </summary>
        /// <param name="xPage">A page container node.</param>
        /// <param name="transitions">A collection of transitions of exported Petri Net.</param>
        /// <param name="ns">A namespace of PNML file.</param>
        private static void AddArcs(XElement xPage, IEnumerable<ITransition> transitions, XNamespace ns)
        {
            int id = 0;
            foreach (ITransition t in transitions)
            {
                foreach (IPlace ip in t.InputPlaces)
                {
                    XElement xArc = new XElement(ns + "arc");
                    xArc.SetAttributeValue("id", "a" + id);
                    id++;
                    xArc.SetAttributeValue("source", ip.Id);
                    xArc.SetAttributeValue("target", t.Id);
                    XElement xArcInscription = new XElement(ns + "inscription");     // dummy value for adding weights
                    xArcInscription.Add(new XElement(ns + "text") { Value = "1" });  // to arcs in the future
                    xArc.Add(xArcInscription);
                    xPage.Add(xArc);
                }

                foreach(IPlace op in t.OutputPlaces)
                {
                    XElement xArc = new XElement(ns + "arc");
                    xArc.SetAttributeValue("id", "a" + id);
                    id++;
                    xArc.SetAttributeValue("source", t.Id);
                    xArc.SetAttributeValue("target", op.Id);
                    XElement xArcInscription = new XElement(ns + "inscription");     // dummy value for adding weights
                    xArcInscription.Add(new XElement(ns + "text") { Value = "1" });  // to arcs in the future
                    xArc.Add(xArcInscription);
                    xPage.Add(xArc);
                }
                
            }
        }

        /// <summary>
        /// Serializes given Petri Net compliant with IPetriNet interface to a PNML file with .xml extension.
        /// </summary>
        /// <param name="net">An IPetriNet compliant Petri Net.</param>
        /// <returns>Filename of created file.</returns>
        public static string Serialize(IPetriNet net)
        {
            XNamespace ns = "http://www.pnml.org/version-2009/grammar/pnml";
            XElement xRoot = GetPnmlHeader(ns);
            XElement xNet = GetNetNode(ns);
            xRoot.Add(xNet);
            XElement xPage = GetPageNode(ns);
            xNet.Add(xPage);
            AddPlaces(xPage, net.Places, ns);
            AddTransitions(xPage, net.Transitions, ns);
            AddArcs(xPage, net.Transitions, ns);

            XmlWriterSettings settings = new XmlWriterSettings { Indent = true, IndentChars = ("\t") };
            string filename = "petrinet" + DateTime.Now.ToString().Replace('.', '-').Replace(':', '-') + ".xml";
            using (XmlWriter writer = XmlWriter.Create(filename, settings))
            {
                xRoot.Save(writer);
            }
            return filename;
        }
    }
}
