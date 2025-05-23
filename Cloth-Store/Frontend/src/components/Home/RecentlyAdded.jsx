import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import Clothcard from '../clothcard/Clothcard'


const RecentlyAdded = () => {
  
  const[datas,setDatas]=useState([])
  
    useEffect(()=>{

     const fetch = async()=>{
        const response = await axios.get('http://localhost:8081/api/user/clothes/getlatestcloth')
        setDatas(response.data)
        console.log(response.data)
     }
     fetch()
  },[])
  
    return (
    <div>
     <Clothcard item={datas}/>
    </div>
  )
}

export default RecentlyAdded