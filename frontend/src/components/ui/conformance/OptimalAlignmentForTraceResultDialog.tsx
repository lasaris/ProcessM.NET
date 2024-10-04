import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/ShadCN/dialog';
import { generateDotFromSTransitions } from '@/helpers/generateDotFromSTransitions';
import { useAlignment } from '@/hooks/apiHooks/useAlignment';
import { Event } from '@/models/API/Event';
import { STransition } from '@/models/API/STransition';
import Graphviz from 'graphviz-react';
import { CheckIcon } from 'lucide-react';
import React from 'react';
import { LoadingSpinner } from '../LoadingSpinner';

type OptimalAlignmentForTraceResultDialogProps = {
    events: Event[];
};

export const OptimalAlignmentForTraceResultDialog: React.FC<
    OptimalAlignmentForTraceResultDialogProps
> = ({ events }) => {
    const { getOptimalAlignmentForTrace, data, isPending } = useAlignment();

    let content = <LoadingSpinner />;

    if (data && !isPending) {
        const result = data?.data as STransition[];

        if (result) {
            const dotGraph = generateDotFromSTransitions(result);
            content = (
                <div className="w-full h-[60vh] overflow-y-hidden">
                    <Graphviz
                        dot={dotGraph}
                        options={{
                            zoom: true,
                            width: '100%',
                            useWorker: false,
                        }}
                    />
                </div>
            );
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <CheckIcon
                    onClick={() => {
                        getOptimalAlignmentForTrace(events);
                    }}
                />
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Conformance</DialogTitle>
                <DialogDescription>
                    Trace Alignment
                </DialogDescription>
                <div className="flex justify-center">{content}</div>
            </DialogContent>
        </Dialog>
    );
};
