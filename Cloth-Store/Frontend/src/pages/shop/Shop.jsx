import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import Clothcard from '../../components/clothcard/Clothcard'


const Shop = () => {
  
  const[datas,setDatas]=useState([])
  
    useEffect(()=>{

     const fetch = async()=>{
        const response = await axios.get('http://localhost:8081/api/user/clothes/getcloth')
        setDatas(response.data)
     }
     fetch()
  },[])
  
    return (
    <div>
     <Clothcard item={datas}/>
    </div>
  )
}

export default Shop