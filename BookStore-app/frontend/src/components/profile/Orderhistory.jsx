import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from '../loader/Loader'
import { Link } from 'react-router-dom'
import { IoTrashBin } from "react-icons/io5";

const Orderhistory = () => {
  const [order, setOrder] = useState([])

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  }

  useEffect(() => {
    const fetch = async () => {
      try {
          const response = await axios.get("http://localhost:3000/api/books/order/get-all-order", { headers })
          console.log(response.data.data)
          setOrder(response.data.data)
       
      } catch (err) {
        console.log(err)
      }
    }
    fetch()
  }, [])

  const removeOrder = async(orderId)=>{
    try{
      if (window.confirm("Are you sure you want to remove this order?")) {
      const response = await axios.delete(`http://localhost:3000/api/books/order/remove-order/${orderId}`,{headers})
      alert(response.data.message)
      setOrder(prev=>prev.filter(item=>item._id!==orderId))
      }
    }
    catch(err){
           console.log(err)
    }
  }

  return (
    <div className='flex flex-col w-full p-6 text-white'>
      {order.length <= 0 ? (
        <div className='flex items-center justify-center'>
          <Loader />
        </div>
      ) : (
        <>
          <h1 className='text-3xl text-neutral-300 font-bold mb-6'>
            Your Order History
          </h1>

          {/* Table Headers */}
          <div className="grid grid-cols-6 font-semibold text-gray-300 border-b border-gray-600 pb-2 mb-2">
            <div className='w-[5%]'>Sr.</div>
            <div className='w-[20%]'>Books</div>
            <div className='w-[25%]'>Description</div>
            <div>Price</div>
            <div>Status</div>
            <div>Remove Order</div>
          </div>

          {/* Orders */}
          {order.map((item, i) => (
            <div key={i} className="grid grid-cols-6 py-2 border-b border-gray-700 text-sm hover:bg-gray-600/20 ease-in-out transition-all duration-300">
              <div className='w-[10%]'>{i + 1}</div>
              <Link to={`/view-book-detail/${item.book._id}`} className="font-medium cursor-grab">{item.book.title}</Link>
              <div>{item.book.description.slice(0,50)}...</div>
              <div>$ {item.book.price}</div>
              <div className={
                item.status === "Order Placed"
                  ? "text-green-400 font-semibold"
                  : item.status === "Cancelled"
                  ? "text-red-400 font-semibold"
                  : "text-yellow-400 font-semibold"
              }>
                {item.status}
              </div>
              <div onClick={()=>removeOrder(item._id)} className='cursor-grab text-red-300 text-lg hover:text-red-400 hover:translate-1 ease-in-out transition-all duration-300'>
              <IoTrashBin />
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  )
}

export default Orderhistory
