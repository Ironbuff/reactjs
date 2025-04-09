import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { formatISO9075 } from 'date-fns'; // Import date-fns or your chosen date library
import { UserContext } from '../../User-Context';
import { FaEdit } from "react-icons/fa";

const Postpage = () => {
  const { id } = useParams(); //to get id we use params
  const [postinfo, setPostinfo] = useState(null);
  const{userInfo}=useContext(UserContext)

  useEffect(() => {
    axios.get(`http://localhost:8000/api/users/post/${id}`)
      .then(response => setPostinfo(response.data)); //to store the response
  }, []);

  if (!postinfo) return '';

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">{postinfo.title}</h1>
         <p className="text-gray-500 text-sm ">{postinfo.username}<span className='text-gray-500 text-sm px-1'>{formatISO9075(new Date(postinfo.createdAt))}</span>  </p>
        
        {userInfo.id === postinfo.creator._id &&(
          
          <div className='flex items-center justify-center py-3'>
            <Link to={`/edit/${postinfo._id}`} 
            className='flex flex-row items-center gap-x-2.5 bg-neutral-700 px-4 py-2 rounded-3xl text-neutral-400 hover:bg-neutral-500'>
               Edit the Post <FaEdit /> 
              </Link>
         </div>


        )}  
          
     
          
      </div>

      
      
      <div className="rounded-lg overflow-hidden shadow-md">
        <img
          src={`http://localhost:8000/${postinfo.img}`}
          alt="Post visual"
          className="w-full h-auto object-cover"
        />
      </div>

     
      {/* to print string */}
      <div
        className="prose lg:prose-lg max-w-none text-gray-700"
        dangerouslySetInnerHTML={{ __html: postinfo.content }}
      />
    </div>
  );
};

export default Postpage;
