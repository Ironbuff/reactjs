import React from 'react'
import { IoIosSearch } from "react-icons/io";
import image from "../assets/Logo.jpg"
import { Link } from 'react-router-dom';
const Navbar = () => {
  const NavItem=[
    {id:1, names:"Products",lead:"/products"},
    {id:2, names:"CustomerReview",lead:"/customer"},
  ]
  return (
    <div className='flex flex-row px-28 h-[12ch] items-center justify-between bg-white shadow-sm'>
        {/* Logo Section */}
        <div className='flex flex-row items-center'>
            <div className='flex flex-row items-center justify-center'>
            <img src={image} className='aspect-square h-32 w-32'></img>
            <p className='text-4xl font-bold text-red-600'>SAJ<span className='text-yellow-500'>ILO</span></p>
            </div>
            <div className='flex flex-row gap-x-3 px-7'>
              {/* Navitems */}
              {NavItem.map((item)=>(
                <ul className='list-none' key={item.id}>
                  <li className='text-base text-neutral-500 hover:text-neutral-900'>
                   <Link to={item.lead}>
                   {item.names}
                   </Link>
                  </li>
                </ul>
              ))}
            </div>
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