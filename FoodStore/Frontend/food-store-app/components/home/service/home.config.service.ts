import { apiClient } from "@/axios/axiosInstance"
import { FOOD_STORE_GET } from "@/route/signRoute"

export const getAllFoods =async()=>{
    const response = await apiClient.get(FOOD_STORE_GET.getAllFoods)
    return response;
}