import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/ShadCN/dialog';
import { generateDotFromSTransitions } from '@/helpers/generateDotFromSTransitions';
import { useAlignment } from '@/hooks/apiHooks/useAlignment';
import { useModelsDb } from '@/hooks/useModelsDb';
import { Event } from '@/models/API/Event';
import { STransition } from '@/models/API/STransition';
import Graphviz from 'graphviz-react';
import { CheckIcon } from 'lucide-react';
import React from 'react';
import { useAsync } from 'react-async-hook';
import { useParams } from 'react-router-dom';
import { LoadingSpinner } from '../LoadingSpinner';
import { H4 } from '../typography/H4';

type OptimalAlignmentForTraceResultDialogProps = {
    events: Event[];
};

export const OptimalAlignmentForTraceResultDialog: React.FC<
    OptimalAlignmentForTraceResultDialogProps
> = ({ events }) => {
    const { getOptimalAlignmentForTrace, data, isPending, isError } =
        useAlignment();
    const { entityName } = useParams();
    const { fetchSingleModel } = useModelsDb();
    const model = useAsync(() => fetchSingleModel(entityName || ''), []);

    const result = data?.data as STransition[];
    const dotGraph = generateDotFromSTransitions(result);
    const content = (
        <div className="flex flex-row w-full">
            <div className="flex flex-col gap-3 w-full items-center md:w-1/2">
                <H4>Optimal Alignment</H4>
                <div className="px-2 w-full text-center">
                    <p className="text-sm text-muted-foreground">
                        Trace, where the highlighted activity cannot be replayed
                        on the mined graph.
                    </p>
                </div>
                {isPending && <LoadingSpinner />}
                {isError && (
                    <div>
                        Unable to perform conformance check on the selected
                        trace.
                    </div>
                )}
                {!isPending && result && dotGraph && (
                    <Graphviz
                        dot={dotGraph}
                        className="shadow-xl w-full rounded-xl"
                        options={{
                            zoom: true,
                            width: '100%',
                            useWorker: false,
                        }}
                    />
                )}
            </div>
            <div className="w-full hidden md:flex md:flex-col md:gap-3 items-center md:w-1/2">
                <H4>Mined Graph</H4>
                <div className="px-2 w-full text-center">
                    <p className="text-sm text-muted-foreground">
                        Mined graph using an imperative technique such as
                        Heuristic or Alpha miner
                    </p>
                </div>
                {model.result?.model && (
                    <Graphviz
                        dot={model.result.model}
                        className="shadow-xl w-full rounded-xl"
                        options={{
                            zoom: true,
                            width: '100%',
                            useWorker: false,
                        }}
                    />
                )}
                {model.loading && <LoadingSpinner />}
            </div>
        </div>
    );

    return (
        <Dialog>
            <DialogTrigger asChild>
                <CheckIcon
                    onClick={() => {
                        getOptimalAlignmentForTrace(events);
                    }}
                />
            </DialogTrigger>
            <DialogContent className="max-w-[100vw] md:max-w-[90vw] lg:max-w-[80vw] xl:max-w-[70vw]">
                <DialogTitle></DialogTitle>
                <DialogDescription></DialogDescription>
                <div className="flex gap-4">{content}</div>
            </DialogContent>
        </Dialog>
    );
};
