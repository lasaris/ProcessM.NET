import { axiosInstance } from './axios';

const uploadLog = (file: FormData) => {
    return axiosInstance.post('/log', file, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

const logsApi = {
    uploadLog,
};

export default logsApi;
