import logsApi from '@/api/logs';
import { ImportedEventLog } from '@/models/API/ImportedEventLog';
import { useMutation } from '@tanstack/react-query';

export const useTrySetTimestampFormat = () => {
    const { isPending, data, mutate, isSuccess, isError, reset } = useMutation({
        mutationFn: (importedEventLog: ImportedEventLog) =>
            logsApi.trySetTimestampFormat(importedEventLog),
    });

    return {
        trySetTimestamp: mutate,
        timestampFormat: data,
        isPending,
        isSuccess,
        isError,
        reset,
    };
};
