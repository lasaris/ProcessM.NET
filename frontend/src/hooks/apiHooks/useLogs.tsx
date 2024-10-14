import logsApi from '@/api/logs';
import { useMutation } from '@tanstack/react-query';

export const useLogs = () => {
    const { isPending, data, mutate, isSuccess, isError, reset } = useMutation({
        mutationFn: (file: FormData) => logsApi.uploadLog(file),
    });

    return {
        uploadLog: mutate,
        data,
        isPending,
        isSuccess,
        isError,
        reset,
    };
};
