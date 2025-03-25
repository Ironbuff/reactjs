import React, { useState } from "react";
import "./Create.css"; // Import the CSS file
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [task,setTask]= useState('')
  const[name,setName]=useState('')
  const navigate = useNavigate(); //To Navigate to Home
    
  //Handle submit function
   function handleSubmit(event){
    event.preventDefault();
    // Pass data to backend
    axios.post('http://localhost:8081/create',{name,task})
    //print result
    
    .then(res=>{
        console.log(res);
        navigate('/');
    })
    .catch(err=>console.log(err)); //to print the error
   }
  

  return (
    <div className="container">
      <div className="form-box">
        {/* Form Title */}
        <h2>Add Task</h2>

        <form onSubmit={handleSubmit}>
          {/* Name Input Field */}
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Enter Name"
            onChange={e=>setName(e.target.value)}
            />
          </div>

          {/* Task Input Field */}
          <div className="input-group">
            <label htmlFor="task">Task</label>
            <input type="text" id="task" placeholder="Enter Task"
            onChange={e=>setTask(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Create;
