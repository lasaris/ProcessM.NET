import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/ShadCN/table';
import { TraceDTO } from '@/models/API/TraceDTO';
import { CONFORMANCE_TYPE } from '@/models/ConformanceType';
import { XIcon } from 'lucide-react';
import React from 'react';
import { ConformanceResultDialog } from './ConformanceResultDialog';
import { OptimalAlignmentForTraceResultDialog } from './OptimalAlignmentForTraceResultDialog';
import { ViewTraceDialog } from './ViewTraceDialog';

type SelectTraceTableProps = {
    traces: TraceDTO[];
    removeTrace: (trace: TraceDTO) => void;
    conformanceType: CONFORMANCE_TYPE;
};

const headers = ['Case ID', 'View Trace', 'Select Trace', 'Remove'];

export const SelectTraceTable: React.FC<SelectTraceTableProps> = ({
    traces,
    removeTrace,
    conformanceType,
}) => {
    const tableHeader = (
        <TableHeader>
            <TableRow>
                {headers.map((header) => {
                    return <TableHead key={header}>{header}</TableHead>;
                })}
            </TableRow>
        </TableHeader>
    );

    const tableRows = (
        <TableBody>
            {traces.map((trace, index) => {
                return (
                    <TableRow key={index}>
                        <TableCell className="w-1/2">{trace.case}</TableCell>
                        <TableCell className="w-1/6">
                            <ViewTraceDialog trace={trace} />
                        </TableCell>
                        <TableCell className="w-1/6">
                            {conformanceType === CONFORMANCE_TYPE.ALIGNMENT && (
                                <OptimalAlignmentForTraceResultDialog
                                    events={trace.events}
                                />
                            )}
                            {conformanceType === CONFORMANCE_TYPE.DECLARE && (
                                <ConformanceResultDialog
                                    events={trace.events}
                                />
                            )}
                        </TableCell>
                        <TableCell className="w-1/6">
                            <XIcon
                                onClick={() => removeTrace(trace)}
                                className="rounded-full hover:cursor-pointer"
                            />
                        </TableCell>
                    </TableRow>
                );
            })}
        </TableBody>
    );

    return (
        <div className="p-8 w-full h-full lg:w-1/2">
            <Table>
                {tableHeader}
                {tableRows}
            </Table>
        </div>
    );
};
