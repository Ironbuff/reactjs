import api from "./Api"

export const RefreshToken = async()=>{
    const response = await api.post('/auth/refresh',{
        headers:{
            'Authorization':`Bearer ${localStorage.getItem("refreshToken")}`
        }
    })
    return response
}