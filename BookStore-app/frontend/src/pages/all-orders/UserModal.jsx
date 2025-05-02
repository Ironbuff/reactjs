import React from 'react';
import { IoMdCloseCircle } from "react-icons/io";

const UserModal = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white text-gray-800 p-6 rounded-2xl shadow-2xl w-full max-w-md relative animate-fadeIn">
        <button
          className="absolute top-3 right-3 text-2xl text-red-500 hover:text-red-600 transition"
          onClick={onClose}
          aria-label="Close modal"
        >
          <IoMdCloseCircle />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center text-indigo-600">User Information</h2>
        <div className="space-y-3 text-sm sm:text-base">
          <p><span className="font-semibold text-gray-600">Username:</span> {user.username}</p>
          <p><span className="font-semibold text-gray-600">Email:</span> {user.email}</p>
          <p><span className="font-semibold text-gray-600">Address:</span> {user.address}</p>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
