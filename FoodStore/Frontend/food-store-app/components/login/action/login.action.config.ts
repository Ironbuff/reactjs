import { useMutation } from "@tanstack/react-query";
import { ILoginType } from "../loginScreen";
import { loginUser } from "../service/login.services.config";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { setRole } from "@/redux/authSlice";

const dispatch = useDispatch()

export const useloginUser = ()=>{
    return useMutation({
        mutationKey:['login-user'],
        mutationFn:(data:ILoginType)=> loginUser(data),
        onSuccess: (data) => {
             toast.success(data?.data?.message || "User created ");
             console.log("Response:", data);
          
      const authData = {
        accessToken: data?.data?.accessToken,
        refreshToken: data?.data?.refreshToken,
        accessTokenExpiresAt: data?.data?.accessTokenExpiresAt,
        refreshTokenExpiresAt: data?.data?.refreshTokenExpiresAt,
        role:data?.data?.role
      };
      dispatch(setRole(data?.data?.role))


      localStorage.setItem("auth", JSON.stringify(authData));

      console.log("Response:", data);
           },
       
           onError: (error: AxiosError<{ message: string }>) => {
       
             const errorMessage = error.response?.data?.message || "Failed to sign user";
             
             toast.error(errorMessage);
             
           },
    })
}