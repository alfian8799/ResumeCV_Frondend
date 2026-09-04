import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const normalizedBaseURL = API_URL.replace(/\/+$/, '');

const api = axios.create({
    baseURL: `${normalizedBaseURL}/api`,
    withCredentials: true,
});

export default api;