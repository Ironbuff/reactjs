import { apiClient } from "@/axios/axiosInstance"
import { FOOD_STORE_ACTION } from "@/route/signRoute"
import { FoodType } from "../add"

export const addFood = async(data:FoodType)=>{
    const response = await apiClient.post(FOOD_STORE_ACTION.addFood,data)
    return response 
}