import logsApi from '@/api/logs';
import { useToast } from '@/components/ui/use-toast';
import { useMutation } from '@tanstack/react-query';

export const useLogs = () => {
    const { toast } = useToast();
    const { isPending, data, mutate, isSuccess, isError, reset } = useMutation({
        mutationFn: (file: FormData) => logsApi.uploadLog(file),
        onError: () => {
            toast({
                title: 'Unable to upload the file',
                variant: 'destructive',
            });
        },
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
