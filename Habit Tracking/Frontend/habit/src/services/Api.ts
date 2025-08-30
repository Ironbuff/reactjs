import axios from 'axios';
import { refreshAccessToken } from './Refresh';

const api = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_URL
});

api.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem("accesstoken");
    const expiresAt = localStorage.getItem("expriesAt");

    // Check if token is expired
    if (expiresAt && Date.now() > Number(expiresAt)) {
      token = await refreshAccessToken();
      localStorage.setItem("expriesAt", Date.now() + 30 * 1000 + ""); // update expiry
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


export default api;
