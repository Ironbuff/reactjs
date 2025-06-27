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
import { useSelector } from 'react-redux';
import { MdDeleteSweep } from 'react-icons/md';

const ClothDetail = () => {
  const [cloth, setCloth] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const islogged = useSelector((state) => state.auth.isloggedIn);
  const role = useSelector((state) => state.auth.role);


    const fetchCloth = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/user/clothes/getclothbyid/${id}`);
        setCloth(response.data);
      } catch (error) {
        console.error('Failed to fetch cloth details:', error);
      }
    };

  useEffect(() => {

    fetchCloth();
  }, [id]);

  if (!cloth) {
    return (
      <div className="flex items-center justify-center w-full h-[calc(100vh-10ch)]">
        <Loader />
      </div>
    );
  }

  const handleBuy = async (id) => {

    try {
      const response = await axios.post(
        'http://localhost:8081/api/user/cart/addcart',
        {}, // empty body
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            userid: localStorage.getItem('id'),
            clothid: id
          }
        }
      )
      if(response.status===200){
        alert(response.data.message)
        navigate('/cart' )
      }
    }
    catch (err) {
      console.log(err)
    }
  }
    
  const handleEdit = (id) => {
      navigate(`/edit-cloth/${id}`);
    };

  const handledelete = async(clothid)=>{
    const response = await axios.put(`http://localhost:8081/api/user/clothes/removecloth`,clothid,{
      headers:{
        'Authorization':`Bearer ${localStorage.getItem("token")}`,
        'id':`${localStorage.getItem("id")}`
      }
    })
    if(response.status===200){
      alert(response.data.message)
      fetchCloth()
      navigate('/shop')
    }
  }

  

    return (
      <div className="p-10 flex flex-col md:flex-row gap-10 items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
        {/* Image Section */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl bg-white p-6">
          <img
            src={`http://localhost:8081/${cloth.img}`}
            alt={cloth.title}
            className="w-72 h-72 object-cover rounded-2xl"
          />
          <span className="absolute top-4 right-4 bg-red-500 text-white text-sm px-3 py-1 rounded-full shadow-md font-semibold">
            {cloth.discount}% OFF
          </span>

          {islogged && role==="admin" &&(
            <span className='absolute top-4 left-4 flex items-center'>
            <button 
            className=' p-2 bg-red-500 rounded-xl text-neutral-300 hover:bg-red-600 hover:scale-105 transition-all ease-in-out'
            onClick={()=>handledelete(cloth._id)}
            >
              <MdDeleteSweep />
            </button>
          </span>
          )}

          
        </div>

        {/* Detail Section */}
        <div className="w-full max-w-xl bg-white rounded-3xl shadow-lg p-8 space-y-5">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <FiTag className="text-green-600" /> {cloth.title}
          </h1>
          <p className="text-sm text-gray-500 italic flex items-center gap-2">
            <FiFileText /> {cloth.category}
          </p>
          <p className="text-gray-700 flex items-center gap-2">
            <FiFileText /> <span className="font-semibold">Description:</span> {cloth.description}
          </p>
          <p className="text-gray-700 flex items-center gap-2">
            <FiBox /> <span className="font-semibold">Available Quantity:</span> {cloth.quantity}
          </p>
          <p className="text-gray-700 flex items-center gap-2">
            <FiShoppingCart />
            <span className="font-semibold">Price:</span>
            <span className="line-through text-red-400 ml-1">${cloth.price}</span>
            <span className="ml-2 text-green-600 font-bold">${cloth.discountedprice}</span>
          </p>
          <p className="text-gray-700 flex items-center gap-2">
            <FiUser /> <span className="font-semibold">Seller:</span> {cloth.seller}
          </p>

          <div className="pt-4 flex gap-4">
            {islogged && (
              <button
                onClick={() => handleBuy(cloth._id)}
                className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-xl hover:scale-105 transition-transform duration-200"
              >
                <FiShoppingCart /> Buy Now
              </button>)}
            {islogged && role === "admin" && (<button
              onClick={()=>handleEdit(cloth._id)}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-xl hover:scale-105 transition-transform duration-200"
            >
              <FiEdit /> Edit
            </button>)}
          </div>
        </div>
      </div>
    );
  };

  export default ClothDetail;
