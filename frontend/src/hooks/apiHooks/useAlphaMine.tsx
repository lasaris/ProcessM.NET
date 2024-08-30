import logsApi from '@/api/logs';
import { useQuery } from '@tanstack/react-query';
import { useIndexedDb } from '../useIndexedDb';

export const useAlphaMine = (logName: string) => {
    const { fetchSingleLog } = useIndexedDb();
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
