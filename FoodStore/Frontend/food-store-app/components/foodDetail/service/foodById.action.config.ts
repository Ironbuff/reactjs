import { useQuery } from "@tanstack/react-query"
import { getFoodById } from "../action/foodById.service.config"

export const useGetFoodById = (id?:string)=>{
    return useQuery(
        {
            queryKey:['foodDetail',id],
            queryFn:()=>getFoodById(id),
        }
    )
}