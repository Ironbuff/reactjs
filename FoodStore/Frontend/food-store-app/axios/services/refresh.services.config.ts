import { ACCESS_TOKEN_GET } from "@/route/signRoute";
import { authClient } from "../axiosInstance";

export const getRefreshToken = async (refreshToken?: string) => {
  if (refreshToken) {
    const response = await authClient.post(
      ACCESS_TOKEN_GET.refresh,
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      },
    );
    return response;
  }
  return;
};
