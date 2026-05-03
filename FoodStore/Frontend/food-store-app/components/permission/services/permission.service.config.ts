import { apiClient } from "@/axios/axiosInstance";
import { PERMISSION_API } from "@/route/signRoute";

export const getUserList = async () => {
  const res = apiClient.get(PERMISSION_API.getUser);
  return res;
};
