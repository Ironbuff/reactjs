import api from './Api'

export const getHabits = async()=>{
   const response = await api.get('/auth/user/sign')
   if(response.status===200){
    return response
   }
   else{
    console.log("error in fetching data")
   }
}