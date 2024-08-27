import { STORES, addData, getStoreData, initDB } from '@/db/db';
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
        console.log('Started fetching all logs');
        const logs = await getStoreData<ConfiguredLog>(STORES.Logs);
        console.log('Fetched all logs: ', logs);
        return logs;
    };

    return {
        addIntoDb,
        fetchAllLogs,
    };
};
