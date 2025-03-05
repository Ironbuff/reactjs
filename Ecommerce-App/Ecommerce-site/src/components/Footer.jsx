import React from 'react'
import image from "../assets/Logo.jpg"
import { Link } from "react-router-dom";
const Footer = () => {
  
    return (
    <div className='flex items-center justify-between px-28 bg-neutral-800 h-[12ch]'>
        <div className='flex items-center justify-between'>
            <img src={image} className='w-32 h-32 object-fit aspect-video'/>
        </div>
        <div>
            <ul className='list-none flex flex-row gap-5 '>
                <li className='text-xl font-bold border  px-4 py-1  hover:bg-gray-300 text-neutral-500'>
                    <Link to="/">Products</Link>
                </li>
                <li className='text-xl font-bold border  px-4 py-1  hover:bg-gray-300 text-neutral-500'>
                    <Link to="/">Customer Reviews</Link>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Footer