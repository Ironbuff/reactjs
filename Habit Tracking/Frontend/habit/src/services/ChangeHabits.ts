import api from "./Api"

export const deleteHabit = async(ids)=>{
    const response = await api.delete(`user/habit/${ids}`)
    return response;
}