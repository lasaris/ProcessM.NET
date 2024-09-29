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

    const fetchSingleModel = async (key: string): Promise<ModelDB> => {
        const initDbAttempt = await handleInitDB();

        if (!initDbAttempt) {
            toast({
                title: 'Unable to connect to indexed database',
                variant: 'destructive',
            });
        }

        const model = await getStoreObject<ModelDB>(STORES.Models, key);
        return model;
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

    return {
        addIntoDb,
        fetchAllModels,
        fetchSingleModel,
        deleteModel,
    };
};
