using System.Collections;
using System.Collections.Generic;
using System.Linq;

namespace ProcessM.NET.Model.GraphvizNet;

public class GraphvizNet
{
    private IList<GTransition> transitions;
    public IList<GTransition> Transitions => Simplify ? transitions.Where(t => !t.Invisible).ToList() : transitions;

    private IList<GPlace> places;
    public IList<GPlace> Places => Simplify ? new List<GPlace>() : places;

    private IList<GEdge> edges;
    private IList<GEdge> simpleEdges;

    public IList<GEdge> Edges => Simplify ? simpleEdges : edges;

    public INode Start  { get; set; }
    public INode End  { get; set; }

    public  bool Simplify { get; set; } = false;

    public GraphvizNet(IPetriNet petriNet)
    {
        Start = new INode { Id = petriNet.StartPlace.Id };
        End = new INode { Id = petriNet.EndPlace.Id };

        places = petriNet.Places.Select(p => new GPlace { Id = p.Id }).ToList();

        transitions = new List<GTransition>();
        edges = new List<GEdge>();
        foreach (var transition in petriNet.Transitions)
        {
            transitions.Add(new GTransition{ Id = transition.Id, Label = transition.Activity, Invisible = transition.Invisible });
            foreach (var inPlace in transition.InputPlaces)
            {
                edges.Add(new GEdge{ Start = inPlace.Id, End = transition.Id });
            }
            foreach (var outPlace in transition.OutputPlaces)
            {
                edges.Add(new GEdge{ Start = transition.Id, End = outPlace.Id });
            }
        }
        
        simpleEdges = new List<GEdge>();
        foreach (var inT in petriNet.Transitions.Where(t => !t.Invisible))
        {
            var outTransitions = new List<ITransition>();
            foreach (var p in inT.OutputPlaces)
            {
                foreach (var outT in petriNet.Transitions.Where(t => t.InputPlaces.Contains(p)))
                {
                    if (!outT.Invisible)
                    {
                        outTransitions.Add(outT);
                    }
                    else
                    {
                        foreach (var arcTOutputPlace in outT.OutputPlaces)
                        {
                            foreach (var outTransition in petriNet.Transitions.Where(t => t.InputPlaces.Contains(arcTOutputPlace)))
                            {
                                outTransitions.Add(outTransition);
                            }
                        }
                    }
                }
            }

            foreach (var outT in outTransitions.Distinct())
            {
                simpleEdges.Add(new GEdge{ Start = inT.Id, End = outT.Id });
            }
        }
        TransformIds(petriNet);
    }
    
    private void TransformIds(IPetriNet net)
    {
        var transform = new Dictionary<string, string>();

        foreach (var p in  net.Places)
        {
            var inTransitions = string.Join(",", net.Transitions.Where(a => a.OutputPlaces.Contains(p)).Select(t => t.Activity));
            var outTransitions = string.Join(",",  net.Transitions.Where(a => a.InputPlaces.Contains(p)).Select(t => t.Activity));
            var placeId = "(" + inTransitions + ") place (" + outTransitions + ")";
            transform.Add(p.Id, placeId);
        }
        
        foreach (var t in net.Transitions)
        {
            if (t.Invisible)
            {
                transform.Add(t.Id, string.Join(",", t.InputPlaces.Select(p => transform[p.Id])) + " | " +
                                    string.Join(",", t.OutputPlaces.Select(p => transform[p.Id])));
            }
            else
            {
                transform.Add(t.Id, t.Activity);
            }
            
        }

        foreach (var place in Places)
        {
            place.Id = transform[place.Id];
        }
        
        foreach (var transition in transitions)
        {
            transition.Id = transform[transition.Id];
        }

        foreach (var edge in edges.Concat(simpleEdges))
        {
            edge.Start = transform[edge.Start];
            edge.End = transform[edge.End];
        }
    }

    public void ChangeTransitionColor(string id, string color)
    {
        var transition = transitions.FirstOrDefault(t => t.Id == id);
        if (transition is not null)
        {
            transition.Color = color;
        }
    }
}