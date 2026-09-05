import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const normalizedBaseURL = API_URL.replace(/\/+$/, '').replace(/\/api$/, '');

const api = axios.create({
    baseURL: `${normalizedBaseURL}/api`,
    withCredentials: true,
});

let csrfToken;

api.interceptors.request.use(async (config) => {
    if (['get', 'head', 'options'].includes(config.method?.toLowerCase())) {
        return config;
    }

    if (!csrfToken) {
        const response = await api.get('/auth/csrf', { params: { t: Date.now() } });
        csrfToken = response.data.csrfToken;
    }

    config.headers['X-CSRF-Token'] = csrfToken;
    return config;
});

api.interceptors.response.use((response) => response, async (error) => {
    if (error.response?.status === 403 && error.config && !error.config._csrfRetry) {
        csrfToken = undefined;
        error.config._csrfRetry = true;
        const response = await api.get('/auth/csrf', { params: { t: Date.now() } });
        csrfToken = response.data.csrfToken;
        error.config.headers['X-CSRF-Token'] = csrfToken;
        return api(error.config);
    }
    return Promise.reject(error);
});

export default api;