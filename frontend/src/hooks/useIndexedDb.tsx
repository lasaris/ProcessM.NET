import {
    STORES,
    addData,
    deleteStoreData,
    getStoreData,
    initDB,
} from '@/db/db';
import { ConfiguredLog } from '@/models/API/ConfiguredLog';

export const useIndexedDb = () => {
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
            const dbResult = await addData(storeName, { data, key });
            console.log(
                'Successfully uploaded data into the local indexed db: ',
                dbResult
            );
            return true;
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.log('There was some error');
            } else {
                console.log('This is another issue');
            }
        }

        return false;
    };

    const fetchAllLogs = async (): Promise<ConfiguredLog[]> => {
        const logs = await getStoreData<ConfiguredLog>(STORES.Logs);
        return logs;
    };

    const deleteLog = async (logKey: string): Promise<boolean> => {
        const deleteResult = await deleteStoreData(STORES.Logs, logKey);
        return deleteResult;
    };

    return {
        addIntoDb,
        fetchAllLogs,
        deleteLog,
    };
};
