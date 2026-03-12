import { useMutation } from "@tanstack/react-query";
import { SignUser } from "../service/sign.services.config";
import { toast } from "react-toastify";
import { ILoginType } from "../SignScreen";

export const useSignUser = () => {
  return useMutation({
    mutationKey: ["sign-user"],

    mutationFn: (data: ILoginType) => SignUser(data),

    onSuccess: (data) => {
      toast.success("User created successfully");
      console.log("Response:", data);
    },

    onError: (error: any) => {
      toast.error("Failed to sign user");
      console.error(error);
    },
  });
};