import axios from 'axios'
import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

const Register = () => {
   
    const[username,setUsername]= useState('')
    const[password,setPassword]=useState('')
    const navigate = useNavigate()

 //function to handle login
 async function handleSubmit(e) {
    e.preventDefault();
   try{
    const response = await axios.post('http://localhost:2000/api/users/register',
        {username,password},
        // to send cookie 
        {withCredentials:true}
      );
     if(response.status===200){
        toast.success("User Login Sucessful");
        setPassword('');
        setUsername('');
        navigate("/login") //take to login in page
     }
     toast.error("USer login was unsucessful") 
    }
    catch(err){
        toast.error("credential match",err)
    }   
 }



  return (
    <div className="bg-gray-100 h-[calc(100vh-13ch)] flex items-center justify-center p-4"> {/* Added p-4 to the main container */}
      <ToastContainer />
      <div className="bg-white rounded-md shadow-md w-96 p-8"> {/* Added p-8 to the inner container */}
        <h2 className="text-2xl font-semibold pb-6 text-center text-gray-800">Register</h2> {/* Changed mb-6 to pb-6 */}
        <form onSubmit={handleSubmit}>
          {/* username */}
          <div className="pb-4"> {/* Changed mb-4 to pb-4 */}

            <label htmlFor="username" className="block text-gray-700 text-sm font-bold pb-2"> {/* Changed mb-2 to pb-2 */}
              Username
            </label>
            <input
              type="text"
              id="username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your username"
              value={username}
              onChange={e=>setUsername(e.target.value)}
            />
          </div>
          {/* password */}
          <div className="pb-6"> {/* Changed mb-6 to pb-6 */}
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold pb-2"> {/* Changed mb-2 to pb-2 */}
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your password"
              value={password}
              onChange={e=>setPassword(e.target.value)}
            />
          </div>
          {/* log in */}
          <div className="flex flex-col items-center">
            <button
              className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline pb-4" 
              type="submit"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register