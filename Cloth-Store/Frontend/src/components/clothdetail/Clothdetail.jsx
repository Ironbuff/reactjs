import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../loader/Loader';
import {
  FiShoppingCart,
  FiEdit,
  FiUser,
  FiBox,
  FiTag,
  FiFileText
} from 'react-icons/fi';

const Clothdetail = () => {
  const [data, setData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/user/clothes/getclothbyid/${id}`);
        setData(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetch();
  }, [id]);

  if (!data) {
    return (
      <div className='flex items-center justify-center w-full h-[calc(100vh-10ch)]'>
        <Loader />
      </div>
    );
  }

  const handleBuy = () => {
    alert(`Thank you for choosing to buy: ${data.title}`);
  };

  const handleEdit = () => {
    navigate(`/edit-cloth/${data._id}`);
  };

  return (
    <div className="p-8 flex flex-col md:flex-row items-center justify-between w-full h-[calc(100vh-10ch)] bg-gray-200">
      {/* Image Section */}
      <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
        <div className='border rounded-xl overflow-hidden bg-white shadow-md'>
          <img
            src={`http://localhost:8081/${data.img}`}
            alt={data.title}
            className="w-80 h-80 object-cover"
          />
        </div>
      </div>

      {/* Detail Section */}
      <div className="w-full md:w-1/2 flex flex-col items-start justify-center gap-4 px-4">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <FiTag /> {data.title}
        </h1>
        <span className="text-sm text-gray-500 italic flex items-center gap-1">
          <FiFileText /> {data.category}
        </span>
        <p className="text-gray-700 flex items-center gap-2">
          <FiFileText /> <strong>Description:</strong> {data.description}
        </p>
        <p className="text-gray-700 flex items-center gap-2">
          <FiBox /> <strong>Quantity:</strong> {data.quantity}
        </p>
        <p className="text-gray-700 flex items-center gap-2">
          <FiShoppingCart /> <strong>Price:</strong> ${data.price}
        </p>
        <p className="text-gray-700 flex items-center gap-2">
          <FiUser /> <strong>Seller:</strong> {data.seller}
        </p>

        <div className="mt-4 flex gap-4">
          <button
            onClick={handleBuy}
            className="flex items-center gap-2 px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            <FiShoppingCart /> Buy Now
          </button>
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <FiEdit /> Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Clothdetail;
