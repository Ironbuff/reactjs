import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

const Update = () => {
  const location = useLocation();
  console.log(location,'location')
  const task = location.state?.task || { title: "", body: "" }; // Default values if no data
  
  
  useEffect(()=>{
    //this shows the task value in the list
    setInputs({
      title: task.title,
      body: task.body, 
    })
  },[task])
  // Retrieve data from todo.jsx
 
  // State for input fields (title and body)
  const [inputs, setInputs] = useState({ title: "", body: "" });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target; // Fixing the incorrect variable name
    setInputs({ ...inputs, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async() => {
    console.log(inputs); // Logs the updated input values
    await axios.put(`http://localhost:1000/api/v2/updateTask/${task._id}`,inputs)
    .then((response)=>{
      toast.success(response.data.message);
    
  })}

  return (
    
    <div className="flex justify-center items-center h-[calc(100vh-23ch)] bg-gradient-to-r from-orange-600 to-red-500 p-6">
      <ToastContainer/>
      <div className="bg-white shadow-lg rounded-xl p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Update Your Task
        </h2>

        {/* Title Input */}
        <input
          type="text"
          placeholder="Task Title"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition mb-3"
          value={inputs.title}
          onChange={handleChange} // Fix function name
          name="title"
        />

        {/* Task Description */}
        <textarea
          placeholder="Task Details..."
          rows="4"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition mb-4"
          value={inputs.body}
          onChange={handleChange} // Fix function name
          name="body"
        />

        {/* Update Button */}
        <button
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg transition-all"
          onClick={handleSubmit} // Fix function name
        >
          <Link to="/todo">Update Task</Link>
        </button>
      </div>
    </div>
  );
};

export default Update;
