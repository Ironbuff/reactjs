import { useQuery } from "@tanstack/react-query"
import { getFoodById } from "../service/foodById.service.config"

export const useGetFoodById = (id:string | string[])=>{
    return useQuery(
        {
            queryKey:['foodDetail',id],
            queryFn:()=>getFoodById(id),
        }
    )
}