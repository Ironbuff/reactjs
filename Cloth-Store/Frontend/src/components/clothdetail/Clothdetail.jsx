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

const ClothDetail = () => {
  const [cloth, setCloth] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCloth = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/user/clothes/getclothbyid/${id}`);
        setCloth(response.data);
      } catch (error) {
        console.error('Failed to fetch cloth details:', error);
      }
    };

    fetchCloth();
  }, [id]);

  if (!cloth) {
    return (
      <div className="flex items-center justify-center w-full h-[calc(100vh-10ch)]">
        <Loader />
      </div>
    );
  }

  const handleBuy = () => {
    alert(`Thank you for your interest in purchasing: ${cloth.title}`);
  };

  const handleEdit = () => {
    navigate(`/edit-cloth/${cloth._id}`);
  };

  return (
    <div className="p-8 flex flex-col md:flex-row items-center justify-between w-full h-[calc(100vh-10ch)] bg-gray-100">
      {/* Image Section */}
      <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
        <div className="border rounded-2xl bg-white shadow-lg overflow-hidden">
          <img
            src={`http://localhost:8081/${cloth.img}`}
            alt={cloth.title}
            className="w-80 h-80 object-cover"
          />
        </div>
      </div>

      {/* Detail Section */}
      <div className="w-full md:w-1/2 space-y-4 px-4">
        <h1 className="text-4xl font-semibold text-gray-800 flex items-center gap-3">
          <FiTag className="text-green-600" /> {cloth.title}
        </h1>
        <p className="text-sm text-gray-500 italic flex items-center gap-2">
          <FiFileText /> {cloth.category}
        </p>
        <p className="text-gray-700 flex items-center gap-2">
          <FiFileText /> <strong>Description:</strong> {cloth.description}
        </p>
        <p className="text-gray-700 flex items-center gap-2">
          <FiBox /> <strong>Available Quantity:</strong> {cloth.quantity}
        </p>
        <p className="text-gray-700 flex items-center gap-2">
          <FiShoppingCart /> <strong>Price:</strong> ${cloth.price}
        </p>
        <p className="text-gray-700 flex items-center gap-2">
          <FiUser /> <strong>Seller:</strong> {cloth.seller}
        </p>

        <div className="mt-6 flex gap-4">
          <button
            onClick={handleBuy}
            className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-200"
          >
            <FiShoppingCart /> Buy Now
          </button>
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200"
          >
            <FiEdit /> Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClothDetail;
