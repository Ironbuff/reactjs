import { useMutation } from "@tanstack/react-query";
import { SignUser } from "../service/sign.services.config";
import { toast } from "react-toastify";
import { ILoginType } from "../SignScreen";
import { AxiosError } from "axios"; 

export const useSignUser = () => {
  return useMutation({
    mutationKey: ["sign-user"],

    mutationFn: (data: ILoginType) => SignUser(data),

    onSuccess: (data) => {
      toast.success(data?.message || "User created ");
      console.log("Response:", data);
    },

    onError: (error: AxiosError<{ message: string }>) => {

      const errorMessage = error.response?.data?.message || "Failed to sign user";
      
      toast.error(errorMessage);
      
    },
  });
};