import React from 'react'
import { CiSearch } from "react-icons/ci";
import image from "../assets/Ecommerce-logo.jpg"
const Navbar = () => {
  return (
    <div className='flex flex-row px-28 items-center justify-between'>
        {/* Logo Section */}
        <div>
            <img src={image} className='aspect-video h-24 w-24'></img>
        </div>
        {/* Search Button */}
        <div className='border border-black w-[25%] flex flex-row justify-between px-7 items-center rounded-4xl '>
           <input
           type='text'
           placeholder='Search'
           className='outline-none '
           />
           <CiSearch />
        </div>
    </div>
  )
}

export default Navbar