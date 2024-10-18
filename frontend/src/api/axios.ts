import axios from 'axios';

const BASE_URL = 'https://localhost:7287';

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
});
