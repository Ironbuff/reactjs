import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {  useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
const Update = () => {
  
  //state for value
  const[title,setTitle]= useState('');
  const[quote,setQuote]= useState('');
  const[file,setFile]= useState(null);
  const{id}=useParams()
  const navigate = useNavigate()
  

  //for getting quote value based on userid
  useEffect(() => {
    const getQuotes = async () => {
      try {
        const res = await axios.get(`http://localhost:2000/api/quotes/getquote/${id}`, { withCredentials: true });
        setQuote(res.data.quote||'');
        setTitle(res.data.title||'')
      } catch (err) {
        console.error("Error fetching quotes:", err);
        // Possibly redirect or show message
      }
    };
  
    getQuotes();
  }, []);

  //for handling submit
  async function Updatequote(e){
   try{
     
      //to prevent from reloading
    e.preventDefault()
    const formdata = new FormData()
    //for setting value for title quote and image
    formdata.set('title',title)
    formdata.set('quote',quote)
    formdata.set('_id',id)
     // Only append the file if one has been selected
     if (file) {
      formdata.append('file', file);
    }

    const response = await axios.post('http://localhost:2000/api/quotes/updatequote',formdata,{withCredentials:true})
    if(response.status===200){
               toast.success("Sucessfully Updated Quote")
               navigate('/')
             }
             else{
               toast.error("Unable to updeate quote")
             }
           }
           
  catch(err){
             console.log("error in the server",err)
           }
  }

  
  
  return (
    <div className="bg-gray-100 min-h-screen py-6 px-4 sm:px-6 lg:px-8">
         <ToastContainer />
         <div className="max-w-md mx-auto bg-white rounded-md shadow-md p-6">
           <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
             Update Quote
           </h2>
           <form onSubmit={Updatequote}>
             {/* Title Field */}
             <div className="mb-4">
               <label
                 htmlFor="title"
                 className="block text-gray-700 text-sm font-bold mb-2"
               >
                 Title:
               </label>
               <input
                 type="text"
                 id="title"
                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                 placeholder="Enter quote title"
                 value={title}
                 onChange={(e) => setTitle(e.target.value)}
               />
             </div>

              {/* image field */}
          <div className="mb-4">
            <label
              htmlFor="file"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Image:
            </label>
            <input
              type="file"
              id="file"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter quote Image"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
   
             {/* Description Field */}
             <div className="mb-6">
               <label
                 htmlFor="description"
                 className="block text-gray-700 text-sm font-bold mb-2"
               >
                 Description:
               </label>
               <textarea
                 id="quote"
                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32 resize-none"
                 placeholder="Enter the quote description"
                 value={quote}
                 onChange={(e) => setQuote(e.target.value)}
               ></textarea>
             </div>
   
             {/* Submit Button */}
             <div className="flex items-center justify-end">
               <button
                 type="submit"
                 className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
               >
                Update Quote
               </button>
               <button
                 type="button"
                 onClick={() => navigate(-1)} // Go back to the previous page
                 className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
               >
                 Cancel
               </button>
             </div>
           </form>
         </div>
       </div>
  )
}

export default Update