export const dot = `digraph G{
	subgraph places {
		node [shape = circle, fixedsize = true, width = 0.5, label = " ", tooltip = " "]
		"() place (<<start>>)"
		"(<<start>>) place ()"
		"() place (a)"
		"(a) place ()"
		"() place (b)"
		"(b) place ()"
		"() place (d)"
		"(d) place (,)"
		"() place (e)"
		"(e) place ()"
		"(,) place (g)"
		"(g) place ()"
		"() place (<<end>>)"
		"(<<end>>) place ()"
		"() place (f)"
		"(f) place ()"
	}
	subgraph transitions {
		node [class = transition, shape = rect, style=filled, fillcolor = white, height = 0.1, width = 1]
		"a" [id="a",fillcolor=white,label =< <B>a</B> >];
		"b" [id="b",fillcolor=white,label =< <B>b</B> >];
		"d" [id="d",fillcolor=white,label =< <B>d</B> >];
		"e" [id="e",fillcolor=white,label =< <B>e</B> >];
		"g" [id="g",fillcolor=white,label =< <B>g</B> >];
		"f" [id="f",fillcolor=white,label =< <B>f</B> >];
	}
	subgraph invisible_transitions {
		node [shape = rect, height = 0.1, width = 1, label = " ", tooltip = " ", fillcolor = lightgrey, style=filled]
		"(<<start>>) place () | () place (a)";
		"(a) place () | () place (b)";
		"(b) place () | () place (d)";
		"(d) place (,) | () place (e)";
		"(d) place (,) | () place (f)";
		"(e) place () | (,) place (g)";
		"(g) place () | () place (<<end>>)";
		"(f) place () | (,) place (g)";
	}
	"() place (<<start>>)" -> "<<start>>"	
	"<<start>>" -> "(<<start>>) place ()"	
	"() place (a)" -> "a"	
	"a" -> "(a) place ()"	
	"() place (b)" -> "b"	
	"b" -> "(b) place ()"	
	"() place (d)" -> "d"	
	"d" -> "(d) place (,)"	
	"() place (e)" -> "e"	
	"e" -> "(e) place ()"	
	"(,) place (g)" -> "g"	
	"g" -> "(g) place ()"	
	"() place (<<end>>)" -> "<<end>>"	
	"<<end>>" -> "(<<end>>) place ()"	
	"() place (f)" -> "f"	
	"f" -> "(f) place ()"	
	"(<<start>>) place ()" -> "(<<start>>) place () | () place (a)"	
	"(<<start>>) place () | () place (a)" -> "() place (a)"	
	"(a) place ()" -> "(a) place () | () place (b)"	
	"(a) place () | () place (b)" -> "() place (b)"	
	"(b) place ()" -> "(b) place () | () place (d)"	
	"(b) place () | () place (d)" -> "() place (d)"	
	"(d) place (,)" -> "(d) place (,) | () place (e)"	
	"(d) place (,) | () place (e)" -> "() place (e)"	
	"(d) place (,)" -> "(d) place (,) | () place (f)"	
	"(d) place (,) | () place (f)" -> "() place (f)"	
	"(e) place ()" -> "(e) place () | (,) place (g)"	
	"(e) place () | (,) place (g)" -> "(,) place (g)"	
	"(g) place ()" -> "(g) place () | () place (<<end>>)"	
	"(g) place () | () place (<<end>>)" -> "() place (<<end>>)"	
	"(f) place ()" -> "(f) place () | (,) place (g)"	
	"(f) place () | (,) place (g)" -> "(,) place (g)"	
}`;
