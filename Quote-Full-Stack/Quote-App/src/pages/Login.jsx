import React, { useState } from "react";
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  // State for all form value
 
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const navigate = useNavigate()
//   handle Submit function to handle the after submission
   const handleSubmit= async(e)=>{
    e.preventDefault()
    // help to prevent page reload before submitting
    try{
        // for posting the response to the server we use axios with url 
        const response= await axios.post('http://localhost:5000/api/auth/login',
        {email,password}
      );
        if(response.data.sucess){
          localStorage.setItem("token", response.data.token)
          navigate('/login')
        }
    }
    catch(error){
        //   to display error
        console.log(error)
    }
   }
  return (
    <div className="flex justify-center items-center bg-gray-100 min-h-screen">
      {/* Heading For Sign up form */}
      <div className="border shadow w-80 p-6 bg-white">
        <h2 className="text-2xl mb-2 font-bold">Login </h2>
        <div>
          <form onSubmit={handleSubmit}>
            
            {/* email form */}
            <div>
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border"
                onChange={(e)=>SetEmail(e.target.value)}
                placeholder="Enter Email"
                required
              />
            </div>
            {/* password form */}
            <div>
              <label htmlFor="Password" className="block text-gray-700">
                Password
              </label>
              <input
                type="Password"
                className="w-full px-3 py-2 border"
                onChange={(e)=>SetPassword(e.target.value)}
                placeholder="Enter Password"
                required
              />
            </div>
            {/* button for sign up */}
            <button className="w-full bg-teal-600 text-white py-2">
              Login In
            </button>
            <p className="text-center">
              Dont Have Account <Link to="/register">Register</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
