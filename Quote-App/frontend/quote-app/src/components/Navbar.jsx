import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../User-Context';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FaBars, FaTimes, FaPlus, FaSignOutAlt, FaSignInAlt, FaUserPlus } from 'react-icons/fa';

const Navbar = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [mobilenav, setMobilenav] = useState(false); // Fixed useState destructuring

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:2000/api/users/profile', { withCredentials: true });
        setUserInfo(res.data);
      } catch (err) {
        toast.error('Error in fetching data', err);
      }
    };
    fetchProfile();
  }, [setUserInfo]);

  const user = userInfo?.username;

  const logout = () => {
    axios.post("http://localhost:2000/api/users/logout");
    setUserInfo(null);
  };

  return (
    <div className='w-full shadow-md top-0 left-0 z-10 bg-white'>
      <div className='flex justify-between items-center px-6 py-4 md:px-28'>
        <div>
          <h1 className='text-2xl font-bold text-red-400'>Quote App</h1>
        </div>
        <div className='md:hidden text-2xl text-red-500 cursor-pointer' onClick={() => setMobilenav(!mobilenav)}>
          {mobilenav ? <FaTimes /> : <FaBars />}
        </div>
        <ul className='hidden md:flex gap-5 items-center'>
          {!user ? (
            <>
              <li className='bg-red-500 px-4 py-2 rounded-xl text-white flex items-center gap-2'>
                <FaSignInAlt />
                <Link to='/login'>Log In</Link>
              </li>
              <li className='bg-red-500 px-4 py-2 rounded-xl text-white flex items-center gap-2'>
                <FaUserPlus />
                <Link to='/register'>Register</Link>
              </li>
            </>
          ) : (
            <>
              <li className='bg-red-500 px-4 py-2 rounded-xl text-white flex items-center gap-2'>
                <FaPlus />
                <Link to='/addquote'>Add Quote</Link>
              </li>
              <li className='bg-red-500 px-4 py-2 rounded-xl text-white flex items-center gap-2'>
                <FaSignOutAlt />
                <Link to='/' onClick={logout}>Logout</Link>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Mobile Nav */}
      {mobilenav && (
        <ul className='md:hidden flex flex-col items-start px-6 py-4 gap-3 bg-white shadow-md'>
          {!user ? (
            <>
              <li className='bg-red-500 px-4 py-2 rounded-xl text-white w-full flex items-center gap-2'>
                <FaSignInAlt />
                <Link to='/login'>Log In</Link>
              </li>
              <li className='bg-red-500 px-4 py-2 rounded-xl text-white w-full flex items-center gap-2'>
                <FaUserPlus />
                <Link to='/register'>Register</Link>
              </li>
            </>
          ) : (
            <>
              <li className='bg-red-500 px-4 py-2 rounded-xl text-white w-full flex items-center gap-2'>
                <FaPlus />
                <Link to='/addquote'>Add Quote</Link>
              </li>
              <li className='bg-red-500 px-4 py-2 rounded-xl text-white w-full flex items-center gap-2'>
                <FaSignOutAlt />
                <Link to='/' onClick={() => { logout(); setMobilenav(false); }}>Logout</Link>
              </li>
            </>
          )}
        </ul>
      )}
    </div>
  );
};

export default Navbar;
