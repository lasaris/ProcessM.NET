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
import { TooltipWrapper } from '@/wrappers/TooltipWrapper';
import { useNavigate } from 'react-router-dom';

const logs: ImperativeLog[] = [
    {
        name: 'Log Aardvark',
    },
    {
        name: 'Log Bananarama',
    },
    {
        name: 'Log Catastrophe',
    },
    {
        name: 'Log Doodlebug',
    },
    {
        name: 'Log Eggcellent',
    },
    {
        name: 'Log Fandango',
    },
];

export const ImperativeLogs: React.FC = () => {
    const navigate = useNavigate();

    const mineLog = (name: string) => {
        navigate(`/imperative/mine/${name}`);
    };

    return (
        <div className="w-11/12 md:w-3/4">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead className="text-right"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {logs.map((log) => (
                        <TableRow key={log.name}>
                            <TableCell className="font-medium">
                                {log.name}
                            </TableCell>
                            <TableCell className="flex items-end justify-end">
                                <TooltipWrapper
                                    tooltipTitle={`Mine ${log.name}`}
                                >
                                    <div
                                        onClick={() => mineLog(log.name)}
                                        className="rounded-full bg-slate-400 w-8 h-8 flex items-center justify-center hover:shadow-lg hover:cursor-pointer"
                                    >
                                        <RightArrow />
                                    </div>
                                </TooltipWrapper>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <AddLogDialog />
        </div>
    );
};
