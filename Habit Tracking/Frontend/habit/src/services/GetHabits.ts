import axios from 'axios'
import api from './Api'

export const getHabits = async()=>{
   const response = await api.get('user/habit')
   if(response.status===200){
    return response
   }
   else{
    console.log("error in fetching data")
   }
}