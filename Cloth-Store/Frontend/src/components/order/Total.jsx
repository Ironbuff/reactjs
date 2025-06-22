import axios from 'axios'
import React, { useEffect } from 'react'




const Total = () => {
  
  
  useEffect(()=>{
    const fetch = async()=>{
      const response = await axios.get("http://localhost:8081/api/user/order/get-all-order",{
        headers:{
          'Authorization':`Bearer ${localStorage.getItem("token")}`,
          'Content-Type':'application/json'
        }
       
      }
    )
      console.log(response)
    }

    fetch()
  },[])
  
  
  return (
    <div>
      <table>

      </table>
    </div>
  )
}

export default Total