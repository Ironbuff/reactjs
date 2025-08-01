import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../User-Context';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  async function login(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8000/api/users/login',
        { username, password },
        { withCredentials: true }
      );
      if (response.status === 200) {
        setUserInfo(response.data);
        setRedirect(true);
      }
    } catch (error) {
      alert('Wrong credentials or server error',error);
    }
  }

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <form 
        className="bg-neutral-50 p-8 rounded-2xl shadow-lg w-full sm:w-[30%] flex flex-col gap-4" 
        onSubmit={login}
      >
        <h2 className="text-2xl font-bold text-center text-gray-800/80 mb-4">Login to Your Account</h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            className="absolute top-4 right-3 text-gray-600 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button 
          type="submit"
          className="w-full bg-gray-700 hover:bg-gray-800 transition-all text-white font-semibold py-3 rounded-lg shadow-md"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
