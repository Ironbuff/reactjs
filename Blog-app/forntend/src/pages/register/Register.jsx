import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  async function registerUser(e) {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:8000/api/users/register', {
        username,
        password,
      })

      if (response.status === 200) {
        toast.success("Successfully registered")
        setUsername('')
        setPassword('')
        navigate('/login')
      } else {
        toast.error('Error during registration')
      }
    } catch (error) {
      console.error(error)
      alert('Server error')
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <ToastContainer />
      <form 
        className="w-full max-w-sm bg-white p-8 rounded-xl shadow-xl"
        onSubmit={registerUser}
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Create Account</h2>
        
        <input
          type="text"
          placeholder="Username"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-gray-400"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <div className="relative mb-4">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="absolute right-3 top-3 text-gray-600 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button
          type="submit"
          className="w-full bg-gray-700 hover:bg-gray-800 text-white py-2 rounded-lg transition duration-300"
        >
          Register
        </button>
      </form>
    </div>
  )
}

export default Register
