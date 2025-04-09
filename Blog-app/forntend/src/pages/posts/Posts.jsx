import React from 'react'
import { formatISO9075 } from 'date-fns'; // Import date-fns or your chosen date library
import {Link} from 'react-router-dom';
const Posts = ({_id,title,summary,img,creator,createdAt}) => {
    return (
        <div className="py-5 w-full flex flex-col items-center px-28">
        <div className="w-[90%] flex flex-col space-y-6">
      
            <div  className="flex gap-4 w-full">
              {/* Image Section */}
              <div className="w-1/3">
               <Link to={`/post/${_id}`}> 
               <img
                  src={'http://localhost:8000/'+img}
                  alt="Article"
                  className="w-full h-[210px] object-cover object-top-right rounded-lg shadow-sm"
                />
                </Link>
              </div>

              {/* Text Section */}
              <div className="w-2/3 flex flex-col gap-y-2 justify-center">
                {/* title */}
                <Link to={`/post/${_id}`}>
                <h1 className="text-xl font-bold">{title}</h1> 
                </Link>
                {/* author */}
                <p className="text-gray-500 text-sm ">{creator.username}<span className='text-gray-500 text-sm px-1'>{formatISO9075(new Date(createdAt))}</span>  </p>
                {/* content */}
                <p className="text-gray-700 tracking-wide">{summary}</p>
              </div>
            </div>
        </div>
      </div>
      );
}

export default Posts