import conformance from '@/api/conformance';
import { Conformance } from '@/models/API/Conformance';
import { Event } from '@/models/API/Event';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useModelsDb } from '../useModelsDb';

export const useConformance = () => {
    const { fetchSingleModel } = useModelsDb();
    const { entityName } = useParams();
    const { data, isPending, isError, mutate } = useMutation({
        mutationFn: async (events: Event[]) => {
            if (!entityName) {
                return;
            }

            const model = await fetchSingleModel(entityName);

            if (!model.declareModelJson) {
                return;
            }

            const conformanceInput: Conformance = {
                DeclareModel: JSON.parse(JSON.parse(model.declareModelJson)),
                Trace: events,
            };

            return conformance.conformanceCheck(conformanceInput);
        },
    });

    return {
        data,
        isPending,
        isError,
        checkConformance: mutate,
    };
};
