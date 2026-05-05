import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getUserList,
  setUserRole,
} from "../services/permission.service.config";
import { IPermissionPayload } from "../interface/permission.interface";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export const useUserList = () => {
  return useQuery({
    queryKey: ["getUserList"],
    queryFn: () => getUserList(),
  });
};

export const useSetUserRole = () => {
  return useMutation({
    mutationKey: ["setUserRole"],
    mutationFn: (data: IPermissionPayload) => setUserRole(data),
    onSuccess: (data) => {
      toast.success(data?.data?.message || "User Role Set Sucessfully");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage =
        error.response?.data?.message || "Failed to Change Role";

      toast.error(errorMessage);
    },
  });
};
