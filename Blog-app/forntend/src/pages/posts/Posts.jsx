import React from 'react';
import { formatISO9075 } from 'date-fns';
import { Link } from 'react-router-dom';

const Posts = ({ _id, title, summary, img, creator, createdAt }) => {
  
  console.log(title)
  return (
    <div className="w-full flex justify-center py-6 px-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl">
        <div className="md:flex">
          
          {/* Image Section */}
          <Link to={`/post/${_id}`} className="md:w-2/5 w-full h-64 md:h-auto overflow-hidden relative group">
            <img
              src={`http://localhost:8000/${img}`}
              alt={title}
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
          </Link>

          {/* Text Section */}
          <div className="md:w-3/5 w-full p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <Link to={`/post/${_id}`}>
                <h2 className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors line-clamp-2">
                  {title}
                </h2>
              </Link>
              <p className="text-gray-600 text-base line-clamp-3">
                {summary}
              </p>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-6 mt-4 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gray-300 rounded-full flex items-center justify-center text-gray-700 font-semibold text-sm uppercase">
                  {creator.username.charAt(0)}
                </div>
                <span className="text-sm text-gray-700 font-medium">
                  {creator.username}
                </span>
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