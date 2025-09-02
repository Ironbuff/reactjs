import axios from 'axios';
import { RefreshToken } from './Refresh';

const api = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_URL
});

// Add request interceptor
api.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken")
    const expiresAt = localStorage.getItem("expiresAt")

    // Check if token is expired or about to expire
    if (accessToken && expiresAt && Date.now() >= parseInt(expiresAt)) {
      try {
        // Refresh token
        const res = await RefreshToken()
        const newAccessToken = res.data.accessToken
        const newExpiresAt = res.data.expiresAt

        // Store new values
        localStorage.setItem("accessToken", newAccessToken)
        localStorage.setItem("expiresAt", newExpiresAt)

        // Update header with fresh token
        config.headers["Authorization"] = `Bearer ${newAccessToken}`
      } catch (err) {
        console.error("Token refresh failed:", err)
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        localStorage.removeItem("expiresAt")
        // optional: redirect to login
      }
    } else if (accessToken) {
      // If token still valid, just attach it
      config.headers["Authorization"] = `Bearer ${accessToken}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)



export default api;