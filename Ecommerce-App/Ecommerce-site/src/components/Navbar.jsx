import React from 'react'
import { CiSearch } from "react-icons/ci";
import image from "../assets/Ecommerce-logo.jpg"
const Navbar = () => {
  return (
    <div>
        {/* Logo Section */}
        <div>
            <img src={image} className='aspect-video h-24 w-24'></img>
        </div>
        {/* Search Button */}
        <div className='border border-black'>
           <input
           type='text'
           placeholder='search '
           />
           <CiSearch />
        </div>
    </div>
  )
}

export default Navbar