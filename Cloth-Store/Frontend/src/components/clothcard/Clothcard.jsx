import React from 'react';
import { Link } from 'react-router-dom';

const Clothcard = ({ item }) => {
  return (
    <div className='md:px-28 px-4 bg-gray-100 w-full py-8'>
      <h1 className='text-2xl font-bold mb-6 text-gray-800'>Our Latest Product</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

        {item.map((product, i) => (
          <Link to={`/detail/${product._id}`} key={i}>
            <div
              className="bg-white shadow-sm rounded-2xl overflow-hidden border hover:shadow-md hover:scale-[1.02] transition-all duration-300"
            >
              <img
                src={`http://localhost:8081/${product.img}`}
                alt={product.title}
                className="w-full h-[25ch] object-cover rounded-t-2xl"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">{product.title}</h2>
                <p className="text-sm text-gray-500">{product.category}</p>

                <div className="flex justify-between items-center text-gray-700 mt-4">
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Quantity</p>
                    <span className="text-base font-semibold">{product.quantity}</span>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Price</p>
                    <span className="text-base font-semibold text-green-600">${product.price}</span>
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
