import logsApi from '@/api/logs';
import { useMutation } from '@tanstack/react-query';
import { useLogsDb } from '../useLogsDb';

export const useEventLog = () => {
    const { fetchSingleLog } = useLogsDb();
    const { data, isPending, isError, mutate, reset } = useMutation({
        mutationKey: ['eventLog'],
        mutationFn: async (logName: string) => {
            const log = await fetchSingleLog(logName);
            return logsApi.getEventLog(log.importedLog);
        },
    });
    return {
        data,
        isPending,
        isError,
        getEventLog: mutate,
        reset,
    };
};
