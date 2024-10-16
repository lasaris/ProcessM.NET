import logsApi from '@/api/logs';
import { useToast } from '@/components/ui/use-toast';
import { SelectLogType } from '@/models/schemas/SelectLog';
import { useMutation } from '@tanstack/react-query';
import { useLogsDb } from '../useLogsDb';

export const useEventLog = () => {
    const { fetchSingleLog } = useLogsDb();
    const { toast } = useToast();
    const { data, isPending, isError, mutate, reset } = useMutation({
        mutationKey: ['eventLog'],
        mutationFn: async (values: SelectLogType) => {
            const log = await fetchSingleLog(values.name);

            if (!log) {
                toast({
                    title: 'Unable to fetch the log',
                    variant: 'destructive',
                });
                throw new Error('Unable to find the log');
            }

            const caseIdIndex = log.importedLog.headers.findIndex(
                (header) => header === values.caseId
            );

            const activityIndex = log.importedLog.headers.findIndex(
                (header) => header === values.activity
            );

            if (caseIdIndex === -1 || activityIndex === -1) {
                toast({
                    title: 'Unable to find caseId or activity in the headers',
                    variant: 'destructive',
                });

                throw new Error('Incorrect activity or activity');
            }

            log.importedLog.activity = activityIndex;
            log.importedLog.caseId = caseIdIndex;

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
