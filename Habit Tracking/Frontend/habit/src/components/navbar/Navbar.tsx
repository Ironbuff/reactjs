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
    dispatch(authAction.logout());
    window.location.reload();
    navigate("/");
  };

  const navItems = isLoggedIn ? items.slice(2, 4) : items.slice(0, 2);

  return (
    <header className="bg-white shadow-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          to={"/"}
          className="text-2xl font-extrabold tracking-tight text-red-400 hover:text-red-500 transition"
        >
          Habit<span className="text-gray-800 font-semibold">App</span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-3">
          {navItems.map((value) =>
            value.title === "Logout" ? (
              <button
                key={value.id}
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-red-400 text-white hover:bg-red-500 transition duration-200 shadow-sm"
              >
                {value.title}
              </button>
            ) : (
              value.links && (
                <Link
                  to={value.links}
                  key={value.id}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-red-400 hover:text-white transition duration-200 shadow-sm"
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
