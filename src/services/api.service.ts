import axios, { type AxiosInstance } from "axios";
import { useUserStore } from "../zustand/user.state";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const IDENTIFIER = import.meta.env.VITE_IDENTIFIER;
const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    identifier: IDENTIFIER,
    device_id: 1234567,
  },
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: ApiError) => {
    if (error.status === 401) {
      //   Auth.sessionExpire();
    }
    return Promise.reject(error);
  }
);

// Interceptor to attach token if available
api.interceptors.request.use((config) => {
  const token = useUserStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
