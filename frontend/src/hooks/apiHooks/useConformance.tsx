import conformance from '@/api/conformance';
import { ConformanceDeclare } from '@/models/API/ConformanceDeclare';
import { Event } from '@/models/API/Event';
import { TraceEvaluation } from '@/models/TraceEvaluation';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useModelsDb } from '../useModelsDb';

export const useConformance = () => {
    const { fetchSingleModel } = useModelsDb();
    const { entityName } = useParams();
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
    });

    const traceEvaluation: TraceEvaluation | undefined =
        isPending || !data
            ? undefined
            : {
                  overallTraceHealthiness: data?.data?.overallTraceHealthiness,
                  mostConflictingConstraint:
                      data?.data?.mostConflictingConstraint,
                  mostConflictingTemplate: data?.data?.mostConflictingTemplate,
                  mostViolatingConstraint: data?.data?.mostViolatingConstraint,
                  mostViolatingTemplate: data?.data?.mostViolatingTemplate,
                  trace: data?.data?.trace,
                  templateEvaluations: data?.data?.templateEvaluations,
              };

    return {
        data,
        traceEvaluation,
        isPending,
        isError,
        checkConformance: mutate,
        resetConformance: reset,
    };
};
