import { ConfiguredLog } from '@/models/API/ConfiguredLog';
import { IELWithTimestamp } from '@/models/API/IELWithTimestamp';
import { ImportedEventLog } from '@/models/API/ImportedEventLog';
import { axiosInstance } from './axios';

const uploadLog = (file: FormData) => {
    return axiosInstance.post('/import/log', file, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

const trySetTimestampFormat = (importedEventLog: ImportedEventLog) => {
    return axiosInstance.post('/import/log/timestamp', importedEventLog, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const trySetTimestampFormatManual = (
    importedEventLogWithTimestamp: IELWithTimestamp
) => {
    return axiosInstance.post(
        '/import/log/timestamp/format',
        importedEventLogWithTimestamp,
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
};

const alphaMine = (configuredLog: ConfiguredLog) => {
    return axiosInstance.post('/mine/imperative/alpha', configuredLog, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const heuristicMine = (configudLog: ConfiguredLog) => {
    return axiosInstance.post('/mine/imperative/heuristic', configudLog, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const getEventLog = (importedEventLog: ImportedEventLog) => {
    return axiosInstance.post('/conformance/model/traces', importedEventLog, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const logsApi = {
    uploadLog,
    alphaMine,
    heuristicMine,
    getEventLog,
    trySetTimestampFormat,
    trySetTimestampFormatManual,
};

export default logsApi;
