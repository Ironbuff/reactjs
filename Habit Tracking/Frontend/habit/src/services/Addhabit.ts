import api from "./Api"



export const AddHabit = async(data:{
    title:string,
    description:string
})=>{
    const response = await api.post('user/habit/addhabit',data)
    return response;
}