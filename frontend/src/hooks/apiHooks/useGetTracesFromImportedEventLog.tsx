import logsApi from '@/api/logs';
import { useToast } from '@/components/ui/use-toast';
import { ImportedEventLog } from '@/models/API/ImportedEventLog';
import { TraceDTO } from '@/models/API/TraceDTO';
import { useMutation } from '@tanstack/react-query';

export const useGetTracesFromImportedEventLog = (
    onSuccessFunction: (traces: TraceDTO[]) => void
) => {
    const { toast } = useToast();
    const { data, mutate, isError, isSuccess, isPending, reset } = useMutation({
        mutationFn: async (importedEventLog: ImportedEventLog) => {
            return logsApi.getEventLog(importedEventLog);
        },
        onSuccess: (data) => {
            toast({
                title: 'Successfully imported traces',
                variant: 'default',
            });

            const traces = data.data as TraceDTO[];
            onSuccessFunction(traces);
        },
    });

    return {
        data,
        getTraces: mutate,
        isError,
        isSuccess,
        isPending,
        reset,
    };
};
