import axios from 'axios';
import React, { useContext, useEffect} from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from '../../User-Context';

const Navbar = () => {
  const{setUserInfo,userInfo}=useContext(UserContext)

  useEffect(() => {
    // Axios request to get user profile data
    axios
      .get('http://localhost:8000/api/users/profile', { withCredentials: true }) //since the browser sends boolean instead of string so it should give boolean value
      .then(response => {
        //set UserInfo defined in User-Context
        setUserInfo(response.data) // FETCH REQUIRE response.json() and axios automatically parses JSON into response.data
        })
      .catch(error => {
        // Handling errors if request fails
        console.error("Error fetching user info:", error);
      })
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  function logout(){
    //to invalidate cookie
    axios.post("http://localhost:8000/api/users/logout")
    setUserInfo(null)//userinfo is taken from user-context
  }

  //since username is inside userinfo we can use it and sometimes user info is null so we user ?
  const username= userInfo?.username

  return (
    <div className="flex flex-row items-center justify-between h-[10ch] shadow-lg w-full bg-neutral-100 px-28">
      <ul className="flex flex-row justify-between items-center gap-x-5 w-full list-none">
        <li className="text-xl font-semibold">
          <Link to="/" className='text-2xl text-neutral-700 bg-neutral-500 px-4 py-2 rounded-4xl hover:bg-neutral-500/25'><span className='text-2xl text-neutral-400'>My</span> Blog</Link>
        </li>
        <li className="text-l font-normal px-5">
          {username ? (
            <>
              <Link className="px-3 mx-3 bg-neutral-500 py-3 rounded-4xl text-neutral-300 hover:bg-neutral-500/80" to="/createpost">Create New Post</Link>
              <Link  className="px-3 bg-neutral-500 py-3 rounded-4xl text-neutral-300  hover:bg-neutral-500/80" to="/" onClick={logout}>Logout</Link>
            </>
          ) : (
            <>
              <Link className="px-3 mx-3 bg-neutral-500 py-3 rounded-4xl text-neutral-300 hover:bg-neutral-500/80" to="/login">Login</Link>
              <Link className="px-3 mx-3 bg-neutral-500 py-3 rounded-4xl text-neutral-300 hover:bg-neutral-500/80" to='/register'>Register</Link>
            </>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
