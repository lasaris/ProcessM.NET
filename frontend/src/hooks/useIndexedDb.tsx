import { useToast } from '@/components/ui/use-toast';
import {
    STORES,
    addData,
    deleteStoreData,
    getStoreData,
    getStoreObject,
    initDB,
} from '@/db/db';
import { ConfiguredLog } from '@/models/API/ConfiguredLog';

export const useIndexedDb = () => {
    const { toast } = useToast();
    const handleInitDB = async (): Promise<boolean> => {
        const status = await initDB();
        return status;
    };

    const addIntoDb = async <T,>(
        data: T,
        storeName: string,
        key: string
    ): Promise<boolean> => {
        const initDbAttempt = await handleInitDB();
        if (!initDbAttempt) {
            console.log('Unable to connect to indexed database');
            return false;
        }

        try {
            await addData(storeName, { data, key });

            toast({
                title: `Successfully added log: ${key}!`,
            });

            return true;
        } catch (err: unknown) {
            if (err instanceof Error) {
                toast({
                    title: `Unable to add log ${key}`,
                    description: `${err.message}`,
                    variant: 'destructive',
                });
            } else {
                toast({
                    title: `Unable to add log ${key}`,
                    variant: 'destructive',
                });
            }
        }

        return false;
    };

    const fetchAllLogs = async (): Promise<ConfiguredLog[]> => {
        const logs = await getStoreData<ConfiguredLog>(STORES.Logs);
        return logs;
    };

    const fetchSingleLog = async (key: string): Promise<ConfiguredLog> => {
        const log = await getStoreObject<ConfiguredLog>(STORES.Logs, key);
        return log;
    };

    const deleteLog = async (logKey: string): Promise<boolean> => {
        const deleteResult = await deleteStoreData(STORES.Logs, logKey);

        if (deleteResult) {
            toast({
                title: 'Successfully Deleted Log',
            });
        } else {
            toast({
                title: `Unable to delete log with key: ${logKey}`,
                variant: 'destructive',
            });
        }

        return deleteResult;
    };

    return {
        addIntoDb,
        fetchAllLogs,
        fetchSingleLog,
        deleteLog,
    };
};
