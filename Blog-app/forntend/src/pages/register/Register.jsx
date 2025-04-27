import React, { useState } from 'react'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { FaEye, FaEyeSlash, FaUser, FaLock } from "react-icons/fa";

const Register = () => {
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  async function registerUser(e) {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:8000/api/users/register', {
        username,
        password,
      });

      if (response.status === 200) {
        toast.success("Successfully registered")
        setUsername('');
        setPassword('');
        navigate('/login')
      } else {
        toast.error('Error during registration')
      }
    } catch (error) {
      console.log(error);
      toast.error('Server error. Please try again later.')
    }
  }

  return (
    <div className="flex justify-center items-center h-[85vh] bg-gray-50">
      <ToastContainer />
      <div className="w-96 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Create Account</h2>
        
        <form onSubmit={registerUser}>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="username">
              Username
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-400">
                <FaUser />
              </span>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-400">
                <FaLock />
              </span>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a password"
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors duration-300 shadow-md"
          >
            Register
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <a 
              href="/login" 
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register