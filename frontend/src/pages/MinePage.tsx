import { ExportButton } from '@/components/ui/ExportButton';
import { ImperativeMinerSelect } from '@/components/ui/ImperativeMinerSelect';
import { PMSlider } from '@/components/ui/PMSlider';
import { SwitchWithLabel } from '@/components/ui/SwitchWithLabel';
import { VisibleActivitiesTrigger } from '@/components/ui/VisibleActivitiesTrigger';
import { VisibleTracesTrigger } from '@/components/ui/VisibleTracesTrigger';
import { Button } from '@/components/ui/button';
import { dot } from '@/examples/exampleDots/dot';
import { Graphviz } from 'graphviz-react';
import { SaveIcon } from 'lucide-react';
import React, { useState } from 'react';

export const MinePage: React.FC = () => {
    const [traces, setTraces] = useState<number>(1);
    const [fitness, setFitness] = useState<number>(1);
    const [ignoreFrequency, setIgnoreFrequency] = useState<boolean>(false);
    const [sourcePetriNet, setSourcePetriNet] = useState<boolean>(false);

    return (
        <div className="flex flex-col w-full h-full grow md:flex-row">
            <div className="flex items-center justify-center w-full md:w-3/4 ">
                <Graphviz
                    dot={dot}
                    className="border-4"
                    options={{
                        zoom: true,
                        width: '70vw',
                        height: '80vh',
                        useWorker: false,
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
