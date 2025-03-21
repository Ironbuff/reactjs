import React from 'react'
import { FaCartShopping } from "react-icons/fa6";
import { IoIosAlert } from "react-icons/io";
const Iphone = () => {
  return (
    <div className='flex flex-row px-7 py-7 w-full'>
        <div className='flex items-center justify-center px-4'> 
            <img src="https://media.istockphoto.com/id/1409132920/photo/a-mans-hand-takes-a-picture-of-a-tropical-beach-using-a-smartphone.jpg?s=2048x2048&w=is&k=20&c=k4JwJDE1xOZqaSxyTzc_OIM54_Ws7bnFgYYXfkfJRLI=" className='object-fit w-full h-120 rounded full'/>
            
        </div>
        <div className='flex flex-row px-28'>
            <div className='flex flex-col gap-y-7'>
            <h1 className='text-3xl font-bold'>Iphone</h1>
            <p>It is the latest Iphone which has all the aspects <br></br> and RAM of 8GB also latest Iphone Software</p>
            <button className='px-4 py-2 bg-neutral-800 text-neutral-200 flex items-center rounded-full gap-2 w-[80%]'>
            <FaCartShopping />
            Purchase Item
            </button>
            <button className='px-4 py-2 bg-blue-700 text-neutral-200 flex items-center gap-2 rounded-full w-[80%]'>
            <IoIosAlert />
                Price: Rs 50,000
            </button>
            <div className=' flex flex-col gap-y-3'>
                <p className='text-xl font-bold'>Category:<span className='text-lg font-medium'> First Hand Iphone </span></p>
                <p className='text-xl font-bold '>Model:<span className='text-lg font-medium'> Iphone 8 </span></p>
            </div>       
         </div>
            
           
            
        </div>
    </div>
  )
}

export default Iphone