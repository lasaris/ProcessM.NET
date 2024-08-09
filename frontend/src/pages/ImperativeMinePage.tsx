import { ExportButton } from '@/components/ui/ExportButton';
import { ImperativeMinerSelect } from '@/components/ui/ImperativeMinerSelect';
import { PMSlider } from '@/components/ui/PMSlider';
import { SwitchWithLabel } from '@/components/ui/SwitchWithLabel';
import { VisibleActivitiesTrigger } from '@/components/ui/VisibleActivitiesTrigger';
import { VisibleTracesTrigger } from '@/components/ui/VisibleTracesTrigger';
import { Button } from '@/components/ui/button';
import { Graphviz } from 'graphviz-react';
import { SaveIcon } from 'lucide-react';
import React, { useState } from 'react';

export const ImperativeMinePage: React.FC = () => {
    const [traces, setTraces] = useState<number>(1);
    const [fitness, setFitness] = useState<number>(1);
    const [ignoreFrequency, setIgnoreFrequency] = useState<boolean>(false);
    const [sourcePetriNet, setSourcePetriNet] = useState<boolean>(false);
    const exampleDotString = `digraph G{
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

    return (
        <div className="flex w-full h-full grow">
            <div className="flex items-center justify-center w-3/4 ">
                <Graphviz
                    dot={exampleDotString}
                    className="border-4"
                    options={{
                        zoom: true,
                        width: '70vw',
                        height: '80vh',
                    }}
                />
            </div>
            <div className="grow border-s p-4 flex flex-col gap-8 items-center">
                <ImperativeMinerSelect />
                <PMSlider
                    label="Traces"
                    changeValue={setTraces}
                    value={traces}
                    maxValue={10}
                />
                <PMSlider
                    label="Fitness"
                    changeValue={setFitness}
                    value={fitness}
                    maxValue={10}
                />
                <SwitchWithLabel
                    label="Ignore Frequency"
                    value={ignoreFrequency}
                    onChange={setIgnoreFrequency}
                    className="w-5/6"
                />
                <div className="flex w-5/6 flex-start gap-4">
                    <VisibleActivitiesTrigger />
                    <VisibleTracesTrigger />
                </div>
                <SwitchWithLabel
                    label="Source Petri Net"
                    value={sourcePetriNet}
                    onChange={setSourcePetriNet}
                    className="w-5/6"
                />
                <div className="flex justify-start w-5/6 gap-4">
                    <ExportButton
                        title="PNML"
                        exportFunction={() => console.log('PNML Download')}
                    />
                    <ExportButton
                        title="DOT"
                        exportFunction={() => console.log('DOT Download')}
                    />
                </div>
                <div className="flex w-5/6 justify-start">
                    <Button className="flex gap-2">
                        <SaveIcon />
                        Save To Models
                    </Button>
                </div>
            </div>
        </div>
    );
};
