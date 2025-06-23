import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdOutlineCheck } from 'react-icons/md';

const Total = () => {
  const [data, setData] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState({});
  const [options, setOptions] = useState(null); // Track which row is being edited

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/user/order/get-all-order", {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'application/json'
          }
        });
        setData(response.data.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, []);

  const submitChange = async (orderId, newStatus) => {
    try {
      await axios.put(`http://localhost:8081/api/user/order/update-status/${orderId}`, {
        status: newStatus
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
          'id': localStorage.getItem("id")
        }
      });

      const refreshed = await axios.get("http://localhost:8081/api/user/order/get-all-order", {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });
      setData(refreshed.data.data);
      setOptions(null);
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        <table className="min-w-[600px] w-full border border-collapse border-gray-300 text-sm md:text-base">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Sn</th>
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Description</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Payment</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item._id} className="text-center">
                <td className="p-2 border">{index + 1}</td>
                <td className="p-2 border">
                  <img
                    src={`http://localhost:8081/${item.clothes?.img}`}
                    alt="Cloth"
                    className="w-16 h-16 md:w-20 md:h-20 object-cover mx-auto rounded"
                  />
                </td>
                <td className="p-2 border text-xs md:text-sm">{item.clothes?.description}</td>
                <td className="p-2 border">
                  <button
                    className="text-blue-500 font-semibold underline text-xs md:text-sm"
                    onClick={() => setOptions(index)}
                  >
                    {item.status}
                  </button>
                  {options === index && (
                    <div className="mt-2 flex items-center justify-center gap-2 flex-wrap">
                      <select
                        value={selectedStatus[index] || item.status}
                        onChange={(e) =>
                          setSelectedStatus({ ...selectedStatus, [index]: e.target.value })
                        }
                        className="bg-white border border-gray-400 rounded px-2 py-1 text-xs md:text-sm"
                      >
                        {["Order Placed", "Delivered", "Cancelled"].map((statusOption, i) => (
                          <option key={i} value={statusOption}>
                            {statusOption}
                          </option>
                        ))}
                      </select>
                      <button
                        className="text-green-600 text-xl"
                        onClick={() =>
                          submitChange(item._id, selectedStatus[index] || item.status)
                        }
                      >
                        <MdOutlineCheck />
                      </button>
                    </div>
                  )}
                </td>
                <td className="p-2 border text-xs md:text-sm">COD</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Total;
