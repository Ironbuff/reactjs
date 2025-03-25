import React, { useState } from "react";
import "../create/Create.css"; // Import the CSS file
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const [task,setTask]= useState('')
  const[name,setName]=useState('')
  const navigate = useNavigate(); //To Navigate to Home
  const {id}=useParams();// To get id from url we use param hook
  
  //Handle submit function
   function handleSubmit(event){
    event.preventDefault();
    // Pass data to backend we put method since it only updates the previous data and also we pass id to uniquely identify it
    axios.put('http://localhost:8081/update/'+id,{name,task})
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
        <h2>Update Task</h2>

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
          <button type="submit" className="submit-btn">Update</button>
        </form>
      </div>
    </div>
  );
};

export default Update;
