import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const Addquote = () => {
  
    const [title, setTitle] = useState('');
    const [quote, setQuote] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault()
        
         const data = {
          title,
          quote
         }
        try{
           const response=await axios.post('http://localhost:2000/api/quotes/addquote',data,
            {withCredentials: true}, //for cookies
          )
          console.log("Sucess:",data) //to show form data
          if(response.status===200){
            toast.success("Sucessfully added Quote")
            navigate('/')
          }
          else{
            toast.error("Unable to add quote")
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
          Add New Quote
        </h2>
        <form onSubmit={handleSubmit}>
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
              Add Quote
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

export default Addquote