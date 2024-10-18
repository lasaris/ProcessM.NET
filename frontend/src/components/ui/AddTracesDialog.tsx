import { Button } from '@/components/ui/ShadCN/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/ShadCN/dialog';
import { useEventLog } from '@/hooks/apiHooks/useEventLog';
import { TraceDTO } from '@/models/API/TraceDTO';
import React from 'react';
import { SelectLogForm } from './conformance/SelectLogForm';
import { TracesTable } from './conformance/TracesTable';

type AddTracesDialogProps = {
    addTraces: (traces: TraceDTO[]) => void;
    open: boolean;
    setOpen: (newState: boolean) => void;
    closeDialog: () => void;
};

export const AddTracesDialog: React.FC<AddTracesDialogProps> = ({
    addTraces,
    open,
    setOpen,
    closeDialog,
}) => {
    const { data, getEventLog, reset } = useEventLog();

    const content = data ? (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Select Traces</DialogTitle>
                <DialogDescription>Select the traces to add</DialogDescription>
            </DialogHeader>
            <TracesTable
                traces={data.data as TraceDTO[]}
                addTraces={addTraces}
                closeDialog={closeDialog}
            />
        </DialogContent>
    ) : (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Select Log</DialogTitle>
                <DialogDescription>
                    Select the log from which traces will be fetched
                </DialogDescription>
            </DialogHeader>
            <SelectLogForm getEventLog={getEventLog} />
        </DialogContent>
    );

    return (
        <Dialog
            open={open}
            onOpenChange={() => {
                reset();
                setOpen(!open);
            }}
        >
            <DialogTrigger asChild>
                <Button>Import Traces From Log</Button>
            </DialogTrigger>
            {content}
        </Dialog>
    );
};
