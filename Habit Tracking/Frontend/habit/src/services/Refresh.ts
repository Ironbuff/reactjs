import api from "./Api";

export const refreshAccessToken = async () => {
  try {
    const response = await api.post(
      "auth/refresh",
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
        },
      }
    );
    return response.data; 
  } catch (error) {
    console.error("Refresh token request failed:", error);
    throw error; 
}
}