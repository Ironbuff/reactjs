import { useMutation } from "@tanstack/react-query";
import { SignUser } from "../service/sign.services.config";
import { toast } from "react-toastify";
import { ILoginType } from "../SignScreen";
import { AxiosError } from "axios"; // Import AxiosError for better typing

export const useSignUser = () => {
  return useMutation({
    mutationKey: ["sign-user"],

    mutationFn: (data: ILoginType) => SignUser(data),

    onSuccess: (data) => {
      toast.success(data?.message || "User created ");
      console.log("Response:", data);
    },

    // Type the error properly if you are using TypeScript
    onError: (error: AxiosError<{ message: string }>) => {
      // 1. Look for the message coming from the backend JSON response
      // 2. Fall back to a generic message if the server is completely down
      const errorMessage = error.response?.data?.message || "Failed to sign user";
      
      toast.error(errorMessage);
      
      // Changed this line to log the actual backend JSON response instead of the generic Axios error
      console.error("Backend Error Data:", error.response?.data);
    },
  });
};