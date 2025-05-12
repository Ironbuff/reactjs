import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { authActions } from '../../store/auth'
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showpassword, setShowpassword] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (username === "" || password === "") {
      alert('Please enter value of all the fields')
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/api/users/login', { username, password })
      console.log(response.data)

      dispatch(authActions.login())
      dispatch(authActions.changeRole(response.data.role))

      localStorage.setItem("id", response.data.id)
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("role", response.data.role)
      navigate('/profile')
    } catch (err) {
      alert(err.response.data.message)
    }
  }

  return (
    <div className='h-screen flex items-center justify-center bg-gradient-to-r from-neutral-900 to-neutral-800 px-4'>
      <form
        className='bg-zinc-900 w-full max-w-md p-8 rounded-2xl shadow-2xl space-y-6 border border-zinc-700'
        onSubmit={handleSubmit}
      >
        <h2 className='text-4xl font-bold text-center text-white'>Welcome Back</h2>
        <p className='text-center text-neutral-400 text-sm'>Log in to access your account</p>

        {/* Username Field */}
        <div className='flex flex-col gap-1'>
          <label htmlFor="username" className='text-sm text-neutral-300'>Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='px-4 py-2 rounded-md bg-zinc-800 text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
            placeholder="Enter your username"
          />
        </div>

        {/* Password Field */}
        <div className='flex flex-col gap-1 relative'>
          <label htmlFor="password" className='text-sm text-neutral-300'>Password</label>
          <input
            id="password"
            type={showpassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='px-4 py-2 pr-10 rounded-md bg-zinc-800 text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
            placeholder="Enter your password"
          />
          <span
            onClick={() => setShowpassword(!showpassword)}
            className='absolute top-9 right-3 text-neutral-400 hover:text-white cursor-pointer transition'
          >
            {showpassword ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200'
        >
          Log In
        </button>

        {/* Divider */}
        <div className='flex items-center justify-center gap-2 text-neutral-400 text-sm'>
          <span>Don't have an account?</span>
          <Link to="/signin" className='text-blue-500 hover:underline transition'>Sign In</Link>
        </div>
      </form>
    </div>
  )
}

export default Login
