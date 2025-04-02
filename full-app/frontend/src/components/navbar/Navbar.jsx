import React from 'react';
import { FaBook, FaUser, FaTasks, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import userImage from '../../assests/user.png';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { authActions } from '../../store';

const Navbar = () => {
  // Check if user is logged in by looking at the current app state
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();
  
  const logout = () => {
    sessionStorage.clear("id");
    dispatch(authActions.loggout()); //convert value of is loggin from true to false
  };

  // Print the login status to see if user is logged in or not
  console.log(isLoggedIn);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand Name */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 hover:opacity-90 transition duration-150">
              <FaBook className="h-8 w-8 text-red-600" />
              <span className="font-bold text-2xl text-red-600 tracking-tight">todo</span>
            </Link>
          </div>
          
          {/* Navigation Links */}
          <div className="flex items-center">
            <div className="hidden md:block">
              <div className="flex items-center space-x-4">
                <Link 
                  to="/todo" 
                  className="flex items-center space-x-1 px-4 py-2 bg-red-600 text-white rounded-md font-medium hover:bg-red-700 transition duration-150"
                >
                  <FaTasks className="h-4 w-4" />
                  <span>Todo</span>
                </Link>
                
                {/* here if user is logged in it shows login and sign in option */}
                {!isLoggedIn && (
                  <>
                    <Link 
                      to="/login" 
                      className="flex items-center space-x-1 px-4 py-2 bg-gray-100 text-gray-800 rounded-md font-medium hover:bg-gray-200 transition duration-150"
                    >
                      <FaSignInAlt className="h-4 w-4" />
                      <span>LogIn</span>
                    </Link>
                    <Link 
                      to="/signin" 
                      className="flex items-center space-x-1 px-4 py-2 border border-red-600 text-red-600 rounded-md font-medium hover:bg-red-50 transition duration-150"
                    >
                      <FaUser className="h-4 w-4" />
                      <span>SignIn</span>
                    </Link>
                  </>
                )}
                
                {/* if user is logged In then they are shown this option */}
                {isLoggedIn && (
                  <div className="flex items-center space-x-4">
                    <Link 
                      to="/" 
                      onClick={logout}
                      className="flex items-center space-x-1 px-4 py-2 bg-gray-100 text-gray-800 rounded-md font-medium hover:bg-gray-200 transition duration-150"
                    >
                      <FaSignOutAlt className="h-4 w-4" />
                      <span>LogOut</span>
                    </Link>
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-gray-200">
                        <img 
                          src={userImage} 
                          alt="User Profile" 
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;