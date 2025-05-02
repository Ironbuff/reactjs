import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Settings = () => {
  const [value, setValue] = useState(null);
  const [book, setBook] = useState([]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem('token')}`
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users/getuser', { headers });
        setValue(response.data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/books/order/get-all-order", { headers });
        setBook(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getBooks();
  }, []);

  return (
    <div className="flex justify-center items-center h-[calc(100vh-20ch)] p-6">
      <div className="backdrop-filter backdrop-blur-md bg-white/10 border border-white/20 shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-semibold text-white text-center mb-6">User Settings</h1>

        {value ? (
          <div className="space-y-6 text-white">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <span className="font-semibold text-gray-300 block mb-1">Username:</span>
                <span className="text-lg">{value.username}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-300 block mb-1">Email:</span>
                <span className="text-lg">{value.email}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-300 block mb-1">Address:</span>
                <span className="text-lg">{value.address}</span>
              </div>
            </div>
            <div>
              <span className="font-semibold text-gray-300 block mb-2">Ordered Books:</span>
              {book && book.length > 0 ? (
                <ul className="list-disc pl-5">
                  {book.map((item, i) => (
                    <li key={i} className="text-lg">{item.book.title}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-400">No books ordered yet.</p>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-400">
            Fetching user data...
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;