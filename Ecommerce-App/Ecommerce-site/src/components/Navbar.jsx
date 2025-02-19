import React from 'react'
import { CiSearch } from "react-icons/ci";
const Navbar = () => {
  return (
    <div>
        {/* Logo Section */}
        <div>
            <img src='../assests/Ecommerce-logo.jpg'></img>
        </div>
        {/* Search Button */}
        <div>
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