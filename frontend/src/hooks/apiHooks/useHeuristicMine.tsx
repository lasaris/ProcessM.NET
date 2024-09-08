import logsApi from '@/api/logs';
import { HeuristicMinerConfigurationType } from '@/models/schemas/HeuristicMinerConfiguration';
import { useQuery } from '@tanstack/react-query';
import { useLogsDb } from '../useLogsDb';

export const useHeuristicMine = (
    logName: string,
    configuration: HeuristicMinerConfigurationType
) => {
    const { fetchSingleLog } = useLogsDb();
    const { data, isLoading, isError } = useQuery({
        queryKey: ['data', configuration],
        retry: 1,
        queryFn: async () => {
            const configuredLog = await fetchSingleLog(logName);
            configuredLog.configuration = configuration;
            return logsApi.heuristicMine(configuredLog);
        },
    });

    return {
        data,
        isLoading,
        isError,
    };
};
