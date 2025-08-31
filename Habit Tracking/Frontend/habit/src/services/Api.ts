import axios from 'axios';
import { refreshAccessToken } from './Refresh';

const api = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_URL
});

api.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem("accessToken");
    const expiresAt = localStorage.getItem("expiresAt");

    // Check if token is expired
    if (expiresAt && Date.now() > Number(expiresAt)) {
      try {
        // Wait for the new token and expiry time to be returned
        const newTokenData = await refreshAccessToken();
        
        // Update local storage with the new token and expiry
        localStorage.setItem("accessToken", newTokenData.accessToken);
        localStorage.setItem("expiresAt", newTokenData.expiresAt);
        
        // Update the 'token' variable for the current request header
        token = newTokenData.accessToken;
      } catch (error) {
        console.error("Token refresh failed:", error);
        window.location.href = '/login';
        return Promise.reject(error);
      }
    }

    // Set header for non-expired tokens, including the newly fetched one
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;