import { DiscoverLog } from '@/models/API/DiscoverLog';
import { axiosInstance } from './axios';

const discoverLog = (discoverLog: DiscoverLog) => {
    return axiosInstance.post('/log/discover', discoverLog, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const getTemplates = () => {
    return axiosInstance.get('/log/discover/constraints');
};

const discover = {
    discoverLog,
    getTemplates,
};

export default discover;
