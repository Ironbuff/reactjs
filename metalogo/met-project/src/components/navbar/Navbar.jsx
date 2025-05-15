import React, { useState } from 'react';
import img from '../../assets/metalogo.png';
import { Link } from 'react-router-dom';
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaBars, FaX } from "react-icons/fa6";

const Navbar = () => {
  const [mobilenav, setMobilenav] = useState(false);

  const navitems = [
    { id: 1, title: "Home", links: "/home" },
    { id: 2, title: "Services", links: "/services" },
    { id: 3, title: "Career", links: "/career" },
    { id: 4, title: "Blog", links: "/blog" },
    { id: 5, title: "About Us", links: "/aboutus" },
  ];

  return (
    <nav className="md:bg-blue-950 bg-gray-300">
      {/* Top Nav Bar */}
      <div className="flex justify-between items-center h-[7ch] px-6 md:px-14">
        {/* Logo */}
        <div className="flex items-center gap-x-2 cursor-pointer">
          <img src={img} className="h-[7vh]" alt="logo" />
          <h1 className="md:text-neutral-100 text-blue-950 font-bold tracking-widest text-2xl">
            MetaLogic
          </h1>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-x-5 text-neutral-100 text-sm font-semibold">
          {navitems.map((item, i) => (
            <Link
              key={i}
              to={item.links}
              className="flex items-center gap-x-2 hover:text-neutral-50 hover:border-b-2 hover:border-red-500 py-2 transition-all duration-300"
            >
              {item.title}
              {item.title === "Services" && <MdKeyboardArrowDown />}
            </Link>
          ))}
        </div>

        {/* Desktop Button */}
        <div className="hidden md:flex">
          <button className="bg-red-500 px-4 py-2 rounded-lg text-sm text-neutral-200 shadow-sm font-semibold hover:text-neutral-200/60 cursor-pointer">
            Get In Touch
          </button>
        </div>

        {/* Mobile Toggle Button */}
        <div className="md:hidden">
          <button onClick={() => setMobilenav(!mobilenav)}>
            {mobilenav ? (
              <FaX className="text-neutral-100" size={20} />
            ) : (
              <FaBars className="text-red-400" size={22} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobilenav && (
        <div className="flex md:hidden flex-col items-center justify-center gap-6 py-12 bg-neutral-200 h-screen w-full fixed top-0 left-0 z-50">
          {/* Close Button */}
          <div className="absolute top-5 right-5">
            <button onClick={() => setMobilenav(false)}>
              <FaX className="text-black" size={20} />
            </button>
          </div>

          {navitems.map((item, i) => (
            <Link
              key={i}
              to={item.links}
              className="text-base font-semibold text-black"
              onClick={() => setMobilenav(false)}
            >
              {item.title}
            </Link>
          ))}

          <button className="px-4 py-2 text-neutral-200 rounded bg-blue-900 shadow-sm">
            Get In Touch
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
