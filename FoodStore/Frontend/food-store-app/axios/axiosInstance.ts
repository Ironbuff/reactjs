import axios from "axios";
import { getRefreshToken } from "./services/refresh.services.config";

export const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081";

// 2. Create the instance
export const apiClient = axios.create({
  baseURL: BASE_URL,
  // 3. Set default headers so you don't have to repeat them in every request!
  headers: {
    "Content-Type": "application/json",
  },
  // Optional: Set a timeout (e.g., 10 seconds) so requests don't hang forever
  timeout: 10000,
});

export const authClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Optional but highly recommended: Add interceptors to automatically attach tokens later
apiClient.interceptors.request.use(async (config) => {
  const authData = localStorage.getItem("auth");

  if (authData) {
    const parsed = JSON.parse(authData);
    let accessToken = parsed.accessToken;
    let accessTokenExpiresAt = parsed.accessTokenExpiresAt;
    const refreshToken = parsed.refreshToken;

    if (
      accessToken &&
      accessTokenExpiresAt &&
      Date.now() >= parseInt(accessTokenExpiresAt) &&
      refreshToken
    ) {
      try {
        const res = await getRefreshToken(refreshToken);
        const newaccessToken = res?.data?.accessToken;
        const newExpiresAt = res?.data?.accessTokenExpiresAt;
        parsed.accessToken = newaccessToken;
        parsed.accessTokenExpiresAt = newExpiresAt;
        localStorage.setItem("auth", JSON.stringify(parsed));
        accessToken = newaccessToken;
      } catch (err) {
        console.log("Refresh token failed", err);
      }
    }
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }

  return config;
});
