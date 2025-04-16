import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { UserContext } from '../../User-Context'

const Login = () => {
   
    const[username,setUsername]= useState('')
    const[password,setPassword]=useState('')
    const[redirect,setRedirect]= useState(false)
    const {setUserInfo} = useContext(UserContext)

 //function to handle login
 async function handleSubmit(e) {
    e.preventDefault();
    try{
      const response= await axios.post('http://localhost:2000/api/users/login',
        {username,password},
      {withCredentials:true})
      if(response.status===200){
         toast.success("login Sucessful");
         setUserInfo(response.data)
         setRedirect(true)
      }
      else{
        toast.error('Error in Login or wrong credential')
      }
    }
    catch(err){
      toast.error("Error During Login")
    }
    
 }
 if(redirect){
  return <Navigate to={"/"}/>
 }


  return (
    <div className="bg-gray-100 h-[calc(100vh-13ch)] flex items-center justify-center p-4"> {/* Added p-4 to the main container */}
    <ToastContainer/>
      <div className="bg-white rounded-md shadow-md w-96 p-8"> {/* Added p-8 to the inner container */}
        <h2 className="text-2xl font-semibold pb-6 text-center text-gray-800">Login</h2> {/* Changed mb-6 to pb-6 */}
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
              Log In
            </button>
            {/* logout */}
            <Link to="/register" className="inline-block align-baseline font-semibold text-sm text-blue-500 hover:text-blue-800">
              Don't have an account? Register here.
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login