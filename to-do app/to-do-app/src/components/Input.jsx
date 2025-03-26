import React, { useState } from 'react'
import { IoSearch } from "react-icons/io5";

const App = (props) => {
    
  const [input,SetInput]=useState('') // to store run time text

  return (
    <div className='flex flex-col gap-y-5 items-center justify-center w-full'>
      <h1 className='text-4xl font-bold tracking-normal'>To do List</h1>
      <div className='flex  gap-x-2'>
      <div className='border-2 border-neutral-400 flex flex-row items-center justify-between rounded-lg shadow-md w-[75%]'>
        <input 
        type='text'
        placeholder='Enter your Note'
        className=' w-64  h-auto outline-none'
        onChange={e=>{SetInput(e.target.value)}} //it will show the text enter in the input
        />
        <IoSearch /> 
      </div>
      {/* use to add note on the list */}
      <button className='bg-neutral-900 rounded-full flex items-center justify-center w-8 text-white' 
      onClick={()=>{
        props.addTolist(input) 
        SetInput("")}}>
        {/* here props.addlist(input)sends input data to addlist function  and SetInput blank is used to make input blank after the value is given to*/}
          +
        </button>
      </div>
    </div>
  )
}

export default App