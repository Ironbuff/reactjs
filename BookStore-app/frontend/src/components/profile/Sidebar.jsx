import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoIosLogOut } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/auth';
const Sidebar = ({ data }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const role = useSelector((state) => state.auth.role)

    const logouthandle = () => {

        dispatch(authActions.logout())
        dispatch(authActions.changeRole('user'))
        localStorage.clear("id");
        localStorage.clear("token");
        localStorage.clear("role");
        navigate('/')
    }

    return (
        <div className='bg-neutral-900 flex flex-col items-center justify-between h-auto '>
            <div className='flex flex-col gap-y-3 items-center justify-center'>
                <img src={data.avatar} className='h-[20vh] px-5 py-3' />
                <h1 className='text-neutral-300 text-xl font-semibold'>{data.username}</h1>
                <small className='text-neutral-300 text-base font-light'>{data.email}</small>
                <div className='bg-neutral-300 h-1 w-full'></div>
            </div>
            <div className='flex flex-col gap-y-7 items-center py-15'>
                {role === "user" &&
                    <>
                        <Link to={'/profile'} className='text-neutral-300 font-semibold '>
                            Favourites
                        </Link>
                        <Link to={'/profile/order'} className='text-neutral-300 font-semibold '>
                            Order History
                        </Link>
                        <Link to={'/profile/settings'} className='text-neutral-300 font-semibold '>
                            Settings
                        </Link>
                    </>


                }
                 {role === "admin" &&
                    <>
                        <Link to={'/profile'} className='text-neutral-300 font-semibold '>
                            All Orders
                        </Link>
                        <Link to={'/profile/books'} className='text-neutral-300 font-semibold '>
                            Add Books
                        </Link>
                    </>


                }
            </div>
            <div className='mb-6'>
                <button className='text-neutral-300 font-semibold flex flex-row items-center justify-center gap-x-2 bg-neutral-600  px-2 py-2 rounded-lg hover:bg-blue-500 transition-all duration-300 ease-in-out' onClick={logouthandle}>
                    Logout <IoIosLogOut />
                </button>
            </div>



        </div>
    )
}

export default Sidebar