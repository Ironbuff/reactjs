import React from "react";
import { RxAvatar } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth";

const Sidebar = ({ datas }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlelogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    dispatch(authActions.logout());
    alert("Successfully Logged Out");
    navigate("/");
  };

  return (
    <div className="w-full h-full flex flex-col justify-between bg-gray-100 p-4 rounded-lg shadow">
      <div className="flex flex-col gap-4">
        {/* User Info */}
        <div className="flex flex-col items-center gap-1 border-b border-gray-300 pb-4">
          <RxAvatar size={50} className="text-green-600" />
          <h2 className="text-lg font-semibold">{datas.username}</h2>
          <p className="text-sm text-gray-600">{datas.email}</p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-2 mt-4">
          {datas.role === "user" ? (
            <Link
              to="order"
              className="text-sm bg-blue-100 text-blue-700 p-2 rounded hover:bg-blue-200"
            >
              My Orders
            </Link>
          ) : (
            <>
              <Link
                to="total"
                className="text-sm bg-blue-100 text-blue-700 p-2 rounded hover:bg-blue-200"
              >
                All Orders
              </Link>
              <Link
                to="add"
                className="text-sm bg-green-500 text-white p-2 rounded hover:bg-green-600 text-center"
              >
                Add Cloth
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Logout Button */}
      <div className="mt-6">
        <button
          onClick={handlelogout}
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 text-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
