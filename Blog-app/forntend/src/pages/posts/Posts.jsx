import React from 'react';
import { formatISO9075 } from 'date-fns';
import { Link } from 'react-router-dom';

const Posts = ({ _id, title, summary, img, creator, createdAt }) => {
  return (
    <div className="py-6 px-4 md:px-8 lg:px-12 w-full flex flex-col items-center">
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
        <div className="md:flex">
          {/* Image Section */}
          <div className="md:w-2/5 w-full h-72 md:h-auto relative overflow-hidden">
            <Link to={`/post/${_id}`} className="block h-full">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
              <img
                src={`http://localhost:8000/${img}`}
                alt={title}
                className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
              />
            </Link>
          </div>
          
          {/* Text Section */}
          <div className="md:w-3/5 w-full p-6 md:p-8 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <Link to={`/post/${_id}`}>
                <h1 className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                  {title}
                </h1>
              </Link>
              
              <p className="text-gray-600 text-base leading-relaxed line-clamp-3">
                {summary}
              </p>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                  {creator.username.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-gray-700">{creator.username}</span>
              </div>
              <time className="text-sm text-gray-500" dateTime={createdAt}>
                {formatISO9075(new Date(createdAt))}
              </time>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;