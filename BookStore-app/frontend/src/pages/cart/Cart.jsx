import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdDeleteSweep } from "react-icons/md";
import cart from "../../assests/EmptyCart.png";
import { useNavigate } from 'react-router-dom';


const Cart = () => {
  const [carts, setCarts] = useState([]);
  const [totals, setTotals] = useState(0);
  const navigate = useNavigate()

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  const fetchCart = async () => {
    try {
      
      const response = await axios.get('http://localhost:3000/api/books/cart/get-cart-books', { headers });
      setCarts(response.data.data || []);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    } 
  };

  const handleDelete = async (bookid) => {
    try {
      console.log("Deleting book with ID:", bookid);
      const response = await axios.put(
        `http://localhost:3000/api/books/cart/remove-from-cart/${bookid}`, 
        {}, 
        { headers }
      );
      alert(response.data.message);
      fetchCart(); // Refresh cart after deletion
    } catch (error) {
      console.error('Failed to delete item:', error.response ? error.response.data : error);
      alert(error.response?.data?.message || 'Failed to remove item');
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    if (carts.length > 0) {
      const total = carts.reduce((acc, item) => acc + item.price, 0);
      setTotals(total);
    } else {
      setTotals(0);
    }
  }, [carts]);
  
  const handleOrder = async()=>{
   try{
    const response = await axios.post("http://localhost:3000/api/books/order/place-order",{order:carts},{headers})
    alert(response.data.message)
    await fetchCart()
    navigate('/profile/order')
   }
   catch(err){
          console.log(err)
   }
  }



  return (
    <div className="min-h-screen bg-zinc-900 px-28 py-10 flex flex-col gap-y-8 relative">
      <h1 className="text-4xl font-semibold text-neutral-500 mb-6">Your Cart</h1>
      
      <div className="flex flex-col gap-y-5">
        {carts && carts.length > 0 ? carts.map((datas, i) => (
          <div key={i} className="flex items-center justify-between bg-zinc-800 p-5 rounded-xl shadow-md">
            <div className="flex items-center gap-x-6">
              <img src={datas.url} alt="book" className="h-24 w-20 object-cover rounded-md" />
              <div className="flex flex-col text-neutral-300">
                <h1 className="font-semibold text-xl">{datas.title}</h1>
                <p className="font-light text-sm truncate w-[300px]">{datas.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-x-4">
              <h1 className="text-neutral-300 text-2xl font-semibold">₹ {datas.price}</h1>
              <button
                className="bg-red-300 hover:bg-red-400 p-2 rounded-lg text-red-700 text-2xl"
                onClick={() => handleDelete(datas._id)}
              >
                <MdDeleteSweep />
              </button>
            </div>
          </div>
        )) : null}
      </div>
      
      {carts && carts.length > 0 ? (
        <div className="absolute right-28 bottom-10 bg-zinc-800 p-6 rounded-xl shadow-lg flex flex-col items-center gap-y-2">
          <h1 className="text-2xl font-semibold text-neutral-300">Total Amount</h1>
          <div className='flex flex-row items-center justify-between gap-x-6'>
            <h2 className="text-neutral-400">{carts.length} {carts.length === 1 ? "book" : "books"}</h2>
            <h1 className="text-2xl font-bold text-white">$ {totals}</h1>
          </div>
          <button className="mt-3 bg-white hover:bg-neutral-200 text-black px-4 py-2 rounded-md font-semibold" onClick={handleOrder}>
            Place your order
          </button>
        </div>
      ) : (
        <div className='flex flex-col gap-y-2 items-center justify-center'>
          <h1 className='text-4xl text-neutral-300 font-semibold'>
            Empty Cart
          </h1>
          <img src={cart} alt="Empty Cart" className='h-[20vh]' />
        </div>
      )}
    </div>
  );
};

export default Cart;