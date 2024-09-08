import modelExport from '@/api/export';
import { useToast } from '@/components/ui/use-toast';
import { exportPnml } from '@/helpers/exportPnml';
import { AlphaMinerConfigurationType } from '@/models/schemas/AlphaMinerConfiguration';
import { HeuristicMinerConfigurationType } from '@/models/schemas/HeuristicMinerConfiguration';
import { useMutation } from '@tanstack/react-query';
import { useLogsDb } from '../useLogsDb';

export const useModelExport = (logName: string) => {
    const { toast } = useToast();
    const { fetchSingleLog } = useLogsDb();
    const {
        data: alphaPnml,
        mutate: alphaPnmlExport,
        error: alphaPnmlError,
    } = useMutation({
        mutationFn: async (
            alphaMineConfiguration: AlphaMinerConfigurationType
        ) => {
            const log = await fetchSingleLog(logName);
            log.configuration = alphaMineConfiguration;
            const model = await modelExport.alphaExportPnml(log);
            if (model.data) {
                exportPnml(logName, model.data);
            }
            toast({
                title: 'Successfully Exported PNML',
            });
        },
    });
    const {
        data: heuristicPnml,
        mutate: heuristicPnmlExport,
        error: heuristicPnmlError,
    } = useMutation({
        mutationFn: async (
            alphaMineConfiguration: HeuristicMinerConfigurationType
        ) => {
            const log = await fetchSingleLog(logName);
            log.configuration = alphaMineConfiguration;
            const model = await modelExport.heuristicExportPnml(log);
            if (model.data) {
                exportPnml(logName, model.data);
            }
            toast({
                title: 'Successfully Exported PNML',
            });
        },
    });

    if (alphaPnmlError) {
        toast({
            title: `Unable to export PNML`,
            description: `${alphaPnmlError.message}`,
            variant: 'destructive',
        });
    }

    if (heuristicPnmlError) {
        toast({
            title: `Unable to export PNML`,
            description: `${heuristicPnmlError.message}`,
            variant: 'destructive',
        });
    }

    return {
        alphaPnml,
        alphaPnmlExport,
        heuristicPnml,
        heuristicPnmlExport,
    };
};
