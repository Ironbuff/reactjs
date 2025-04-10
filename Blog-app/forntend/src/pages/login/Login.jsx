import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../User-Context';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const[showpassword,setShowpassword]= useState(false) //for showing password state
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
        <button type="submit" className="w-full bg-gray-600 text-white p-2 rounded-md">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
