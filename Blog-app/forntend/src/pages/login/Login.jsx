import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../User-Context';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const {setUserInfo}=useContext(UserContext)
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

  // Redirect user after successful login
  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex justify-center items-center h-[85vh]">
      <form className="w-80" onSubmit={login}>
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="w-full bg-gray-600 text-white p-2 rounded-md">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
