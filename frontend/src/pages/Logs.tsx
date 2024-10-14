import { AddLogDialog } from '@/components/ui/AddLogDialog';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/ShadCN/table';
import { useToast } from '@/components/ui/use-toast';
import { useLogsDb } from '@/hooks/useLogsDb';
import { useModelsDb } from '@/hooks/useModelsDb';
import { RightArrow } from '@/icons/RightArrow';
import SpinnerLogo from '@/icons/SpinnerLoader.svg';
import { TargetURL } from '@/router';
import { TooltipWrapper } from '@/wrappers/TooltipWrapper';
import { TrashIcon } from 'lucide-react';
import { useAsync } from 'react-async-hook';
import { useNavigate } from 'react-router-dom';

export const Logs: React.FC = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const { fetchAllLogs, deleteLog } = useLogsDb();
    const { deleteModelsForLog, fetchAllModelsByLogName } = useModelsDb();
    const localLogs = useAsync(fetchAllLogs, []);

    const selectLog = (name: string) => {
        const destination = TargetURL.LOGS_OPERATION;
        navigate(destination.replace(':entityName', name));
    };

    const handleDeleteLog = async (key: string) => {
        const deleteResult = await deleteLog(key);
        const modelsToDelete = await fetchAllModelsByLogName(key);
        const deleteModelsResult = await deleteModelsForLog(
            modelsToDelete.map((model) => model.name)
        );

        if (deleteResult && deleteModelsResult) {
            localLogs.execute();
        } else {
            toast({
                title: `Unable to delete log with key: ${key}`,
                variant: 'destructive',
            });
        }
    };

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-between">
            {localLogs.loading && <img src={SpinnerLogo} alt="loader" />}
            {!localLogs.loading && localLogs.result !== undefined && (
                <div className="w-11/12 md:w-3/4">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-4/5">Name</TableHead>
                                {/* <TableHead></TableHead>
                                <TableHead className="text-right"></TableHead> */}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {localLogs.result.map((log) => (
                                <TableRow key={log.metadata.name}>
                                    <TableCell className="font-medium">
                                        {log.metadata.name}
                                    </TableCell>
                                    <TableCell>
                                        <TooltipWrapper
                                            tooltipTitle={`Mine ${log.metadata.name}`}
                                        >
                                            <div
                                                onClick={() =>
                                                    selectLog(log.metadata.name)
                                                }
                                                className="rounded-full bg-slate-400 w-8 h-8 flex items-center justify-center hover:shadow-lg hover:cursor-pointer"
                                            >
                                                <RightArrow />
                                            </div>
                                        </TooltipWrapper>
                                    </TableCell>
                                    <TableCell className="">
                                        <div className="flex justify-end">
                                            <div
                                                onClick={() =>
                                                    handleDeleteLog(
                                                        log.metadata.name
                                                    )
                                                }
                                                className="rounded-full bg-slate-400 w-8 h-8 flex items-center justify-center hover:shadow-lg hover:cursor-pointer"
                                            >
                                                <TrashIcon />
                                            </div>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
            <div className="sticky bottom-4 flex justify-end w-full px-4">
                <AddLogDialog resetLogs={localLogs.execute} />
            </div>
        </div>
    );
};
