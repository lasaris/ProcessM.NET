import { AddLogDialog } from '@/components/ui/AddLogDialog';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/ShadCN/table';
import { convertUnixTimestampToDateString } from '@/helpers/convertUnixTimestampToDateString';
import { useLogsDb } from '@/hooks/useLogsDb';
import { RightArrow } from '@/icons/RightArrow';
import SpinnerLogo from '@/icons/SpinnerLoader.svg';
import { TargetURL } from '@/router';
import { TooltipWrapper } from '@/wrappers/TooltipWrapper';
import { TrashIcon } from 'lucide-react';
import { useAsync } from 'react-async-hook';
import { useNavigate } from 'react-router-dom';

export const Logs: React.FC = () => {
    const navigate = useNavigate();
    const { fetchAllLogs, deleteLog } = useLogsDb();
    const localLogs = useAsync(fetchAllLogs, []);

    const selectLog = (name: string) => {
        const destination = TargetURL.LOGS_OPERATION;
        navigate(destination.replace(':entityName', name));
    };

    const handleDeleteLog = async (key: string) => {
        const deleteResult = await deleteLog(key);

        if (deleteResult) {
            localLogs.execute();
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
                                <TableHead>Name</TableHead>
                                <TableHead>Activity</TableHead>
                                <TableHead>Case ID</TableHead>
                                <TableHead>Timestamp</TableHead>
                                <TableHead>Size</TableHead>
                                <TableHead>Modified</TableHead>
                                <TableHead>Mine</TableHead>
                                <TableHead className="text-right">
                                    Delete
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {localLogs.result.map((log) => (
                                <TableRow key={log.metadata.name}>
                                    <TableCell className="font-medium">
                                        {log.metadata.name}
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {log.importedLog.activity != null &&
                                        log.importedLog.headers.length >
                                            log.importedLog.activity
                                            ? log.importedLog.headers[
                                                  log.importedLog.activity
                                              ]
                                            : ''}
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {log.importedLog.caseId != null &&
                                        log.importedLog.headers.length >
                                            log.importedLog.caseId
                                            ? log.importedLog.headers[
                                                  log.importedLog.caseId
                                              ]
                                            : ''}
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {log.importedLog.timestamp != null &&
                                        log.importedLog.headers.length >
                                            log.importedLog.timestamp
                                            ? log.importedLog.headers[
                                                  log.importedLog.timestamp
                                              ]
                                            : ''}
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {log.metadata.size} B
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {convertUnixTimestampToDateString(
                                            log.metadata.modified
                                        )}
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
