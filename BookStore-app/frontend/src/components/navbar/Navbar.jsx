import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import image from "../../assests/newbook.png"
import { useSelector } from 'react-redux'
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";

const Navbar = () => {
  const islogged = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const location = useLocation();
  const [mobilenav, setMobilenav] = useState(false);

  // Create nav items conditionally (without mutating original array)
  const baseNav = [
    { id: 1, name: "Home", links: "/" },
    { id: 2, name: "All Books", links: "/book" },
    { id: 3, name: "Cart", links: "/cart" },
    { id: 4, name: "Profile", links: "/profile" },
    { id: 5, name: "Admin Profile", links: "/profile" }
  ];

  let navitem = [...baseNav];
  if (!islogged) {
    navitem = navitem.slice(0, 2); // only Home, All Books
  } else if (role === "admin") {
    navitem = navitem.filter(item => item.name !== "Profile");
  } else if (role === "user") {
    navitem = navitem.filter(item => item.name !== "Admin Profile");
  }

  return (
    <nav className='flex justify-between items-center h-[8ch] w-full px-6 sm:px-20 bg-gray-900 shadow-md relative z-50'>
      <h1 className='text-2xl text-neutral-200 font-semibold flex items-center'>
        <img src={image} className='w-fit aspect-video h-[4rem]' alt="Logo" />
        BookStore
      </h1>

      {/* Desktop Nav */}
      <div className='hidden sm:flex flex-row items-center gap-x-4 text-lg'>
        {navitem.map((item) => (
          <Link
            key={item.id}
            to={item.links}
            className={`transition-all ${
              location.pathname === item.links
                ? 'text-blue-500 font-semibold border-b-2 border-blue-500 pb-1'
                : 'text-neutral-200 hover:text-blue-500'
            }`}
          >
            {item.name}
          </Link>
        ))}

        {!islogged && (
          <>
            <Link to="/signin" className='text-neutral-200 border-2 px-2 py-1 border-blue-500 hover:bg-blue-500/15 rounded-xl transition-all duration-300'>Sign In</Link>
            <Link to="/login" className='text-neutral-200 hover:border-2 px-2 py-1 bg-blue-500 rounded-xl transition-all duration-300 hover:border-blue-500 hover:bg-gray-900'>Log In</Link>
          </>
        )}
      </div>

      {/* Mobile Toggle Button */}
      <button onClick={() => setMobilenav(!mobilenav)} className='sm:hidden text-neutral-400 hover:text-neutral-200 transition-all duration-300'>
        {mobilenav ? <FaXmark /> : <FaBarsStaggered />}
      </button>

      {/* Mobile Nav */}
      {mobilenav && (
        <div className='sm:hidden flex flex-col absolute top-[8ch] left-0 w-full bg-gray-900 px-6 py-4 gap-y-3 z-40'>
          {navitem.map((item, i) => (
            <Link
              key={i}
              to={item.links}
              className='text-neutral-300 bg-zinc-800 py-2 px-4 rounded-xl font-semibold hover:text-blue-400 transition-all duration-200'
              onClick={() => setMobilenav(false)}
            >
              {item.name}
            </Link>
          ))}
          {!islogged && (
            <>
              <Link to="/signin" className='text-neutral-300 bg-zinc-800 py-2 px-4 rounded-xl hover:text-blue-400 transition-all duration-200' onClick={() => setMobilenav(false)}>Sign In</Link>
              <Link to="/login" className='text-neutral-300 bg-blue-500 py-2 px-4 rounded-xl hover:bg-blue-600 transition-all duration-200' onClick={() => setMobilenav(false)}>Log In</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
