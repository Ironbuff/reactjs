import React, { useEffect, useState } from 'react'
import Loader from '../loader/Loader'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { CiGlobe } from "react-icons/ci";
import { AiOutlineHeart } from "react-icons/ai"; // Heart icon for favorites
import { BsCart } from "react-icons/bs"; // Cart icon for shopping
import { useSelector } from 'react-redux';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const Bookdetail = () => {
  const { id } = useParams(); // Get book ID from URL
  const [info, setInfo] = useState(null); // Book detail state
  const islogged = useSelector((state)=>state.auth.isLoggedIn)
  const role = useSelector((state)=>(state.auth.role))
  const navigate = useNavigate()
  
  // Fetch book info from API when component mounts
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/books/getbookbyid/${id}`);
        setInfo(response.data.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };
    fetch();
  }, []);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem('token')}`, // Fixed template literal syntax
    bookid:id
  }
  
  const handlefavourite = async()=>{
    
    const response = await axios.put('http://localhost:3000/api/books/favourite/add-favourite-books',{},{headers})
    alert(response.data.message)
  }

  const handleCart = async()=>{
       
     const response = await axios.put('http://localhost:3000/api/books/cart/add-to-cart',{},{headers})
     alert(response.data.message)
  }
  
  const handleDelete = async()=>{
    const response = await axios.delete('http://localhost:3000/api/books/deletebook',{headers})
    alert(response.data.message)
    navigate("/book")
  }


  // Show loader while data is being fetched
  if (!info) return <div className='flex items-center justify-center'><Loader /></div>;

  return (
    <div className="h-[calc(100vh-13ch)] bg-neutral-900 flex justify-center items-center p-10">
     
      <div className="bg-zinc-800 rounded-xl shadow-lg flex flex-row overflow-hidden w-full max-w-6xl">
        
      {/* Left side - Book image with button icons */}
      <div className="bg-neutral-800 p-4 flex flex-col justify-center items-center w-1/2 relative">
        <img src={info.url} alt={info.title} className="max-h-[500px] object-contain" />
        
        {/* Action buttons container - styled but no functionality */}
        <div className="absolute right-4 top-4 flex flex-col gap-4">
          {islogged===true && role==="user" &&
          <>
          {/* Favorite button - visual only */}
          <button 
            className="bg-white rounded-full p-3 hover:bg-red-100 transition-all duration-300"
           onClick={handlefavourite}>
            <AiOutlineHeart className="text-2xl text-red-500" />
          </button>
          
          {/* Cart button - visual only */}
          <button 
            className="bg-white rounded-full p-3 hover:bg-blue-100 transition-all duration-300"
           onClick={handleCart}
           >
            <BsCart className="text-2xl text-blue-500" />
          </button>
          </> 
         }
         {islogged===true && role==="admin" &&
         <>
            <Link to={`/update/${id}`}
              className="bg-blue-300/40 text-blue-500 rounded-full p-3 hover:bg-blue-300 transition-all duration-300 text-2xl"
              
            >
              <FaEdit />
            </Link>
            
            {/* Cart button - visual only */}
            <button 
              className="bg-red-500/40 text-neutral-300 rounded-full p-3 hover:bg-red-500 transition-all duration-300 text-2xl"
              onClick={handleDelete}
            >
              <MdDelete />
            </button>
         </>
         }
        </div>
      </div>
      
      {/* Right side - Book information */}
      <div className="p-8 text-neutral-100 flex flex-col justify-center w-1/2 gap-4">
        {/* Book title and author */}
        <div>
          <h1 className="text-4xl font-bold py-1">{info.title}</h1>
          <p className="text-sm text-neutral-300">by <span className="text-white">{info.author}</span></p>
        </div>
        
        {/* Book description */}
        <p className="text-neutral-300 text-sm">
          {info.description}
        </p>
        
        {/* Book language */}
        <div className="flex items-center gap-2 py-2 text-neutral-400">
          <CiGlobe className="text-xl" />
          <span>{info.language}</span>
        </div>
        
        {/* Book price */}
        <div className="text-xl font-semibold text-white py-4">
          Price: $ {info.price}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Bookdetail;

