import logsApi from '@/api/logs';
import { useToast } from '@/components/ui/use-toast';
import { HeuristicMinerConfigurationType } from '@/models/schemas/HeuristicMinerConfiguration';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useLogsDb } from '../useLogsDb';

export const useHeuristicMine = () => {
    const { toast } = useToast();
    const { entityName: logName } = useParams();
    const { fetchSingleLog } = useLogsDb();
    const { data, isPending, isError, mutate } = useMutation({
        retry: 1,
        mutationFn: async (configuration: HeuristicMinerConfigurationType) => {
            const configuredLog = await fetchSingleLog(logName || '');
            configuredLog.configuration = configuration;

            const caseIdIndex = configuredLog.importedLog.headers.findIndex(
                (header) => header === configuration.caseId
            );
            const activityIndex = configuredLog.importedLog.headers.findIndex(
                (header) => header === configuration.activity
            );

            if (caseIdIndex === -1 || activityIndex === -1) {
                toast({
                    title: 'You need to select Case ID and Activity columns',
                    variant: 'destructive',
                });
                return;
            }

            configuredLog.importedLog.caseId = caseIdIndex;
            configuredLog.importedLog.activity = activityIndex;

            return logsApi.heuristicMine(configuredLog);
        },
    });

    return {
        data,
        isPending,
        isError,
        mine: mutate,
    };
};
