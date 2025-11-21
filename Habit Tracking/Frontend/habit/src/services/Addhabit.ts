import api from "./Api"



export const AddHabit = async(data:FormData)=>{
    const response = await api.post('user/habit/addhabit',data,{
    headers:{
        'Content-Type':'mutlipart/form-data',
    }
    })
    return response;
}