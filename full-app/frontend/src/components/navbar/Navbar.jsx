import React from 'react'
import { FaBook } from "react-icons/fa";
import userimage from '../../assests/user.png'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { authActions } from '../../store';

const Nabar = () => {
    // Check if user is logged in by looking at the current app state
    const isLoggedIn = useSelector((state)=> state.isLoggedIn);
    const dispatch = useDispatch();


    const logout = () =>{
        sessionStorage.clear("id")
       dispatch(authActions.loggout()); //convert value of is loggin from true to false
    }

    // Print the login status to see if user is logged in or not
    console.log(isLoggedIn)

  return (
    <div className='flex flex-row justify-between px-28 items-center h-[12ch] border-b border-neutral-100 shadow-md'>
        <div className='flex flex-row gap-x-5 items-center'>
            <FaBook className='object-fit h-15 text-red-500'/>
            <h1 className='font-bold text-2xl text-red-500'>
                <Link to="/"> todo</Link>
                </h1>
        </div>
        <div className='flex items-center'>
            <ul className='list-none flex flex-row gap-x-3'>
                <li className='px-2 py-2 bg-red-500 text-neutral-100 rounded-lg'>
                   <Link to='/todo'> Todo </Link>
                </li>
                
                {/* here if user is logged in it shows login and sign in option */}
                {!isLoggedIn && (
                    <>
                    <li className='px-2 py-2 bg-red-500 text-neutral-100 rounded-lg'>
                   <Link to='/login'> LogIn </Link>
                </li>
                <li className='px-2 py-2 bg-red-500 text-neutral-100 rounded-lg'>
                <Link to="/signin"> SignIn</Link>
                </li>
                </>
                )}
         
                {/* if user is logged In then they are shown this option */}
                {isLoggedIn &&(
                  <> 
                  <li className='px-2 py-2 bg-red-500 text-neutral-100 rounded-lg' onClick={logout}>
                   <Link to='/'> LogOut </Link>
                </li>
                
                    
                <li>
                <img src={userimage} className='aspect-ratio flex items-center w-auto h-10'/>
               </li>
               </>
                )}


                
            </ul>
        </div>
    </div>
  )
}

export default Nabar