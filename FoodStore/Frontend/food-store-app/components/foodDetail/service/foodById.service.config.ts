import { apiClient } from "@/axios/axiosInstance"
import { FOOD_STORE_GET } from "@/route/signRoute"

export const getFoodById = async(id:string | string[])=>{
    const response = await apiClient.get(`${FOOD_STORE_GET.getAllFoods}/${id}`)
    return response;
}