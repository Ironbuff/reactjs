import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import moment from 'moment'
import { UserContext } from '../../User-Context';
import { FaEdit } from "react-icons/fa";

const Postpage = () => {
  const { id } = useParams();
  const [postinfo, setPostinfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate()

  useEffect(() => {
 const fetch = async()=>{
     const response =await axios.get(`http://localhost:8081/api/users/post/${id}`)
    if(response.status===200){
      setPostinfo(response?.data)
      console.log(response)
    }
 }
 fetch()
 
  }, []);


  const handledelete = async(id)=>{
    try{
       const response = await axios.delete(`http://localhost:8000/api/users/deletepost/${id}`,{
                withCredentials: true, // Include cookies in the request
            });
       if(response.status===200){
        alert("Item Sucessfully deleted")
        navigate('/')
       }
    }
    catch(err){
      console.log(err)
    }
  }

  if (!postinfo) return '';

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      {/* Post Title and Meta */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-extrabold text-white leading-tight">
          {postinfo.title}
        </h1>
        <div className="text-gray-400 text-lg font-sans">
          by <span className="text-blue-400">{postinfo?.creator?.username}</span> • {moment(postinfo?.createdAt).format('MMMM Do YYYY, h:mm:ss a')};
        </div>

        {userInfo?.id === postinfo.creator._id && (
          <div className="pt-4">
            <Link
              to={`/edit/${postinfo._id}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-700 text-neutral-300 hover:bg-neutral-600 transition duration-200"
            >
              Edit Post <FaEdit />
            </Link>
            <button 
            onClick={()=>handledelete(postinfo._id)}
             type='button'
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-700 text-neutral-300 hover:bg-neutral-600 transition duration-200"
             >
               Delete Post 
            </button>
          </div>
        )}
      </div>

      {/* Post Image */}
      <div className="rounded-lg overflow-hidden shadow-lg aspect-video">
        <img
          src={`http://localhost:8000/${postinfo.img}`}
          alt="Post visual"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Post Content */}
      <div
        className="prose prose-invert lg:prose-lg max-w-none text-neutral-600"
        dangerouslySetInnerHTML={{ __html: postinfo.content }}
      />
    </div>
  );
};

export default Postpage;
