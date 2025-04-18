import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteSweep } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { UserContext } from '../../User-Context';

const Quotepage = ({ title, quote, creator, _id }) => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(`http://localhost:2000/api/quotes/delete/${_id}`, { withCredentials: true });
      if (response.status === 200) {
        toast.success('Quote successfully deleted');
        navigate('/?refresh=' + new Date().getTime());
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting quote");
    }
  };

  // For showing update and delete only after login
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:2000/api/users/profile', { withCredentials: true });
        setUserInfo(response.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        // Don't toast errors here - it would cause too many toasts
      }
    };
    fetchProfile();
  }, [setUserInfo]);

  // Check if user is logged in and is the creator of this quote
  const isUserLoggedIn = userInfo?.username;
  const isCreator = userInfo?.id === creator?._id;

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-4 items-center justify-center px-6 py-8 border border-amber-100 shadow-lg rounded-2xl bg-white my-3">
      <ToastContainer />
      <div className="flex items-center justify-center w-full">
        <h1 className="font-bold text-3xl text-gray-800 text-center">{title}</h1>
      </div>

      <div className="flex flex-col gap-3 w-full text-center">
        <span className="border border-neutral-300 shadow-inner px-4 py-2 text-lg text-gray-700 bg-gray-50 rounded-lg">{quote}</span>
        <p className="font-medium text-lg text-gray-600 italic">— {creator?.username || "Unknown Author"}</p>
      </div>

      <div className="w-full flex flex-row justify-between mt-4">
        {isUserLoggedIn && isCreator ? (
          <>
            <Link
              to={`/edit/${_id || ''}`}
              className="flex items-center gap-2 text-lg bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-xl text-white transition duration-300"
            >
              <AiOutlineEdit /> Update
            </Link>

            <button
              className="flex items-center gap-2 text-lg bg-red-600 hover:bg-red-700 px-5 py-2 rounded-xl text-white transition duration-300"
              onClick={handleDelete}
            >
              <MdDeleteSweep /> Delete
            </button>
          </>
        ) : isUserLoggedIn ? (
          <h1 className='text-xl font-semibold'>Only the creator can change the quote</h1>
        ) : (
          <h1 className='text-xl font-semibold'>Please login to edit — only the creator can change the quote</h1>
        )}
      </div>
    </div>
  );
};

export default Quotepage;