import axios from 'axios';
import { RefreshToken } from './Refresh';

const api = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_URL
});


const axiosPrivate = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_URL
});


api.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken");
    const expiresAt = localStorage.getItem("expiresAt");


    if (accessToken && expiresAt && Date.now() >= parseInt(expiresAt)) {
      try {
       
        
     
        const res = await RefreshToken(axiosPrivate); 

        const newAccessToken = res.data.accessToken;
        const newExpiresAt = res.data.expiresAt;


        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("expiresAt", newExpiresAt);

        config.headers["Authorization"] = `Bearer ${newAccessToken}`;

      } catch (err) {
        console.error("Token refresh failed:", err);

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("expiresAt");

        window.location.href = '/login'; 
        return Promise.reject(err);
      }
    } else if (accessToken) {

      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {

    return Promise.reject(error);
  }
);

export default api;

