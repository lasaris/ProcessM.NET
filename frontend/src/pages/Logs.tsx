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
import Empty from '@/icons/Empty.svg';
import { RightArrow } from '@/icons/RightArrow';
import SpinnerLogo from '@/icons/SpinnerLoader.svg';
import { TargetURL } from '@/router';
import { TooltipWrapper } from '@/wrappers/TooltipWrapper';
import { TrashIcon } from 'lucide-react';
import { useAsync } from 'react-async-hook';
import { useNavigate } from 'react-router-dom';
import { ErrorPage } from './ErrorPage';

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

    if (localLogs.loading) {
        return (
            <div className="flex justify-center items-center w-full h-full">
                <img src={SpinnerLogo} alt="Loading..." className="w-12 h-12" />
            </div>
        );
    }

    if (localLogs.error) {
        toast({
            title: 'Unable to load logs.',
            variant: 'destructive',
        });
        return <ErrorPage />;
    }

    const logs = localLogs.result;

    if (logs && logs.length === 0) {
        return (
            <div className="relative w-full h-full flex flex-col items-center justify-center p-8">
                <div className="w-1/8 items-center justify-center flex flex-col">
                    <img
                        src={Empty}
                        alt="No Logs"
                        className="w-1/8 h-1/8 md:w-1/3 mb-6"
                    />
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">
                    This place is so empty...
                </h1>
                <p className="text-gray-600 text-center mb-4">
                    It seems you haven't imported any logs yet. Start tracking
                    your processes by adding your first log!
                </p>
                <AddLogDialog resetLogs={localLogs.execute} />
            </div>
        );
    }

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-between p-6">
            <div className="flex flex-col items-center w-full h-full">
                <div className="w-11/12 md:w-3/4 xl:w-1/2 mb-6 text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">
                        Logs
                    </h1>
                    <p className="text-gray-600">
                        Select a log to mine or delete. You can also add new
                        logs to the system for analysis.
                    </p>
                </div>

                <div className="w-11/12 md:w-3/4 lg:w-1/2 bg-white shadow-lg rounded-lg p-6 max-h-[60vh] overflow-y-auto">
                    <Table className="w-full">
                        <TableHeader>
                            <TableRow className="border-b">
                                <TableHead className="w-4/5 text-left text-lg font-semibold">
                                    Name
                                </TableHead>
                                <TableHead className="w-1/5 text-right"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {logs &&
                                logs.map((log) => (
                                    <TableRow
                                        key={log.metadata.name}
                                        className="hover:bg-gray-100 transition duration-200"
                                    >
                                        <TableCell className="font-medium">
                                            {log.metadata.name}
                                        </TableCell>
                                        <TableCell className="flex flex-row justify-end gap-2">
                                            <TooltipWrapper
                                                tooltipContent={
                                                    <p>{`${log.metadata.name} operations`}</p>
                                                }
                                            >
                                                <div
                                                    onClick={() =>
                                                        selectLog(
                                                            log.metadata.name
                                                        )
                                                    }
                                                    className="rounded-full w-8 h-8 flex items-center justify-center transition duration-200 cursor-pointer"
                                                >
                                                    <RightArrow />
                                                </div>
                                            </TooltipWrapper>
                                            <TooltipWrapper
                                                tooltipContent={
                                                    <p>{`Delete ${log.metadata.name}`}</p>
                                                }
                                            >
                                                <div className="">
                                                    <div
                                                        onClick={() =>
                                                            handleDeleteLog(
                                                                log.metadata
                                                                    .name
                                                            )
                                                        }
                                                        className="rounded-full w-8 h-8 flex items-center justify-center transition duration-200 cursor-pointer"
                                                    >
                                                        <TrashIcon />
                                                    </div>
                                                </div>
                                            </TooltipWrapper>
                                        </TableCell>
                                        <TableCell className="text-right"></TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <div className="sticky bottom-4 flex justify-end w-full px-4 mt-4">
                <AddLogDialog resetLogs={localLogs.execute} />
            </div>
        </div>
    );
};
