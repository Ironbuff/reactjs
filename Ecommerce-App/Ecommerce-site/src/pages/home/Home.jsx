import React from 'react'
import { FaCartShopping } from "react-icons/fa6";
import { IoIosAlert } from "react-icons/io";
const Home = () => {
  return (
    <div className='flex flex-row px-7 py-7 w-full'>
        <div className='flex items-center justify-center px-4'> 
            <img src='https://media.istockphoto.com/id/2172810239/photo/top-view-digitally-rendered-modern-home-office-with-wooden-desk-and-natural-decor.jpg?s=2048x2048&w=is&k=20&c=ESJJg1G1hF7Pe8AODbutgb8MGUn5w3SKxcfhv4K7DBg=' className='object-fit w-full h-120 rounded full'/>
            
        </div>
        <div className='flex flex-row px-28'>
            <div className='flex flex-col gap-y-7'>
            <h1 className='text-3xl font-bold'>Premium Home</h1>
            <p>It contains requirement which large area<br></br> and farm with place for gardening</p>
            <button className='px-4 py-2 bg-neutral-800 text-neutral-200 flex items-center rounded-full gap-2 w-[80%]'>
            <FaCartShopping />
            Purchase Now
            </button>
            <button className='px-4 py-2 bg-blue-700 text-neutral-200 flex items-center gap-2 rounded-full w-[80%]'>
            <IoIosAlert />
                Price: Rs 1,00,000
            </button>
            <div className=' flex flex-col gap-y-3'>
                <p className='text-xl font-bold'>Category:<span className='text-lg font-medium'> Highly Furntinured </span></p>
                <p className='text-xl font-bold '>Model:<span className='text-lg font-medium'> Placed in City area </span></p>
            </div>       
         </div>
            
           
            
        </div>
    </div>
  )
}

export default Home