import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../User-Context'
import { toast } from 'react-toastify'
import axios from 'axios' // Don't forget to import axios

const Navbar = () => {
  const { setUserInfo, userInfo } = useContext(UserContext)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = axios.get('http://localhost:2000/api/users/profile', { withCredentials: true })
        setUserInfo(res.data)
      } catch (err) {
        toast.error('Error in fetching data',err)
      }
    }
    fetchProfile()
  }, [setUserInfo])

  const user = userInfo?.username

  function logout(){
    //to invalidate cookie
    axios.post("http://localhost:2000/api/users/logout")
    setUserInfo(null)//userinfo is taken from user-context
  }


  return (
    <div className='flex flex-row max-w-full px-28 justify-between h-[13ch] items-center shadow-md'>
      <div className='items-center justify-center'>
        <h1 className='text-2xl font-bold text-red-400'>Quote App</h1>
      </div>
      <div className='flex flex-row'>
        <ul className='list-none flex flex-row gap-x-5'>
          {!user ? (
            <>
              <li className='bg-red-500 px-2 py-2 rounded-2xl text-xl text-amber-50'>
                <Link to='/login'>Log In</Link>
              </li>
              <li className='bg-red-500 px-2 py-2 rounded-2xl text-xl text-amber-50'>
                <Link to='/register'>Register</Link>
              </li>
            </>
          ) : (
            <>
              <li className='bg-red-500 px-2 py-2 rounded-2xl text-xl text-amber-50'>
                <Link to='/addquote'>Add Quote</Link>
              </li>
              <li className='bg-red-500 px-2 py-2 rounded-2xl text-xl text-amber-50'>
                <Link to='/' onClick={logout}>Logout</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Navbar
