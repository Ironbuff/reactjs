import { useQuery } from "@tanstack/react-query";
import { getHabits } from "../services/GetHabits";


const UseGetHabits = ()=>{

const data= useQuery({
    queryKey:['habit'],
    queryFn:getHabits,
},)

return(
    data
)
}

export default UseGetHabits