import conformance from '@/api/conformance';
import { AlignmentConformance } from '@/models/API/AlignmentConformance';
import { Event } from '@/models/API/Event';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useModelsDb } from '../useModelsDb';

export const useAlignment = () => {
    const { fetchSingleModel } = useModelsDb();
    const { entityName } = useParams();
    const { data, isPending, isError, mutate, reset } = useMutation({
        mutationFn: async (events: Event[]) => {
            if (!entityName) {
                return;
            }

            const model = await fetchSingleModel(entityName);

            if (!model.petriNet) {
                return;
            }

            const conformanceInput: AlignmentConformance = {
                petriNet: model.petriNet,
                trace: events,
            };

            return conformance.alignmentCheck(conformanceInput);
        },
    });

    return {
        data,
        isPending,
        isError,
        getOptimalAlignmentForTrace: mutate,
        resetOptimalTraceAlignment: reset,
    };
};
