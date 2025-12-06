import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authAction } from "../../store/auth";
import React from "react";

interface Item {
  id: number;
  title: string;
  links?: string;
}

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const items: Item[] = [
    { id: 1, title: "Login", links: "/login" },
    { id: 2, title: "Register", links: "/register" },
    { id: 3, title: "Add Habit", links: "/habit" },
    { id: 4, title: "Logout", links: "/" },
  ];

  const isLoggedIn = useSelector((state: any) => state?.auth?.isloggedIn);

  const handleLogout = () => {
    localStorage.clear();
    localStorage.removeItem('id')
    window.location.reload();
    navigate("/");
  };

  const navItems = isLoggedIn ? items.slice(2, 4) : items.slice(0, 2);

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          to={"/"}
          className="text-2xl font-extrabold tracking-tight text-red-500 hover:text-red-600 transition-colors duration-300"
        >
          Habit
          <span className="text-gray-800 font-semibold">App</span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-4">
          {navItems.map((value) =>
            value.title === "Logout" ? (
              <button
                key={value.id}
                onClick={handleLogout}
                className="px-5 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-red-400 to-red-500 text-white hover:from-red-500 hover:to-red-600 transition-all duration-300 shadow-sm hover:shadow-md active:scale-95"
              >
                {value.title}
              </button>
            ) : (
              value.links && (
                <Link
                  to={value.links}
                  key={value.id}
                  className="px-5 py-2 rounded-xl text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-red-400 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md active:scale-95"
                >
                  {value.title}
                </Link>
              )
            )
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
