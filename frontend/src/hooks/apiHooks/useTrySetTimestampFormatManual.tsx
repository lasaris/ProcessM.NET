import logsApi from '@/api/logs';
import { IELWithTimestamp } from '@/models/API/IELWithTimestamp';
import { useMutation } from '@tanstack/react-query';

export const useTrySetTimestampFormatManual = () => {
    const { isPending, mutate, isSuccess, isError, reset } = useMutation({
        mutationFn: (importedEventLog: IELWithTimestamp) =>
            logsApi.trySetTimestampFormatManual(importedEventLog),
    });

    return {
        trySetTimestampManual: mutate,
        isPending,
        isSuccess,
        isError,
        reset,
    };
};
