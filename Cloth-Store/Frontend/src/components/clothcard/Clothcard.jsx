import React from 'react';
import { Link } from 'react-router-dom';

const Clothcard = ({ item }) => {
  return (
    <div className='md:px-28 px-4 bg-gray-200'>
      <h1 className='text-2xl font-bold w-full '>Our Latest Product</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 ">

       
        {item.map((product, i) => (
          <Link to={`/detail/${product._id}`}>
          <div
            key={i}
            className="bg-gray-300 shadow-md rounded-2xl overflow-hidden border hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={`http://localhost:8081/${product.img}`}
              alt={product.title}
              className="w-full h-[25ch] object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">{product.title}</h2>
              <p className="text-sm text-gray-500 mb-2">{product.category}</p>

              <div className="flex justify-between items-center text-gray-700 mt-4">
                <div>
                  <p className="text-sm font-medium">Quantity</p>
                  <span className="text-lg font-bold">{product.quantity}</span>
                </div>
                <div>
                  <p className="text-sm font-medium">Price</p>
                  <span className="text-lg font-bold text-green-600">${product.price}</span>
                </div>
              </div>
            </div>
          </div>
          </Link>
        ))}

      </div>
    </div>
  );
};

export default Clothcard;
