import { ACCESS_TOKEN_GET } from "@/route/signRoute";
import { apiClient } from "../axiosInstance";

export const getRefreshToken = async (refreshToken?: string) => {
  if (refreshToken) {
    const response = await apiClient.post(ACCESS_TOKEN_GET.refresh, null, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    return response;
  }
  return;
};
