import api from './Api'

export const UseRegister = async(data:{
   username:string,
   email:string,
   password:string,
})=>{
   const response = await api.post('/auth/user/sign',data,{
      headers:{
         'Content-Type':'application/json'
      }
   })
  return response
}