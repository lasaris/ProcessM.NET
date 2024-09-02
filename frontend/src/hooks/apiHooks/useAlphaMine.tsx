import logsApi from '@/api/logs';
import { MineConfiguration } from '@/models/API/ConfiguredLog';
import { useQuery } from '@tanstack/react-query';
import { useLogsDb } from '../useLogsDb';

export const useAlphaMine = (
    logName: string,
    configuration: MineConfiguration
) => {
    const { fetchSingleLog } = useLogsDb();
    const { data, isLoading, isError } = useQuery({
        queryKey: ['data', configuration],
        retry: 1,
        queryFn: async () => {
            const configuredLog = await fetchSingleLog(logName);
            console.log('This is the config: ', configuration);
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
