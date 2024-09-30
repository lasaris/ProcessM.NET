import { Button } from '@/components/ui/ShadCN/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/ShadCN/dialog';
import { createDotFromTrace } from '@/helpers/createDotFromTrace';
import { TraceDTO } from '@/models/API/TraceDTO';
import Graphviz from 'graphviz-react';
import { EyeIcon } from 'lucide-react';
import React from 'react';

type ViewTraceDialogProps = {
    trace: TraceDTO;
};

export const ViewTraceDialog: React.FC<ViewTraceDialogProps> = ({ trace }) => {
    const content = (
        <DialogContent>
            <DialogTitle>{trace.case}</DialogTitle>
            <DialogDescription>Events:</DialogDescription>
            <div>
                <Graphviz
                    dot={createDotFromTrace(trace)}
                    className="border-4"
                    options={{
                        zoom: true,
                        width: '100%',
                        useWorker: false,
                    }}
                />
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button type="button">Close</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    );

    return (
        <Dialog>
            <DialogTrigger asChild>
                <EyeIcon />
            </DialogTrigger>
            {content}
        </Dialog>
    );
};
