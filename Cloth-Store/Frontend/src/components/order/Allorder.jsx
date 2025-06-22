import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Allorder = () => {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/user/order/get-order-history", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            id: localStorage.getItem('id'),
          }
        });
        setOrder(response.data.data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };
    fetch();
  }, []);

  const getDiscountedPrice = (item) => {
    return item.clothes?.price - (item.clothes?.price * item.clothes?.discount / 100);
  };

  const handleRemove = async (ordersId) => {
    try {
      await axios.put(`http://localhost:8081/api/user/order/remove-order/${ordersId}`, {},{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          id: localStorage.getItem('id'),
        },
      });
      setOrder(prev => prev.filter(item => item._id !== ordersId));
    } catch (err) {
      console.error("Error removing order:", err);
    }
  };

  return (
    <div className="w-full px-2 sm:px-6 py-4">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">My Orders</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md text-sm sm:text-base">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">SN</th>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-center">Price</th>
              <th className="px-4 py-2 text-center">Status</th>
              <th className="px-4 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {order.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">
                  <img
                    src={`http://localhost:8081/${item.clothes?.img}`}
                    alt="cloth"
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded object-cover mx-auto"
                  />
                </td>
                <td className="px-4 py-2">{item.clothes?.description}</td>
                <td className="px-4 py-2 text-center text-green-700 font-medium">
                  ₹{getDiscountedPrice(item)?.toFixed(2)}
                </td>
                <td className="px-4 py-2 text-center">{item.status}</td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => handleRemove(item._id)}
                    className="bg-red-500 hover:bg-red-600 text-white text-xs sm:text-sm px-3 py-1 rounded"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
            {order.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Allorder;
