import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { TraceWithOccurence } from '@/models/TraceWithOccurence';
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Switch } from './switch';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { areArraysEqual } from '@/helpers/areArraysEqual';
import { doesArrayContainArray } from '@/helpers/doesArrayContainArray';
import { AlphaMinerConfigurationType } from '@/models/schemas/AlphaMinerConfiguration';

type VisibleTracesTriggerProps = {
    traces: TraceWithOccurence[];
    form: UseFormReturn<AlphaMinerConfigurationType>;
};

export const VisibleTracesTrigger: React.FC<VisibleTracesTriggerProps> = ({
    traces,
    form,
}) => {
    const [invisTraces, setInvisTraces] = useState<string[][]>(
        form.getValues().invisibleTraces
    );

    const handleSubmit = () => {
        form.setValue('invisibleTraces', invisTraces);
    };

    const changeCheckedTrace = (trace: string[]) => {
        if (doesArrayContainArray(invisTraces, trace)) {
            setInvisTraces((prevState) =>
                prevState.filter((t) => !areArraysEqual(t, trace))
            );
            return;
        }

        setInvisTraces((prevState) => [...prevState, trace]);
    };

    const content = (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Trace</TableHead>
                    <TableHead>Occurences</TableHead>
                    <TableHead>Enable</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {traces.map((trace) => {
                    const traceString = trace.trace.join();

                    return (
                        <TableRow key={traceString}>
                            <TableCell>{traceString}</TableCell>
                            <TableCell>{trace.numberOfOccurences}</TableCell>
                            <TableCell>
                                <Switch
                                    defaultChecked={
                                        !doesArrayContainArray(
                                            invisTraces,
                                            trace.trace
                                        )
                                    }
                                    onCheckedChange={() =>
                                        changeCheckedTrace(trace.trace)
                                    }
                                />
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Traces</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Set Traces</DialogTitle>
                    <DialogDescription>
                        You can edit out Traces from the model here.
                    </DialogDescription>
                </DialogHeader>
                <div className="gap-4 py-4 overflow-auto h-[350px]">
                    {content}
                </div>
                <DialogFooter>
                    <Button onClick={handleSubmit}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
