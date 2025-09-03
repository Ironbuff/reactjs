import api from "./Api"



export const AddHabit = async(newhabit)=>{
    const response = await api.post('user/habit/addhabit',newhabit)
    return response;
}