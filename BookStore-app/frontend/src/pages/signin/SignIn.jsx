import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { FaEye, FaEyeSlash } from 'react-icons/fa'
const SignIn = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [address, setAddress] = useState('')
  const [showpassword,setShowpassword] = useState(false)
  const navigate = useNavigate()

 const handleRegister = async(e)=>{
  try{
    e.preventDefault()
    if(email===""||username===""||password===""||address===""){
      alert('please fill in all values')
      return;
    }
    const response = await axios.post('http://localhost:3000/api/users/register',{username,email,password,address})
    alert(response.data.message)
    navigate("/login")
  }
  catch(err){
    console.log(err)
  }
 }
  
  
  
  return (
    <div className='min-h-screen flex items-center justify-center bg-neutral-900 px-4'>
      <form className='bg-zinc-800 w-full max-w-md p-8 rounded-xl shadow-lg space-y-6'onSubmit={handleRegister}>
        <h2 className='text-3xl font-semibold text-center text-white'>Sign In</h2>

        {/* Username Field */}
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

        {/* Email Field */}
        <div className='flex flex-col'>
          <label htmlFor="email" className='text-neutral-300 py-1'>Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='px-4 py-2 rounded-md bg-zinc-700 text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder="Enter your email"
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
          <span
          onClick={()=>setShowpassword(!showpassword)}
          className='absolute top-11 right-3 text-neutral-400 cursor-grab'
          >
            {showpassword?<FaEye/>:<FaEyeSlash/>}
          </span>
        </div>

        {/* Address Field */}
        <div className='flex flex-col'>
          <label htmlFor="address" className='text-neutral-300 py-1'>Address</label>
          <input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className='px-4 py-2 rounded-md bg-zinc-700 text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder="Enter your address"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className='w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200'
        >
          Submit
        </button>
        <h1 className='text-neutral-300 text-base'>
         OR  Already Have a Account <Link to={"/login"} className='text-blue-600 cursor-pointer'>Log In</Link>
        </h1>
      </form>
    </div>
  )
}

export default SignIn
