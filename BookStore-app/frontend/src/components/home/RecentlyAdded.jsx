import React, { useEffect, useState } from 'react'
import axios from "axios"
import Bookcard from '../bookcard/Bookcard'
import Loader from '../loader/Loader'
const RecentlyAdded = () => {
  
  const[data,setData]= useState([])

  //to load the data from backend
  useEffect( ()=>{
       const fetch = async()=>{ 
        const response = await axios.get('http://localhost:3000/api/books/getlatestbooks')
        setData(response.data.data)
      }
      fetch()
  },[])
  
  
  return (
    <div className='bg-neutral-800 px-20 '>
      <h1 className='text-3xl text-neutral-200 font-semibold py-3'>Recently Added Books</h1>
       
       {/* using loader */}
       {!data && <div className='flex items-center justify-center py-3'><Loader/></div>}
      <div className='py-4 gap-3 grid grid-cols-4'>
      {data && data.map((item,i)=>(
        <div key={i}>
          <Bookcard datas={item}/>
          </div>
      ))}
      </div>
    </div>
  )
}

export default RecentlyAdded