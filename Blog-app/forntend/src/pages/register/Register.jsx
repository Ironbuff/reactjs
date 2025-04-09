import React, { useState } from 'react'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const[password,setPassword]= useState('')
  const[username,setUsername]=useState('')
  const navigate = useNavigate()
  const[showpassword,setShowpassword]= useState(false) //for showing password state

  async function registerUser(e){
          e.preventDefault()
          try{
            const response=await axios.post('http://localhost:8000/api/users/register',{
              username,
              password,
            });
            
            //to check if register is sucessful
            if(response.status==200){
              toast.success("Sucessfully registered")
              setUsername('');
              setPassword('');
              navigate('/login')
            }
            else{
              toast.error('error during login')
            }

          }catch(error){
               console.log(error);
              alert('server error')
          }
  }
  
  return (
  
    <div className="flex justify-center items-center h-[85vh]">
      <ToastContainer/>
      <form className="w-80" onSubmit={registerUser}>
        <input
          type="text"
          placeholder="username"
          className="w-full p-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
        />
        <div className='relative'>
        <input
          type={showpassword?'text':'password'}
          placeholder="password"
          className="w-full p-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-gray-400 "
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />
        <span 
        className='absolute top-3 bottom-3 left-70 cursor-pointer'
        onClick={()=>setShowpassword(!showpassword)}
        >
            {showpassword?<FaEyeSlash/>:<FaEye />}
        </span>

        </div>
        
        <button
          type="submit"
          className="w-full bg-gray-600 text-white p-2 rounded-md"
        >
         Register
        </button>
      </form>
    </div>

  )
}

export default Register