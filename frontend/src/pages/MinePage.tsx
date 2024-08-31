import { ExportButton } from '@/components/ui/ExportButton';
import { PMSlider } from '@/components/ui/PMSlider';
import { SaveModelDialog } from '@/components/ui/SaveModelDialog';
import { SwitchWithLabel } from '@/components/ui/SwitchWithLabel';
import { VisibleActivitiesTrigger } from '@/components/ui/VisibleActivitiesTrigger';
import { VisibleTracesTrigger } from '@/components/ui/VisibleTracesTrigger';
import { useAlphaMine } from '@/hooks/apiHooks/useAlphaMine';
import SpinnerLogo from '@/icons/SpinnerLoader.svg';
import { MINER_TYPE } from '@/models/MinerType';
import { Graphviz } from 'graphviz-react';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

type MinePageProps = {
    miningType: MINER_TYPE;
};

export const MinePage: React.FC<MinePageProps> = ({ miningType }) => {
    const [traces, setTraces] = useState<number>(1);
    const [fitness, setFitness] = useState<number>(1);
    const [ignoreFrequency, setIgnoreFrequency] = useState<boolean>(false);
    const [sourcePetriNet, setSourcePetriNet] = useState<boolean>(false);
    const { entityName } = useParams();
    const { data, isLoading, isError } = useAlphaMine(entityName || '');

    if (isLoading) {
        return (
            <div className="flex justify-center items-center w-full h-full">
                <img src={SpinnerLogo} alt="loader" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex justify-center items-center w-full h-full">
                Unable to load!
            </div>
        );
    }

    return (
        <div className="flex flex-col w-full h-full grow md:flex-row">
            <div className="flex items-center justify-center w-full md:w-3/4 ">
                {data && (
                    <Graphviz
                        dot={data.data}
                        className="border-4"
                        options={{
                            zoom: true,
                            width: '70vw',
                            height: '80vh',
                            useWorker: false,
                        }}
                    />
                )}
                {!data && <div>Unable to load</div>}
            </div>
            <div className="grow border-s p-4 flex flex-col gap-8 items-center">
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                    {miningType === MINER_TYPE.ALPHA
                        ? 'Alpha Miner'
                        : 'Heuristic Miner'}
                </h3>
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
                    {data && <SaveModelDialog model={data.data} />}
                </div>
            </div>
        </div>
    );
};
