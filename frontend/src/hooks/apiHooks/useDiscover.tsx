import discover from '@/api/discover';
import { useToast } from '@/components/ui/use-toast';
import { DiscoverLog } from '@/models/API/DiscoverLog';
import { useDiscoverStore } from '@/store/useDiscoverStore';
import { useQuery } from '@tanstack/react-query';

export const useDiscover = () => {
    const { configurations, importedEventLog } = useDiscoverStore();
    const { toast } = useToast();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['data'],
        retry: 1,
        queryFn: async () => {
            if (!importedEventLog) {
                toast({
                    title: 'Log Not Set',
                    description: 'Something went wrong. Try again please.',
                    variant: 'destructive',
                });
                throw new Error('Log was not set');
            }

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
