import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Navbar = () => {
  
 
    const item = [
        {id:1, title:"Login", links:"/login"},
        {id:2, title:"Register", links:"/register"},
        {id:3, title:"Add Habit", links:"/habit"},
        {id:4, title:"Logout", links:"/logout"}
    ]

    const isLoggedIn = useSelector((state:any)=>state?.auth?.isLoggedIn)

       // choose which items to show
    const navitems = isLoggedIn ? item.slice(0,2) : item.slice(2,4)
  
    return (
    <div className='flex flex-row items-center w-full h-[9ch] shadow-md justify-between px-28'>
        <h1 className='font-bold text-2xl flex items-center justify-center text-red-300'>
            Habit
            <span className='text-neutral-700 px-1'>
                App
            </span>
        </h1>
        <div className='flex flex-row items-center justify-center gap-x-2'>
            {navitems.map((value)=>(
                <Link to={value.links} key={value.id} className='text-base font-normal p-2 rounded-xl bg-red-400 hover:bg-red-500 text-neutral-100 hover:text-neutral-50 duration-300 ease-in-out transition-all '>
                    {value.title}
                </Link>
            ))}
        </div>
    </div>
  )
}

export default Navbar