import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'https://localhost:7287';

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
});
