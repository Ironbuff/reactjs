import React from "react";
import { NavLink } from "react-router-dom";
const Navlinks = () => {
  return (
    <div>
     {/* listing nav litems */}
      <ul className="list-none flex flex-row items-center gap-x-4">
        <li className="px-2 py-2 text-neutral-50 hover:border border-neutral-800 hover:bg-yellow-600 hover:text-black ">
            <NavLink to="/">   
            All Users
                </NavLink>
        </li>
        <li className="px-2 py-2 text-neutral-50 hover:border border-neutral-800 hover:bg-yellow-600 hover:text-black">
            <NavLink to="/">   
            My Places
                </NavLink>
        </li>
        <li className="px-2 py-2 text-neutral-50 hover:border border-neutral-800 hover:bg-yellow-600 hover:text-black">
            <NavLink to="/">   
            Add Place
                </NavLink>
        </li>
        <li className="px-2 py-2 text-neutral-50 hover:border border-neutral-800 hover:bg-yellow-600 hover:text-black">
            <NavLink to="/">   
           Authenicate
                </NavLink>
        </li>
        
      </ul>
    </div>
  );
};

export default Navlinks;
