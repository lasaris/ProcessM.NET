import conformance from '@/api/conformance';
import { ConformanceDeclare } from '@/models/API/ConformanceDeclare';
import { Event } from '@/models/API/Event';
import { TraceEvaluation } from '@/models/TraceEvaluation';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useModelsDb } from '../useModelsDb';

export const useConformance = () => {
    const { fetchSingleModel } = useModelsDb();
    const { entityName } = useParams();
    const [traceEvaluation, setTraceEvaluation] = useState<
        TraceEvaluation | undefined
    >(undefined);

    const { data, isPending, isError, mutate, reset } = useMutation({
        mutationFn: async (events: Event[]) => {
            if (!entityName) {
                return;
            }

            const model = await fetchSingleModel(entityName);

            if (!model.declareModelJson) {
                return;
            }

            const conformanceInput: ConformanceDeclare = {
                DeclareModel: JSON.parse(JSON.parse(model.declareModelJson)),
                Trace: events,
            };

            return conformance.conformanceCheck(conformanceInput);
        },
        onSuccess: (responseData) => {
            setTraceEvaluation({
                overallTraceHealthiness:
                    responseData?.data?.overallTraceHealthiness,
                mostConflictingConstraint:
                    responseData?.data?.mostConflictingConstraint,
                mostConflictingTemplate:
                    responseData?.data?.mostConflictingTemplate,
                mostViolatingConstraint:
                    responseData?.data?.mostViolatingConstraint,
                mostViolatingTemplate:
                    responseData?.data?.mostViolatingTemplate,
                trace: responseData?.data?.trace,
                templateEvaluations: responseData?.data?.templateEvaluations,
            });
        },
    });

    return {
        data,
        traceEvaluation,
        isPending,
        isError,
        checkConformance: mutate,
        resetConformance: () => {
            reset();
            setTraceEvaluation(undefined); // Clear traceEvaluation on reset
        },
    };
};
