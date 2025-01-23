import { DiscoverLog } from '@/models/API/DiscoverLog';
import { axiosInstance } from './axios';

const discoverLog = (discoverLog: DiscoverLog) => {
    return axiosInstance.post('/mine/declare', discoverLog, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const getTemplates = () => {
    return axiosInstance.get('/mine/declare/templates');
};

const discover = {
    discoverLog,
    getTemplates,
};

export default discover;
