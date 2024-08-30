import { ConfiguredLog } from '@/models/API/ConfiguredLog';
import { axiosInstance } from './axios';

const uploadLog = (file: FormData) => {
    return axiosInstance.post('/log', file, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

const alphaMine = (configuredLog: ConfiguredLog) => {
    return axiosInstance.post('/log/alpha', configuredLog, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const logsApi = {
    uploadLog,
    alphaMine,
};

export default logsApi;
