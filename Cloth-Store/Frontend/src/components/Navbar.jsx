import React, { useState } from 'react'
import img from '../assets/Ecommerce.webp'
import { Link } from 'react-router-dom'
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from 'react-redux';

const navitems = [
    { id: 1, name: "Home", links: "/home" },
    { id: 2, name: "About Us", links: "/about" },
    { id: 3, name: "Shop", links: "/shops" },
    {id:4, name:"Profile", links:"/profile"}
]



const Navbar = () => {

    // for mobile nav
    const [mobilenav, setMobilenav] = useState(false)
    const login = useSelector((state)=>state.auth.login)

    return (
        <nav className='md:bg-gray-200 bg-blue-400'>

            <div className='h-[9ch]  w-full md:px-28 px-5 flex  flex-row items-center justify-between  shadow-md border-b-1 border-b-gray-300'>
                {/* Logo Section */}
                <div className='flex flex-row items-center justify-center gap-x-3'>
                    <img src={img} className='h-[8vh] ' />
                    <h1 className='md:text-2xl text-lg sm:text-neutral-300 text-shadow-md font-semibold tracking-wider'>
                        SAJILO
                    </h1>
                </div>

                {/* Item Section */}
                <div className='md:flex hidden flex-row gap-x-5'>
                    {navitems.map((item, i) => (
                        <Link to={item.links} key={i} className='text-gray-400  font-bold hover:underline py-2 transition-all ease-in-out duration-300 text-base hover:text-neutral-700/35'>
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Contact Us Section */}
                <div className='font-semibold md:flex hidden flex-row gap-x-4'>
                   {!login?(
                    <>
                     <Link to={"/login"} className='px-3 py-3 bg-gray-300 hover:bg-gray-200 hover:border-2 hover:border-neutral-400 rounded-2xl hover:translate-0.5  transition-all ease-in-out duration-300 shadow-md'>
                        Log In
                    </Link>
                     <Link to={'/sign'} className='px-3 py-3 bg-gray-300 hover:bg-gray-200 hover:border-2 hover:border-neutral-400 rounded-2xl hover:translate-0.5  transition-all ease-in-out duration-300 shadow-md'>
                        SignIn
                    </Link>
                   </>
                   ):(
                    <Link to={'/logout'} className='px-3 py-3 bg-gray-300 hover:bg-gray-200 hover:border-2 hover:border-neutral-400 rounded-2xl hover:translate-0.5  transition-all ease-in-out duration-300 shadow-md'>
                        Log Out
                    </Link>
                   )}
                </div>

                {/* mobile icon */}
                <div className='md:hidden flex'>
                    <button onClick={() => setMobilenav(!mobilenav)} className='text-red-400' >
                        {
                            mobilenav ? (<RxCross2 size={24} />) : (<IoMenu size={24}/>)
                        }
                    </button>
                </div>
            </div>

            {mobilenav && (
                <div className='flex md:hidden flex-col h-screen w-full fixed top-0 left-0 z-10 items-center justify-center gap-y-3 bg-blue-400'>

                    {/* Close Button */}
                    <div>
                        <button onClick={() => setMobilenav(false)} className='absolute top-8 right-5'>
                            <RxCross2 size={24} className='text-red-400' />
                        </button>
                    </div>

              

                    {/* nav-items and button section */}
                    {
                        navitems.map((item, i) => (
                            <Link to={item.name} key={i} className='font-semibold text-lg text-neutral-200  text-shadow-sm'>
                                {item.name}
                            </Link>
                        ))
                    }
                    <button className='font-semibold text-neutral-200 text-lg text-shadow-sm'>
                        Contact Us
                    </button>

                </div>
            )}

        </nav>

    )
}

export default Navbar