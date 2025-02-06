import React, { useState } from "react";
import axios from "axios"
const Signup = () => {
  // State for all form value
  const [name, SetName] = useState("");
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  
//   handle Submit function to handle the after submission
   const handleSubmit= async(e)=>{
    e.preventDefault()
    // help to prevent page reload before submitting
    try{
        // for posting the response to the server we use axios with url 
        const response= await axios.post('http://localhost:5000/api/auth/register',{name,email,password})
        console.log(response)
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
        <h2 className="text-2xl mb-2 font-bold">Sign Up</h2>
        <div>
          <form onSubmit={handleSubmit}>
            {/* username form */}
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700">
                UserName
              </label>
              <input
                type="name"
                className="w-full px-3 py-2 border"
                onChange={(e)=>SetName(e.target.value)}
                placeholder="Enter Name"
                required
              />
            </div>
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
              Sign Up
            </button>
            <p className="text-center">
              Already Have Account <a href="">Login</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
