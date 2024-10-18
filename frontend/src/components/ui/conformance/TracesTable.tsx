import { Button } from '@/components/ui/ShadCN/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/ShadCN/table';
import { TraceDTO } from '@/models/API/TraceDTO';
import { CheckIcon, XIcon } from 'lucide-react';
import React, { useState } from 'react';

type TracesTableProps = {
    traces: TraceDTO[];
    addTraces: (traces: TraceDTO[]) => void;
    closeDialog: () => void;
};

const tracesTableHeaders = ['Add', 'Case'];

export const TracesTable: React.FC<TracesTableProps> = ({
    traces,
    addTraces,
    closeDialog,
}) => {
    const [selectedTraces, setSelectedTraces] = useState<TraceDTO[]>([]);

    const addOrRemoveTrace = (trace: TraceDTO) => {
        setSelectedTraces((prevState) => {
            if (prevState.some((t) => t.case === trace.case)) {
                return prevState.filter((t) => t.case !== trace.case);
            }

            return [...prevState, trace];
        });
    };

    const submitHandler = () => {
        addTraces(selectedTraces);
        closeDialog();
    };

    const isTraceSelected = (trace: TraceDTO): boolean => {
        return selectedTraces.some((t) => t.case === trace.case);
    };

    const tableHeaders = (
        <TableHeader>
            <TableRow>
                {tracesTableHeaders.map((header) => {
                    return <TableHead key={header}>{header}</TableHead>;
                })}
            </TableRow>
        </TableHeader>
    );

    const tableRows = (
        <TableBody>
            {traces.map((trace, index) => {
                return (
                    <TableRow
                        onClick={() => addOrRemoveTrace(trace)}
                        key={index}
                    >
                        <TableCell>
                            {isTraceSelected(trace) ? <CheckIcon /> : <XIcon />}
                        </TableCell>
                        <TableCell>{trace.case}</TableCell>
                    </TableRow>
                );
            })}
        </TableBody>
    );

    return (
        <div className="flex flex-col gap-3 max-h-60">
            <Table>
                {tableHeaders}
                {tableRows}
            </Table>
            <Button onClick={submitHandler}>Add Selected Traces!</Button>
        </div>
    );
};
