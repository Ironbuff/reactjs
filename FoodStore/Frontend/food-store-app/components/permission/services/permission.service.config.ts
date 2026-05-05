import { apiClient } from "@/axios/axiosInstance";
import { PERMISSION_API } from "@/route/signRoute";
import { IPermissionPayload } from "../interface/permission.interface";

export const getUserList = async () => {
  const res = apiClient.get(PERMISSION_API.getUser);
  return res;
};

export const setUserRole = async (payload: IPermissionPayload) => {
  const res = apiClient.post(PERMISSION_API.setRole, payload);
  return res;
};
