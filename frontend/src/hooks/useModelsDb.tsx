import { useToast } from '@/components/ui/use-toast';
import {
    STORES,
    addData,
    deleteStoreData,
    getStoreData,
    getStoreObject,
    initDB,
} from '@/db/db';
import { ModelDB } from '@/models/ModelDB';

export const useModelsDb = () => {
    const { toast } = useToast();
    const handleInitDB = async (): Promise<boolean> => {
        const status = await initDB();
        return status;
    };

    const addIntoDb = async (data: ModelDB, key: string): Promise<boolean> => {
        const initDbAttempt = await handleInitDB();
        if (!initDbAttempt) {
            return false;
        }

        try {
            await addData(STORES.Models, { data, key });

            toast({
                title: `Successfully added model: ${key}!`,
            });

            return true;
        } catch (err: unknown) {
            if (err instanceof Error) {
                toast({
                    title: `Unable to add model ${key}`,
                    description: `${err.message}`,
                    variant: 'destructive',
                });
            } else {
                toast({
                    title: `Unable to add model ${key}`,
                    variant: 'destructive',
                });
            }
        }

        return false;
    };

    const fetchAllModels = async (): Promise<ModelDB[]> => {
        const initDbAttempt = await handleInitDB();

        if (!initDbAttempt) {
            toast({
                title: 'Unable to connect to indexed database',
                variant: 'destructive',
            });
        }

        const models = await getStoreData<ModelDB>(STORES.Models);
        return models;
    };

    const fetchAllModelsByLogName = async (
        logName?: string
    ): Promise<ModelDB[]> => {
        const initDbAttempt = await handleInitDB();

        if (!initDbAttempt) {
            toast({
                title: 'Unable to connect to indexed database',
                variant: 'destructive',
            });
        }

        const models = await getStoreData<ModelDB>(STORES.Models);

        const result = models.filter((model) => model.eventLogName === logName);
        return result;
    };

    const fetchSingleModel = async (key: string): Promise<ModelDB> => {
        const initDbAttempt = await handleInitDB();

        if (!initDbAttempt) {
            toast({
                title: 'Unable to connect to indexed database',
                variant: 'destructive',
            });
        }

        try {
            const model = await getStoreObject<ModelDB>(STORES.Models, key);

            if (model === undefined) {
                toast({
                    title: `Unable to find the model: "${key}"`,
                    variant: 'destructive',
                });

                throw new Error('Unable to find the model');
            }

            return model;
        } catch (err) {
            throw err;
        }
    };

    const deleteModel = async (key: string): Promise<boolean> => {
        const initDbAttempt = await handleInitDB();

        if (!initDbAttempt) {
            toast({
                title: 'Unable to connect to indexed database',
                variant: 'destructive',
            });
        }

        const deleteResult = await deleteStoreData(STORES.Models, key);

        if (deleteResult) {
            toast({
                title: 'Successfully Deleted Model',
            });
        } else {
            toast({
                title: `Unable to delete model with key: ${key}`,
                variant: 'destructive',
            });
        }

        return deleteResult;
    };

    const deleteModelsForLog = async (keys: string[]): Promise<boolean> => {
        const initDbAttempt = await handleInitDB();

        if (!initDbAttempt) {
            return false;
        }

        const promises: Promise<boolean>[] = [];

        keys.forEach((key) => {
            promises.push(deleteStoreData(STORES.Models, key));
        });

        const results = await Promise.all(promises);

        return !results.includes(false);
    };

    return {
        addIntoDb,
        fetchAllModels,
        fetchAllModelsByLogName,
        fetchSingleModel,
        deleteModel,
        deleteModelsForLog,
    };
};
