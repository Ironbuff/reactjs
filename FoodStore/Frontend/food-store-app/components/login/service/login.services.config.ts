import { apiClient } from "@/axios/axiosInstance"
import { SIGN_USER_URL } from "@/route/signRoute"
import { ILoginType } from "../loginScreen";

export const loginUser= async(data:ILoginType)=>{
    const response = await apiClient.post(SIGN_USER_URL.loginUser,data);
    return response;
}