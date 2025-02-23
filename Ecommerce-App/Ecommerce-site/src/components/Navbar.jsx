import React from 'react'
import { IoIosSearch } from "react-icons/io";
import image from "../assets/Ecommerce-logo.jpg"
const Navbar = () => {
  return (
    <div className='flex flex-row px-28 items-center justify-between'>
        {/* Logo Section */}
        <div>
            <img src={image} className='aspect-video h-24 w-24'></img>
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