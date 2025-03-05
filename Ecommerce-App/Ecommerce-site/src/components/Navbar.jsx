import React from 'react'
import { IoIosSearch } from "react-icons/io";
import image from "../assets/Logo.jpg"
const Navbar = () => {
  return (
    <div className='flex flex-row px-28 items-center justify-between bg-white shadow-sm'>
        {/* Logo Section */}
        <div className='flex flex-row items-center'>
            <img src={image} className='aspect-video h-32 w-32'></img>
            <p className='text-4xl font-bold text-red-600'>SAJ<span className='text-yellow-500'>ILO</span></p>
        </div>
        {/* Search Button */}
        <div className='border border-black w-[20%] justify-between flex flex-row  px-2 items-center rounded-4xl '>
           <input
           type='text'
           placeholder='Search'
           className='outline-none '
           />
           <IoIosSearch /> 
        </div>
    </div>
  )
}

export default Navbar