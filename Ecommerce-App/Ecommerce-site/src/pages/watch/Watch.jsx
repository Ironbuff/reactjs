import React from 'react'
import { FaCartShopping } from "react-icons/fa6";
import { IoIosAlert } from "react-icons/io";
const Watch = () => {
  return (
    <div className='flex flex-row px-7 py-7 w-full'>
        <div className='flex items-center justify-center px-4'> 
            <img src='https://cdn.pixabay.com/photo/2022/01/24/18/06/smart-watch-6964296_1280.jpg' className='object-fit w-full h-120 rounded full'/>
            
        </div>
        <div className='flex flex-row px-28'>
            <div className='flex flex-col gap-y-7'>
            <h1 className='text-3xl font-bold'>Apple Watch</h1>
            <p>Modern with similar feature of smart phone<br></br> and RAM of 8GB also callback feature</p>
            <button className='px-4 py-2 bg-neutral-800 text-neutral-200 flex items-center rounded-full gap-2 w-[80%]'>
            <FaCartShopping />
            Purchase Item
            </button>
            <button className='px-4 py-2 bg-blue-700 text-neutral-200 flex items-center gap-2 rounded-full w-[80%]'>
            <IoIosAlert />
                Price: Rs 50500
            </button>
            <div className=' flex flex-col gap-y-3'>
                <p className='text-xl font-bold'>Category:<span className='text-lg font-medium'> First Hand Watch </span></p>
                <p className='text-xl font-bold '>Model:<span className='text-lg font-medium'> Apple Watch</span></p>
            </div>       
         </div>
            
           
            
        </div>
    </div>
  )
}

export default Watch