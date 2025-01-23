import discover from '@/api/discover';
import { useQuery } from '@tanstack/react-query';

export const useDiscoverTemplates = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: [],
        retry: 1,
        queryFn: () => {
            return discover.getTemplates();
        },
    });

    return {
        data,
        isLoading,
        isError,
    };
};
