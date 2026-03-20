import { useMutation } from "@tanstack/react-query"
import { addFood } from "../service/add.service.config"
import { FoodType } from "../add"
import { toast } from "react-toastify"
import { AxiosError } from "axios"

export const useAddFood = ()=>{
    return useMutation({
        mutationKey:['add-food'],
        mutationFn:(data:FoodType)=>addFood(data),
        onSuccess:(data)=>{
            toast.success(data?.data?.message||'Food added sucessfully');
            console.log('response',data);
        },
        onError:(error:AxiosError<{message:string}>)=>{

            const errorMessage = error?.response?.data?.message || 'Failed to Add Food'
            toast.error(errorMessage)
        }
    })
}