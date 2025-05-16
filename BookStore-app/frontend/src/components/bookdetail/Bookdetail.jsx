import React, { useEffect, useState } from 'react';
import Loader from '../loader/Loader';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CiGlobe } from "react-icons/ci";
import { AiOutlineHeart } from "react-icons/ai";
import { BsCart } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useSelector } from 'react-redux';

const Bookdetail = () => {
  const { id } = useParams();
  const [info, setInfo] = useState(null);
  const islogged = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/books/getbookbyid/${id}`);
        setInfo(response.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };
    fetch();
  }, [id]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem('token')}`,
    bookid: id
  };

  const handlefavourite = async () => {
    const response = await axios.put('http://localhost:3000/api/books/favourite/add-favourite-books', {}, { headers });
    alert(response.data.message);
  };

  const handleCart = async () => {
    const response = await axios.put('http://localhost:3000/api/books/cart/add-to-cart', {}, { headers });
    alert(response.data.message);
  };

  const handleDelete = async () => {
    const response = await axios.delete('http://localhost:3000/api/books/deletebook', { headers });
    alert(response.data.message);
    navigate("/book");
  };

  if (!info) {
    return <div className='flex items-center justify-center h-screen bg-neutral-900'><Loader /></div>;
  }

  return (
    <div className="min-h-screen bg-neutral-900 flex justify-center items-center py-10 px-4">
      <div className="bg-zinc-800 rounded-xl shadow-md flex flex-col md:flex-row overflow-hidden w-full max-w-5xl border border-neutral-700">

        {/* Left - Image + Buttons */}
        <div className="bg-neutral-800 p-5 md:w-1/2 flex flex-col justify-center items-center relative">
          <img src={info.url} alt={info.title} className="max-h-[450px] object-contain rounded-md shadow" />

          <div className="absolute top-6 right-6 flex flex-col gap-3">
            {islogged && role === "user" && (
              <>
                <button 
                  className="bg-white p-2 rounded-full hover:bg-red-200 transition"
                  onClick={handlefavourite}
                >
                  <AiOutlineHeart className="text-xl text-red-500" />
                </button>
                <button 
                  className="bg-white p-2 rounded-full hover:bg-blue-200 transition"
                  onClick={handleCart}
                >
                  <BsCart className="text-xl text-blue-500" />
                </button>
              </>
            )}

            {islogged && role === "admin" && (
              <>
                <Link
                  to={`/update/${id}`}
                  className="bg-blue-200 p-2 rounded-full hover:bg-blue-300 text-blue-600 text-xl transition"
                >
                  <FaEdit />
                </Link>
                <button
                  onClick={handleDelete}
                  className="bg-red-200 p-2 rounded-full hover:bg-red-300 text-red-600 text-xl transition"
                >
                  <MdDelete />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Right - Book Info */}
        <div className="p-6 md:w-1/2 text-neutral-200 flex flex-col gap-5">
          <div>
            <h1 className="text-3xl font-bold mb-1">{info.title}</h1>
            <p className="text-sm text-neutral-400">by <span className="text-neutral-200">{info.author}</span></p>
          </div>

          <p className="text-sm text-neutral-300 leading-relaxed">
            {info.description}
          </p>

          <div className="flex items-center gap-2 text-neutral-400 text-sm">
            <CiGlobe className="text-lg" />
            <span>{info.language}</span>
          </div>

          <div className="mt-2 text-xl font-semibold flex items-center gap-3">
            <span className={info.discount > 0 ? "line-through text-neutral-400" : ""}>${info.price}</span>
            {info.discount > 0 && (
              <span className="text-green-400">${info.discountedPrice}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookdetail;
