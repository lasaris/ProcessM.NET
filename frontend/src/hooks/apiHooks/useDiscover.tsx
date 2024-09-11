import discover from '@/api/discover';
import { DiscoverLog } from '@/models/API/DiscoverLog';
import { useDiscoverStore } from '@/store/useDiscoverStore';
import { useQuery } from '@tanstack/react-query';
import { useLogsDb } from '../useLogsDb';

export const useDiscover = (logName: string) => {
    const { fetchSingleLog } = useLogsDb();
    const { configurations } = useDiscoverStore();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['data'],
        retry: 1,
        queryFn: async () => {
            const importedEventLog = (await fetchSingleLog(logName))
                .importedLog;

            const discoverLog: DiscoverLog = {
                importedEventLog: importedEventLog,
                parametrizedTemplates: configurations,
            };

            return await discover.discoverLog(discoverLog);
        },
    });

    return {
        data,
        isLoading,
        isError,
    };
};
