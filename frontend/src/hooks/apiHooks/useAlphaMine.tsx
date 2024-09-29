import logsApi from '@/api/logs';
import { AlphaMinerConfigurationType } from '@/models/schemas/AlphaMinerConfiguration';
import { useQuery } from '@tanstack/react-query';
import { useLogsDb } from '../useLogsDb';

export const useAlphaMine = (
    logName: string,
    configuration: AlphaMinerConfigurationType
) => {
    const { fetchSingleLog } = useLogsDb();
    const { data, isLoading, isError } = useQuery({
        queryKey: ['data', configuration],
        retry: 1,
        queryFn: async () => {
            const configuredLog = await fetchSingleLog(logName);
            configuredLog.configuration = configuration;
            return logsApi.alphaMine(configuredLog);
        },
    });

    return {
        data,
        isLoading,
        isError,
    };
};
