import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../User-Context';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/users/profile', { withCredentials: true })
      .then(response => setUserInfo(response.data))
      .catch(error => console.error("Error fetching user info:", error));
  }, []);

  const logout = () => {
    axios.post("http://localhost:8000/api/users/logout");
    setUserInfo(null);
  };

  const username = userInfo?.username;

  return (
    <header className="bg-neutral-100 shadow-lg">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-neutral-700">
          <span className="text-neutral-400">My</span> Blog
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {username ? (
            <>
              <Link to="/createpost" className="bg-neutral-500 text-white px-4 py-2 rounded-full hover:bg-neutral-600">
                Create Post
              </Link>
              <button onClick={logout} className="bg-neutral-500 text-white px-4 py-2 rounded-full hover:bg-neutral-600">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="bg-neutral-500 text-white px-4 py-2 rounded-full hover:bg-neutral-600">
                Login
              </Link>
              <Link to="/register" className="bg-neutral-500 text-white px-4 py-2 rounded-full hover:bg-neutral-600">
                Register
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Icon */}
        <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-neutral-700">
          {isMobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-neutral-100 px-6 pb-4 space-y-3">
          {username ? (
            <>
              <Link to="/createpost" className="block bg-neutral-500 text-white px-4 py-2 rounded-full hover:bg-neutral-600">
                Create Post
              </Link>
              <button onClick={logout} className="block bg-neutral-500 text-white px-4 py-2 rounded-full hover:bg-neutral-600 w-full text-left">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block bg-neutral-500 text-white px-4 py-2 rounded-full hover:bg-neutral-600">
                Login
              </Link>
              <Link to="/register" className="block bg-neutral-500 text-white px-4 py-2 rounded-full hover:bg-neutral-600">
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;