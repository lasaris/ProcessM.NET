using System.Collections.Generic;
using System.Linq;
using ProcessM.NET.Model.DataAnalysis;

namespace ProcessM.NET.Model.GraphvizNet;

public class GraphvizNet
{
    private IList<GTransition> transitions;
    private IList<GPlace> places;
    private IList<GEdge> edges;
    private IList<GEdge> simpleEdges;
    
    public  bool Simplify { get; set; } = false;
    public IList<GTransition> Transitions => Simplify ? transitions.Where(t => !t.Invisible).ToList() : transitions;
    public IList<GPlace> Places => Simplify ? new List<GPlace>() : places;
    public IList<GEdge> Edges => Simplify ? simpleEdges : edges;

    public GPlace Start  { get; set; }
    public GPlace End  { get; set; }


    public GraphvizNet(IPetriNet petriNet)
    {
        Start = new GPlace { Id = petriNet.StartPlace.Id };
        End = new GPlace { Id = petriNet.EndPlace.Id };

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
        
        CreateSimpleEdges(petriNet);
        TransformIds(petriNet);
    }
    
    public GraphvizNet(IPetriNet petriNet, WorkflowLog workflowLog) : this(petriNet)
    {
        ComputeFrequency(workflowLog);
    }

    private void CreateSimpleEdges(IPetriNet petriNet)
    {
        simpleEdges = new List<GEdge>();
        foreach (var inT in petriNet.Transitions.Where(t => !t.Invisible))
        {
            var outTransitions = new List<(ITransition, int)>();
            foreach (var p in inT.OutputPlaces)
            {
                foreach (var outT in petriNet.Transitions.Where(t => t.InputPlaces.Contains(p)))
                {
                    if (!outT.Invisible)
                    {
                        outTransitions.Add((outT, 0));
                    }
                    else
                    {
                        foreach (var arcTOutputPlace in outT.OutputPlaces)
                        {
                            foreach (var outTransition in petriNet.Transitions.Where(t =>
                                         t.InputPlaces.Contains(arcTOutputPlace)))
                            {
                                outTransitions.Add((outTransition, outT.Frequency));
                            }
                        }
                    }
                }
            }

            outTransitions = outTransitions
                .GroupBy(t => t.Item1)
                .Select((g) => (g.Key, g.Sum(s => s.Item2)))
                .ToList();

            foreach (var (outT, freq) in outTransitions.Distinct())
            {
                simpleEdges.Add(new GEdge { Start = inT.Id, End = outT.Id, Frequency = freq });
            }
        }
    }


    private void ComputeFrequency(WorkflowLog wLog)
    {
        var absoluteFrequency = new Dictionary<string, int>();
        var caseFrequency = new Dictionary<string, int>();
        var maxRepetitions = new Dictionary<string, int>();
        var distinctTraces = new HashSet<List<string>>();
        foreach (var trace in wLog.WorkflowTraces)
        {
            distinctTraces.Add(trace.Activities);
            var traceFrequency = new Dictionary<string, int>();
            foreach (var act in trace.Activities)
            {
                absoluteFrequency.TryGetValue(act, out var absFreq); 
                absoluteFrequency[act] = absFreq + 1;
                if (!traceFrequency.ContainsKey(act))
                {
                    caseFrequency.TryGetValue(act, out var caseFreq); 
                    caseFrequency[act] = caseFreq + 1;
                }
                traceFrequency.TryGetValue(act, out var traceFreq); 
                traceFrequency[act] = traceFreq + 1;
            }
            foreach (var (act, traceFreq) in traceFrequency)
            {
                maxRepetitions.TryGetValue(act, out var maxReq);
                if (maxReq < traceFreq)
                {
                    maxRepetitions[act] = traceFreq;
                }
            }
        }
        var caseCount = distinctTraces.Count;
        foreach (var gTransition in this.transitions.Where(t => !t.Invisible))
        {
            var act = gTransition.Label;
            gTransition.AbsoluteFrequency = absoluteFrequency[act];
            gTransition.CaseFrequency = caseFrequency[act];
            gTransition.MaxRepetitions = maxRepetitions[act];
            gTransition.CaseCoverage = caseFrequency[act] / (double)caseCount;
        }
    }

    /// <summary>
    /// Assigns each node a unique id, based on its neighbours.
    /// </summary>
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