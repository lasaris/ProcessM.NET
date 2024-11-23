import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://api:8000';

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
});
