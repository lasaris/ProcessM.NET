import { AddLogDialog } from '@/components/ui/AddLogDialog';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { RightArrow } from '@/icons/RightArrow';
import { ImperativeLog } from '@/models/ImperativeLog';
import { TargetURL } from '@/router';
import { TooltipWrapper } from '@/wrappers/TooltipWrapper';
import { TrashIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const logs: ImperativeLog[] = [
    {
        name: 'Log Aardvark',
        activity: 'act',
        caseId: 'id',
        timestamp: '',
        size: '252 B',
        modified: '16.02.2024 14:41',
    },
    {
        name: 'Log Banarama',
        activity: 'act',
        caseId: 'id',
        timestamp: '',
        size: '252 B',
        modified: '16.02.2024 14:41',
    },
    {
        name: 'Log Catastrophe',
        activity: 'act',
        caseId: 'id',
        timestamp: '',
        size: '252 B',
        modified: '16.02.2024 14:41',
    },
    {
        name: 'Log Doodlebug',
        activity: 'act',
        caseId: 'id',
        timestamp: '',
        size: '252 B',
        modified: '16.02.2024 14:41',
    },
    {
        name: 'Log Eggcellent',
        activity: 'act',
        caseId: 'id',
        timestamp: '',
        size: '252 B',
        modified: '16.02.2024 14:41',
    },
    {
        name: 'Log Fandango',
        activity: 'act',
        caseId: 'id',
        timestamp: '',
        size: '252 B',
        modified: '16.02.2024 14:41',
    },
];

export const Logs: React.FC = () => {
    const navigate = useNavigate();

    const selectLog = (name: string) => {
        const destination = TargetURL.LOGS_OPERATION;
        navigate(destination.replace(':logName', name));
    };

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-between">
            <div className="w-11/12 md:w-3/4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Activity</TableHead>
                            <TableHead>Case ID</TableHead>
                            <TableHead>Timestamp</TableHead>
                            <TableHead>Size</TableHead>
                            <TableHead>Modified</TableHead>
                            <TableHead>Mine</TableHead>
                            <TableHead className="text-right">Delete</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {logs.map((log) => (
                            <TableRow key={log.name}>
                                <TableCell className="font-medium">
                                    {log.name}
                                </TableCell>
                                <TableCell className="font-medium">
                                    {log.activity}
                                </TableCell>
                                <TableCell className="font-medium">
                                    {log.caseId}
                                </TableCell>
                                <TableCell className="font-medium">
                                    {log.timestamp}
                                </TableCell>
                                <TableCell className="font-medium">
                                    {log.size}
                                </TableCell>
                                <TableCell className="font-medium">
                                    {log.modified}
                                </TableCell>
                                <TableCell>
                                    <TooltipWrapper
                                        tooltipTitle={`Mine ${log.name}`}
                                    >
                                        <div
                                            onClick={() => selectLog(log.name)}
                                            className="rounded-full bg-slate-400 w-8 h-8 flex items-center justify-center hover:shadow-lg hover:cursor-pointer"
                                        >
                                            <RightArrow />
                                        </div>
                                    </TooltipWrapper>
                                </TableCell>
                                <TableCell className="">
                                    <div className="flex justify-end">
                                        <div className="rounded-full bg-slate-400 w-8 h-8 flex items-center justify-center hover:shadow-lg hover:cursor-pointer">
                                            <TrashIcon />
                                        </div>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className="sticky bottom-4 flex justify-end w-full px-4">
                <AddLogDialog />
            </div>
        </div>
    );
};
