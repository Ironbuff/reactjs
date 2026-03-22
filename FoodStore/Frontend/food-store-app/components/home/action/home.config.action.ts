

import { useQuery } from "@tanstack/react-query"
import { getAllFoods } from "../service/home.config.service"

export const useGetAllFoods = ()=>{
    return useQuery({
        queryKey:['getFoods'],
        queryFn:getAllFoods,
    })
}