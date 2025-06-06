import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handlelogin = async (e) => {
    e.preventDefault()
    try {
      const data = {
        username,
        password,
      }

      const response = await axios.post('http://localhost:8081/api/users/login', data)
      console.log(response.status)

      if (response.status === 200) {
        alert(response.data.message)
        navigate('/')
        dispatch(authActions.login())
        dispatch(authActions.changeRole(response.data.role))
        localStorage.setItem("id", response.data.id)
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("role", response.data.role)

      }
      else{
        alert('login unsucessful')
      }
      
    }
    catch (err) {
      console.log(err)
    }
  }



  return (
    <div className="w-full h-[calc(100vh-10ch)] bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-700">Login</h1>

        <form onSubmit={handlelogin} className="space-y-6">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <FiLogIn /> Log In
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-600">
          Not registered yet?{' '}
          <Link to="/" className="text-blue-600 hover:underline font-medium">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
