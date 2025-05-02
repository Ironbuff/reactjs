import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Bookcard from '../bookcard/Bookcard'

const Favourite = () => { 
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem('token')}`, // Fixed template literal syntax
  }

  const[info,setInfo]= useState([])

useEffect(() => {
  
  const fetch = async()=>{
    try{
      const response = await axios.get('http://localhost:3000/api/books/favourite/get-all-favourite-books',{headers})
     setInfo(response.data.data)
     console.log(response.data.data)
    }
    catch(err){
      console.log(err)
    }
  }
  fetch()

 }, [])
 
 
  return (
   
      <>
      <div className='grid grid-cols-4 gap-5'>
      {info && info.map((items,i)=>(
       <div key={i} >
          <Bookcard datas={items} favourite={true}/>
       </div>
      ))}
      </div>
      {info.length===0 &&
   <div className='flex items-center justify-center text-neutral-300/30 font-bold text-3xl h-[90vh]'>
    <span> No Book added to favourite</span>
    
    </div>
   }
      </>
  )
}

export default Favourite