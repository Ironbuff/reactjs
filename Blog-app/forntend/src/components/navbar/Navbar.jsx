import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../User-Context';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/users/profile', { withCredentials: true })
      .then(response => setUserInfo(response.data))
      .catch(error => console.error("Error fetching user info:", error));
  }, []);

  const logout = () => {
    axios.post("http://localhost:8000/api/users/logout", {}, { withCredentials: true });
    setUserInfo(null);
    setMobileMenuOpen(false);
  };

  const username = userInfo?.username;

  const navLinkStyle = (path) =>
    `px-4 py-2 rounded-full transition-colors duration-200 ${
      location.pathname === path
        ? 'bg-neutral-700 text-white'
        : 'bg-neutral-300 hover:bg-neutral-400 text-neutral-800'
    }`;

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl sm:text-3xl font-bold text-neutral-700 flex items-center gap-1">
          <span className="text-neutral-500">My</span>Blog
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4">
          {username ? (
            <>
              <Link to="/createpost" className={navLinkStyle('/createpost')}>
                Create Post
              </Link>
              <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={navLinkStyle('/login')}>
                Login
              </Link>
              <Link to="/register" className={navLinkStyle('/register')}>
                Register
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Icon */}
        <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-neutral-700 transition">
          {isMobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <div
        className={`md:hidden bg-neutral-50 transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="flex flex-col gap-2 px-6 py-4">
          {username ? (
            <>
              <Link to="/createpost" className="bg-neutral-700 text-white px-4 py-2 rounded-full" onClick={() => setMobileMenuOpen(false)}>
                Create Post
              </Link>
              <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded-full">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="bg-neutral-700 text-white px-4 py-2 rounded-full" onClick={() => setMobileMenuOpen(false)}>
                Login
              </Link>
              <Link to="/register" className="bg-neutral-600 text-white px-4 py-2 rounded-full" onClick={() => setMobileMenuOpen(false)}>
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
