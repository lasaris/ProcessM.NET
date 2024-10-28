import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5217';

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
});
