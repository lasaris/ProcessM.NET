import { ConfiguredLog } from '@/models/API/ConfiguredLog';
import { axiosInstance } from './axios';

const alphaExportPnml = (configuredLog: ConfiguredLog) => {
    return axiosInstance.post('/export/pnml/alpha', configuredLog, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const heuristicExportPnml = (configuredLog: ConfiguredLog) => {
    return axiosInstance.post('/export/pnml/heuristic', configuredLog, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const modelExport = {
    alphaExportPnml,
    heuristicExportPnml,
};

export default modelExport;
