import { apiClient } from "@/axios/axiosInstance";
import { SIGN_USER_URL } from "@/route/signRoute";
import axios from "axios";

export const SignUser = async (data:any) => {
  try {
    // Added http:// to the URL and fixed the headers object
    const response = await apiClient.post(SIGN_USER_URL.signUser,data)
    // Return the actual response data so your app can use it
    return response.data; 
    
  } catch (error) {
    // Added basic error handling
    console.error("Error signing user:", error);
    throw error; 
  }
};