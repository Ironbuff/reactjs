import React from "react";
import { NavLink } from "react-router-dom";
const Navlinks = () => {
  return (
    <div>
     {/* listing nav litems */}
      <ul className="list-none">
        <li className="px-2 py-2 text-neutral-400">
            <NavLink to="/">   
            All Users
                </NavLink>
        </li>
        <li>
            <NavLink to="/">   
            My Places
                </NavLink>
        </li>
        <li>
            <NavLink to="/">   
            Add Place
                </NavLink>
        </li>
        <li>
            <NavLink to="/">   
           Authenicate
                </NavLink>
        </li>
        
      </ul>
    </div>
  );
};

export default Navlinks;
