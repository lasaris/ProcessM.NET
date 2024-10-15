import { ConfiguredLog } from '@/models/API/ConfiguredLog';
import { IELWithTimestamp } from '@/models/API/IELWithTimestamp';
import { ImportedEventLog } from '@/models/API/ImportedEventLog';
import { axiosInstance } from './axios';

const uploadLog = (file: FormData) => {
    return axiosInstance.post('/log', file, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

const trySetTimestampFormat = (importedEventLog: ImportedEventLog) => {
    return axiosInstance.post('/log/timestamp', importedEventLog, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const trySetTimestampFormatManual = (
    importedEventLogWithTimestamp: IELWithTimestamp
) => {
    return axiosInstance.post(
        '/log/timestamp/manual',
        importedEventLogWithTimestamp,
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
};

const alphaMine = (configuredLog: ConfiguredLog) => {
    console.log('Alpha mine: ', configuredLog);
    return axiosInstance.post('/log/mine/alpha', configuredLog, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const heuristicMine = (configudLog: ConfiguredLog) => {
    return axiosInstance.post('/log/mine/heuristic', configudLog, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const getEventLog = (importedEventLog: ImportedEventLog) => {
    return axiosInstance.post('/model/conformance/traces', importedEventLog, {
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
