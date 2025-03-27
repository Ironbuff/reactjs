import React from 'react'
import { FaCartShopping } from "react-icons/fa6";
import { IoIosAlert } from "react-icons/io";
const Keyboard = () => {
  return (
    <div className='flex flex-row px-7 py-7 w-full'>
        <div className='flex items-center justify-center px-4'> 
            <img src='https://cdn.pixabay.com/photo/2015/07/17/22/42/typing-849806_960_720.jpg' className='object-fit w-full h-120 rounded full'/>
            
        </div>
        <div className='flex flex-row px-28'>
            <div className='flex flex-col gap-y-7'>
            <h1 className='text-3xl font-bold'>Mechanical Keyboard</h1>
            <p>It contains switchable keys<br></br> and ultraresponsive button with fast response.</p>
            <button className='px-4 py-2 bg-neutral-800 text-neutral-200 flex items-center rounded-full gap-2 w-[80%]'>
            <FaCartShopping />
            Purchase Item
            </button>
            <button className='px-4 py-2 bg-blue-700 text-neutral-200 flex items-center gap-2 rounded-full w-[80%]'>
            <IoIosAlert />
                Price: Rs 1000
            </button>
            <div className=' flex flex-col gap-y-3'>
                <p className='text-xl font-bold'>Category:<span className='text-lg font-medium'> First Hand Keyboard </span></p>
                <p className='text-xl font-bold '>Model:<span className='text-lg font-medium'> Razer Gaming Keyboard </span></p>
            </div>       
         </div>
            
           
            
        </div>
    </div>
  )
}

export default Keyboard