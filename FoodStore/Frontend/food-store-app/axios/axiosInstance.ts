import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081' ;

// 2. Create the instance
export const apiClient = axios.create({
  baseURL: BASE_URL,
  // 3. Set default headers so you don't have to repeat them in every request!
  headers: {
    'Content-Type': 'application/json',
  },
  // Optional: Set a timeout (e.g., 10 seconds) so requests don't hang forever
  timeout: 10000, 
});

// Optional but highly recommended: Add interceptors to automatically attach tokens later
apiClient.interceptors.request.use((config) => {
  // Example: const token = localStorage.getItem('token');
  // if (token) { config.headers.Authorization = `Bearer ${token}`; }
  return config;
});