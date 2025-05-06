import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import { authActions } from '../../store/auth'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
const Login = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showpassword,setShowpassword] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async(e) =>{
    try{
      e.preventDefault()
      if(username==="",password===""){
        alert('Please enter value of all the field')
        return;
      }
      const response = await axios.post('http://localhost:3000/api/users/login',{username,password})
      console.log(response.data)

      dispatch (authActions.login())
      dispatch(authActions.changeRole(response.data.role))
      //set the value in localStorage which can be view in application localstorage and inside localhost section
      localStorage.setItem("id",response.data.id)
      localStorage.setItem("token",response.data.token)
      localStorage.setItem("role",response.data.role)
      navigate('/profile')
    }
    catch(err){
      alert(err.response.data.message)
    }
  }
  

  return (
    <div className='h-[calc(100vh-13ch)] flex items-center justify-center bg-neutral-900 px-4'>
      <form className='bg-zinc-800 w-full max-w-md p-8 rounded-xl shadow-lg space-y-6' onSubmit={handleSubmit}>
        <h2 className='text-3xl font-semibold text-center text-white'>Log In</h2>

        {/* Email Field */}
        <div className='flex flex-col'>
          <label htmlFor="username" className='text-neutral-300 py-1'>Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='px-4 py-2 rounded-md bg-zinc-700 text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder="Enter your username"
          />
        </div>

        {/* Password Field */}
        <div className='flex flex-col relative'>
          <label htmlFor="password" className='text-neutral-300 py-1'>Password</label>
          <input
            id="password"
            type={showpassword?"text":"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='px-4 py-2 rounded-md bg-zinc-700 text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder="Enter your password"
          />
          <span onClick={()=>setShowpassword(!showpassword)} className='absolute top-11 left-85 text-neutral-400'>
              {showpassword?<FaEye />:<FaEyeSlash />}
          </span>
        </div>


        {/* Submit Button */}
        <button
          type="submit"
          className='w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200'
        >
          log In
        </button>
        {/* or button */}
        <h1 className='text-neutral-300 text-base'>
         OR  Dont have a Account <Link to={"/signin"} className='text-blue-600 cursor-pointer  '>Sign In</Link>
        </h1>
      </form>
    </div>
  )
}

export default Login
