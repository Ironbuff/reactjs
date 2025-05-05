import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaUser, FaEdit } from 'react-icons/fa';
import { MdOutlineCheck } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Loader from '../../components/loader/Loader'
import UserModal from './UserModal';


const Orders = () => {
  const [allorder, setAllorder] = useState([]);
  const [options, setOptions] = useState('');
  const [selectedStatus, setSelectedStatus] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);

  const header = {
    headers: {
      id: localStorage.getItem("id"),
      authorization: `Bearer ${localStorage.getItem("token")}`
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/books/order/get-all-order', header);
      setAllorder(response.data.data);
      console.log(response.data.data)
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  };

  const submitchange = async (i) => {
    const id = allorder[i]._id;
    const status = selectedStatus[i] || allorder[i].status;

    try {
      const response = await axios.put(
        `http://localhost:3000/api/books/order/update-order-status/${id}`,
        { status },
        header
      );
      alert(response.data.message);
      setOptions(-1);
      fetchOrders();
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  return (
    <div className="p-3 min-h-screen text-white">
      <h1 className='text-3xl font-semibold text-white py-3'>All Orders</h1>

      <div className='flex flex-row items-center justify-between w-full bg-neutral-800 rounded-xl px-8 py-4 text-gray-300 font-semibold text-sm'>
        <div className='w-[5%]'>Sr</div>
        <div className='w-[20%]'>Books</div>
        <div className='w-[30%]'>Description</div>
        <div className='w-[10%]'>Price</div>
        <div className='w-[25%]'>Status</div>
        <div className='w-[5%] flex justify-center'><FaUser /></div>
      </div>

      {allorder.length <= 0 &&
        <div className='flex items-center justify-center'>
          <Loader />
        </div>
      }

      {allorder.length > 0  && allorder?.map((items, i) => (
        <div
          key={i}
          className='flex flex-row items-start justify-between w-full bg-neutral-700/60 rounded-xl px-8 py-4 mt-3 text-sm'
        >
          <div className='w-[5%] pt-1'>{i + 1}</div>

          <Link to={`/view-book-detail/${items?.book?._id}`} className='w-[20%] text-blue-300 font-medium hover:underline pt-1'>
            {items?.book?.title}
          </Link>

          <div className='w-[30%] text-gray-300 pt-1'>
            {items.book.description.slice(0, 50)}...
          </div>

          <div className='w-[10%] pt-1'>₹ {items?.book?.price}</div>

          <div className='w-[25%] flex flex-col gap-1'>
            <button className={`text-left font-semibold ${items.status === 'Order Placed'
              ? 'text-yellow-400'
              : items.status === 'Delivered'
                ? 'text-green-400'
                : items.status === 'Cancelled'
                  ? 'text-red-400'
                  : 'text-blue-400'
              }`}
              onClick={() => setOptions(i)}>
              {items.status}
            </button>

            <div className='flex items-center gap-2'>
              <select
                name='status'
                value={selectedStatus[i] || items.status}
                onChange={(e) => setSelectedStatus({ ...selectedStatus, [i]: e.target.value })}
                className={options === i ? "bg-gray-800 border border-gray-600 rounded px-2 py-1 text-sm text-white" : "hidden"}
              >
                {["Order Placed", "Delivered", "Cancelled", "Out For Delivery"].map((status, idx) => (
                  <option key={idx} value={status}>{status}</option>
                ))}
              </select>
              {options === i && (
                <button className='text-green-400 cursor-pointer' onClick={() => submitchange(i)}>
                  <MdOutlineCheck />
                </button>
              )}
            </div>
          </div>

          <div className='w-[5%] flex justify-center pt-2'>
            <FaEdit
              className='cursor-pointer text-blue-300 hover:text-blue-500'
              onClick={() => setSelectedUser(items.user)}
            />
          </div>
        </div>
      ))}

      {/* Modal Component */}
      <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />
    </div>
  );
};

export default Orders;
