import React, { useEffect, useState } from 'react'
import Loader from '../../components/loader/Loader'
import Bookcard from '../../components/bookcard/Bookcard'
import axios from 'axios'

const AllBooks = () => {

  const [data ,setData]= useState([])

  useEffect(()=>{

        const fetch = async()=>{
          const response = await axios.get('http://localhost:3000/api/books/getbooks')
          setData(response.data.data)
        }
        fetch()
  },[])
  
  return (
    <div className='bg-neutral-800 px-20 '>
      <h1 className='text-3xl text-neutral-200 font-semibold py-5'>All Books </h1>
       
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

export default AllBooks