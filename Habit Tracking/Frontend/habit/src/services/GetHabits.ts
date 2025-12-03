import axios from 'axios'
import api from './Api'

export const getHabits = async({searchTerm}:{searchTerm:string})=>{
   
   const apiValue = 'user/habit';
   const url = searchTerm?`${apiValue}?title=${encodeURIComponent(searchTerm)}`:apiValue //takes string and returns value safe to parse to url
   const response = await api.get(url)
   if(response.status===200){
    return response
   }
   else{
    console.log("error in fetching data")
   }
}