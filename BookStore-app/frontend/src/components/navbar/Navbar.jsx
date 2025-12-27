import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import image from "../../assests/newbook.png";
import { useSelector } from 'react-redux';
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";

const Navbar = () => {
  const islogged = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const location = useLocation();
  const [mobilenav, setMobilenav] = useState(false);
  const route = useNavigate()

  const baseNav = [
    { id: 1, name: "Home", links: "/" },
    { id: 2, name: "All Books", links: "/book" },
    { id: 3, name: "Cart", links: "/cart" },
    { id: 4, name: "Profile", links: "/profile" },
    { id: 5, name: "Admin Profile", links: "/profile" }
  ];

  let navitem = [...baseNav];
  if (!islogged) {
    navitem = navitem.slice(0, 2);
  } else if (role === "admin") {
    navitem = navitem.filter(item => item.name !== "Profile");
  } else if (role === "user") {
    navitem = navitem.filter(item => item.name !== "Admin Profile");
  }

  return (
    <nav className='flex justify-between items-center h-[8ch] w-full px-6 sm:px-20 bg-gray-950 shadow-lg relative z-50 border-b border-gray-800'>
      <button onClick={()=>route('/')}
      className='text-2xl text-white font-bold flex items-center gap-3 cursor-pointer'>
        <img src={image} className='h-12 w-auto object-contain' alt="Logo" />
        BookStore
      </button>

      {/* Desktop Nav */}
      <div className='hidden sm:flex items-center gap-x-6 text-base font-medium'>
        {navitem.map((item) => (
          <Link
            key={item.id}
            to={item.links}
            className={`transition-all duration-300 px-2 py-1 rounded-md ${
              location.pathname === item.links
                ? 'text-blue-500 border-b-2 border-blue-500'
                : 'text-gray-300 hover:text-blue-400 hover:bg-gray-800'
            }`}
          >
            {item.name}
          </Link>
        ))}

        {!islogged && (
          <>
            <Link
              to="/signin"
              className='text-gray-200 border border-blue-500 px-3 py-1 rounded-lg hover:bg-blue-500/20 transition duration-300'
            >
              Sign In
            </Link>
            <Link
              to="/login"
              className='text-white bg-blue-600 px-3 py-1 rounded-lg hover:bg-blue-700 transition duration-300'
            >
              Log In
            </Link>
          </>
        )}
      </div>

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setMobilenav(!mobilenav)}
        className='sm:hidden text-gray-300 hover:text-white transition-all duration-300 text-xl'
      >
        {mobilenav ? <FaXmark /> : <FaBarsStaggered />}
      </button>

      {/* Mobile Nav */}
      {mobilenav && (
        <div className='sm:hidden flex flex-col absolute top-[8ch] left-0 w-full bg-gray-950 px-6 py-4 gap-y-3 z-40 border-t border-gray-800'>
          {navitem.map((item, i) => (
            <Link
              key={i}
              to={item.links}
              className='text-gray-200 font-medium px-4 py-2 rounded-md bg-gray-800 hover:bg-blue-600 hover:text-white transition-all duration-200'
              onClick={() => setMobilenav(false)}
            >
              {item.name}
            </Link>
          ))}
          {!islogged && (
            <>
              <Link
                to="/signin"
                className='text-gray-200 font-medium px-4 py-2 rounded-md bg-gray-800 hover:bg-blue-500 transition duration-200'
                onClick={() => setMobilenav(false)}
              >
                Sign In
              </Link>
              <Link
                to="/login"
                className='text-white font-medium px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition duration-200'
                onClick={() => setMobilenav(false)}
              >
                Log In
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
