import api from "./Api"

export const LoginUser= async(data:{
    email:string,
    password:string,
})=>{
    const response = await api.post('/auth/user/login',data,{
        headers:{
            'Content-Type':'application/json'
        }
    })
    return response
}