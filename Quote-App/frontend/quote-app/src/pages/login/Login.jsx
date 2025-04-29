import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for react-toastify
import { UserContext } from '../../User-Context';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa6';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);
  const [showpassword, setShowpassword] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:2000/api/users/login',
        { username, password },
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success('Login Successful', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
        setUserInfo(response.data);
        setRedirect(true);
      } else {
        toast.error('Error in Login or wrong credentials', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error('Error During Login', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  }

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="bg-gradient-to-br from-gray-200 to-gray-300 h-[calc(100vh-13ch)] flex items-center justify-center p-6">
      <ToastContainer />
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-10">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          <span className="text-red-500">L</span>og<span className="text-red-500">i</span>n
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          {/* Password */}
          <div className="relative">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type={showpassword ? 'text' : 'password'}
              id="password"
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer"
              onClick={() => {
                setShowpassword(!showpassword);
              }}
            >
              {showpassword ? <FaEye className="text-gray-500" /> : <FaEyeSlash className="text-gray-500" />}
            </span>
          </div>
          {/* Log In Button */}
          <div className="flex flex-col items-center">
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-md focus:outline-none focus:shadow-outline w-full"
              type="submit"
            >
              Log In
            </button>
            {/* Register Link */}
            <Link
              to="/register"
              className="inline-block align-baseline font-semibold text-sm text-blue-500 hover:text-blue-700 mt-4"
            >
              Don't have an account? Register here.
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;