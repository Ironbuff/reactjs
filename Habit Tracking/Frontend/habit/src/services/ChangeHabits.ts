import api from "./Api"

export const deleteHabit = async(ids:string)=>{
    const response = await api.delete(`user/habit/${ids}`)
    return response;
}

export const toggleHabit = async(id:string)=>{
    const response = await api.post(`/user/habit/toggle/${id}`,{})
    return response;
}

export const edithabit = async({
  id,
  data,
}: {
  id?: string;
  data: any;
})=>{
    const response = await api.put(`/user/habit/updatehabit/${id}`,data)
    return response;
}

