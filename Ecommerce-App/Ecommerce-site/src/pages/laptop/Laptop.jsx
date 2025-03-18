import React from 'react'
import { FaCartShopping } from "react-icons/fa6";
import { IoIosAlert } from "react-icons/io";
const Laptop = () => {
  return (
    <div className='flex flex-row px-7 py-7 w-full'>
        <div className='flex items-center justify-center px-4'> 
            <img src='https://cdn.pixabay.com/photo/2016/03/27/07/12/apple-1282241_1280.jpg' className='object-fit w-full h-120 rounded full'/>
            
        </div>
        <div className='flex flex-row'>
            <div className='flex flex-col gap-y-7'>
            <h1 className='text-3xl font-normal '>Laptop</h1>
            <p>This is one and only item present</p>
            <button className='px-4 py-2 bg-neutral-800 text-neutral-200 flex items-center  gap-2'>
            <FaCartShopping />
            Purchase Item
            </button>
            <button className='px-4 py-2 bg-blue-700 text-neutral-200 flex items-center gap-2'>
            <IoIosAlert />
                Price: Rs 300
            </button>
            <div>
                <p>Category:<span> First Hand Laptop </span></p>
                <p>Model:<span> Asus Gaming Laptop </span></p>
            </div>       
         </div>
            
           
            
        </div>
    </div>
  )
}

export default Laptop