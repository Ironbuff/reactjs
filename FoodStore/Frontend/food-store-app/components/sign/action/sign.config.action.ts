import { useMutation } from "@tanstack/react-query";
import { SignUser } from "../service/sign.services.config";
import { toast } from "react-toastify";
import { ILoginType } from "../SignScreen";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export const useSignUser = () => {
  const route = useRouter();
  return useMutation({
    mutationKey: ["sign-user"],

    mutationFn: (data: ILoginType) => SignUser(data),

    onSuccess: (data) => {
      toast.success(data?.message || "User created ");
      route.push("/login");
    },

    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage =
        error.response?.data?.message || "Failed to sign user";

      toast.error(errorMessage);
    },
  });
};
