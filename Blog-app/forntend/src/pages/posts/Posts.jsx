import React from 'react';
import { formatISO9075 } from 'date-fns';
import { Link } from 'react-router-dom';

const Posts = ({ _id, title, summary, img, creator, createdAt }) => {
  return (
    <div className="py-8 px-6 md:px-20 w-full flex flex-col items-center">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
        <div className="md:flex">
          {/* Image Section */}
          <div className="md:w-1/3 w-full h-64 md:h-auto">
            <Link to={`/post/${_id}`}>
              <img
                src={`http://localhost:8000/${img}`}
                alt={title}
                className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
              />
            </Link>
          </div>

          {/* Text Section */}
          <div className="md:w-2/3 w-full p-6 flex flex-col justify-center space-y-4">
            <Link to={`/post/${_id}`}>
              <h1 className="text-2xl font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200">
                {title}
              </h1>
            </Link>
            <p className="text-sm text-gray-500">
              {creator.username} • {formatISO9075(new Date(createdAt))}
            </p>
            <p className="text-gray-600 text-base leading-relaxed">{summary}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
