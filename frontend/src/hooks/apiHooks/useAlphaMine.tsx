import logsApi from '@/api/logs';
import { useToast } from '@/components/ui/use-toast';
import { AlphaMinerConfigurationType } from '@/models/schemas/AlphaMinerConfiguration';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useLogsDb } from '../useLogsDb';

export const useAlphaMine = () => {
    const { fetchSingleLog } = useLogsDb();
    const { entityName: logName } = useParams();
    const { toast } = useToast();
    const { data, isPending, isError, mutate } = useMutation({
        retry: 1,
        mutationFn: async (configuration: AlphaMinerConfigurationType) => {
            const configuredLog = await fetchSingleLog(logName || '');

            if (!configuredLog) {
                toast({
                    title: 'Unable to fetch log',
                    variant: 'destructive',
                });
                return;
            }

            configuredLog.configuration = configuration;

            const caseIdIndex = configuredLog.importedLog.headers.findIndex(
                (header) => header === configuration.caseId
            );
            const activityIndex = configuredLog.importedLog.headers.findIndex(
                (header) => header === configuration.activity
            );

            configuredLog.importedLog.caseId = caseIdIndex;
            configuredLog.importedLog.activity = activityIndex;

            return logsApi.alphaMine(configuredLog);
        },
    });

    return {
        data,
        isPending,
        isError,
        mine: mutate,
    };
};
