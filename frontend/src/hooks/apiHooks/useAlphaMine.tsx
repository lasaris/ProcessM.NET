import logsApi from '@/api/logs';
import { useQuery } from '@tanstack/react-query';
import { useLogsDb } from '../useLogsDb';

export const useAlphaMine = (logName: string) => {
    const { fetchSingleLog } = useLogsDb();
    const { data, isLoading, isError } = useQuery({
        queryKey: [],
        retry: 1,
        queryFn: async () => {
            const configuredLog = await fetchSingleLog(logName);
            return logsApi.alphaMine(configuredLog);
        },
    });

    return {
        data,
        isLoading,
        isError,
    };
};
