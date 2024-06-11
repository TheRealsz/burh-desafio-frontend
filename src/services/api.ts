import axios, { type AxiosInstance } from "axios";


const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Cache-Control": "no-cache",
    },
});

export default api;