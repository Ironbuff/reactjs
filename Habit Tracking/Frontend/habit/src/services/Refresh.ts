import api from "./Api";

export const refreshAccessToken = async () => {
  const response = await api.post(
    "auth/refresh",
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("refreshtoken")}`,
      },
    }
  );
  
  // Save new access token
  localStorage.setItem("accessToken", response.data.accesstoken);
  return response.data.accessToken;
};