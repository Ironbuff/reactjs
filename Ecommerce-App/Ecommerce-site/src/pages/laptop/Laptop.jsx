import React from 'react'
import { FaCartShopping } from "react-icons/fa6";
import { IoIosAlert } from "react-icons/io";
const Laptop = () => {
  return (
    <div className='flex flex-row px-7 py-7 w-full'>
        <div className='flex items-center justify-center px-4'> 
            <img src='https://cdn.pixabay.com/photo/2016/11/10/16/18/android-1814600_1280.jpg' className='object-fit w-full h-120 rounded full'/>
            
        </div>
        <div className='flex flex-row px-28'>
            <div className='flex flex-col gap-y-7'>
            <h1 className='text-3xl font-bold'>Asus Laptop</h1>
            <p>It contains requirement which includes CPU of i7<br></br> and RAM of 8GB also graphics card of RTX 3070</p>
            <button className='px-4 py-2 bg-neutral-800 text-neutral-200 flex items-center rounded-full gap-2 w-[80%]'>
            <FaCartShopping />
            Purchase Item
            </button>
            <button className='px-4 py-2 bg-blue-700 text-neutral-200 flex items-center gap-2 rounded-full w-[80%]'>
            <IoIosAlert />
                Price: Rs 300
            </button>
            <div className=' flex flex-col gap-y-3'>
                <p className='text-xl font-bold'>Category:<span className='text-lg font-medium'> First Hand Laptop </span></p>
                <p className='text-xl font-bold '>Model:<span className='text-lg font-medium'> Asus Gaming Laptop </span></p>
            </div>       
         </div>
            
           
            
        </div>
    </div>
  )
}

export default Laptop