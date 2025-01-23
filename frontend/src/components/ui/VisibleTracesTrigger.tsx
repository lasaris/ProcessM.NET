import { Button } from '@/components/ui/ShadCN/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/ShadCN/dialog';
import { Switch } from '@/components/ui/ShadCN/switch';
import { TraceWithOccurence } from '@/models/TraceWithOccurence';
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/ShadCN/table';
import { areArraysEqual } from '@/helpers/areArraysEqual';
import { createDotFromStringArrayTrace } from '@/helpers/createDotFromStringArrayTrace';
import { doesArrayContainArray } from '@/helpers/doesArrayContainArray';
import { shortenTrace } from '@/helpers/shortenTrace';
import { AlphaMinerConfigurationType } from '@/models/schemas/AlphaMinerConfiguration';
import { TooltipWrapper } from '@/wrappers/TooltipWrapper';
import Graphviz from 'graphviz-react';

type VisibleTracesTriggerProps = {
    traces: TraceWithOccurence[];
    form: UseFormReturn<AlphaMinerConfigurationType>;
    mine: (values: any) => Promise<void>; // eslint-disable-line @typescript-eslint/no-explicit-any
};

export const VisibleTracesTrigger: React.FC<VisibleTracesTriggerProps> = ({
    traces,
    form,
    mine,
}) => {
    const [invisTraces, setInvisTraces] = useState<string[][]>(
        form.getValues().invisibleTraces
    );

    const formWatch = form.watch();

    const handleSubmit = () => {
        form.setValue('invisibleTraces', invisTraces);
        formWatch.invisibleTraces = invisTraces;
        mine(formWatch);
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
                    <TableHead className="w-full">Trace</TableHead>
                    <TableHead className="w-1/10">Occurences</TableHead>
                    <TableHead className="w-1/10">Enable</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {traces.map((trace, index) => {
                    const traceString = shortenTrace(trace.trace, 2);
                    const dot = createDotFromStringArrayTrace(trace.trace);
                    const dotComponent = (
                        <Graphviz
                            dot={dot}
                            className="w-[100px]"
                            options={{
                                zoom: true,
                                useWorker: false,
                                width: '100px',
                            }}
                        />
                    );

                    return (
                        <TableRow key={index}>
                            <TableCell>
                                <TooltipWrapper
                                    side="left"
                                    tooltipContent={dotComponent}
                                >
                                    <p>{traceString}</p>
                                </TooltipWrapper>
                            </TableCell>
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
                <Button className="w-1/2">Traces</Button>
            </DialogTrigger>
            <DialogContent className="max-w-xl">
                <DialogHeader>
                    <DialogTitle>Set Traces</DialogTitle>
                    <DialogDescription>
                        You can edit out Traces from the model here.<br></br>To
                        view the whole trace, hover over it.
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
