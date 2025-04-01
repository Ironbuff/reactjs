import React, { useEffect, useState } from "react";
import { GrDocumentUpdate } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { authActions } from "../../../store";
import Update from "./update/Update";
import axios from "axios";



let toUpdateArray =[];

const Todo = () => {
   
  const navigate = useNavigate(); // Add this line at the beginning of Todo component
  
  let id = sessionStorage.getItem("id")

  const [inputs, setInputs] = useState({ title: "", body: "" });
  const [array, setArray] = useState([]);


   
  
  
  const show = () => {
    document.getElementById("textarea").style.display = "block"; // it will display in block when click title and it will be none before
  };
 

  //function to set value on input state
  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  //submit function to display inputs
  const submit = async() => {   //since we use async wait
    if (inputs.title===""&&inputs.body ===""){
      toast.error("Please Enter Task")
    }
    else{
      if(id){
        //it passes the title , id and body to the backend of user
           await axios.post("http://localhost:1000/api/v2/addTask",{
            title:inputs.title,
            body:inputs.body,
            id:id
          })
           .then((response)=>{
            console.log(response) //displays recently added Task
           })          
           setInputs({ title: "", body: "" }); //to empty input field
           toast.success("Task entered Sucessfully");
      } else{
        setArray([...array, inputs]); //this sets array empty
        setInputs({ title: "", body: "" }); //to empty input field
        toast.success("Task entered Sucessfully");
        toast.error("Task is created but not saved please Sign In")
      }
   
    }
  };

  const delid = async(Cardid) =>{
    if(id){
        // array.splice(id,"1") //splice allows to delete from array id specify the exact array and "1" tells only to delete that array
    // setArray([...array])
    await axios
    .delete(`http://localhost:1000/api/v2/deleteTask/${Cardid}`,{
      data: {id:id}, //since delete only has body and headers so we pass like this
    })
    .then(()=>{
      toast.success("Your Task is Deleted")
    })
    }else{
      toast.error("Please Sign Up First");
    }
   
  }

  const update =(value)=>{
    toUpdateArray=array[value];// shows the selected id value and will be stored in global variable to updatearray
    navigate("/update", { state: { task: toUpdateArray } });// Navigate to Update page with state
  }

  useEffect(()=>{
    if(id){
      const fetch = async() =>{
        await axios.get(`http://localhost:1000/api/v2/getTasks/${id}`) //here to get user get we use getTasks api defined in backend use latex to give ${id} which gives user id
        .then((response)=>{
          console.log(response.data)
          setArray(response.data.list) //it will update the task of the array
        })
       
      }
      
      fetch();//it is called to run the function that is defined so that task can be added 
    }else{
      toast.error("Please Sign Up First");
    }
     
  },[submit]) //have submit dependency will also load the useEffect only when this function is mount

  return (

    <div className="flex items-center justify-center w-full h-[calc(100vh-23ch)] px-28">
      <ToastContainer/>
      <div className="py-3 flex flex-col w-full">
        <div className="flex flex-col w-[67%] border border-neutral-200 rounded-lg shadow-lg">
          {/* input */}
          <input
            type="text"
            placeholder="Title"
            onClick={show}
            className="py-3 px-2 w-90 outline-none"
            onChange={change}
            name="title"
            value={inputs.title}
          />
          {/* task */}
          <textarea
            id="textarea"
            placeholder="Task"
            className=" py-3 px-2 outline-none w-[100%] hidden"
            onChange={change}
            name="body"
            value={inputs.body}
          />
        </div>
        {/* here button to add task */}
        <div className="flex items-center py-4">
          <button
            className="bg-blue-900 px-4 py-3 rounded-lg text-white font-semibold"
            onClick={submit}
          >
            Add
          </button>
        </div>

        {/* Todo List */}
        <div className="flex flex-col py-5 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {array.map((item, index) => (
              <div
                key={index}
                className="border border-gray-300 rounded-lg shadow-lg p-4 bg-white flex flex-col gap-2"
              >
                {/* Title & Body */}
                <h1 className="font-bold text-lg text-gray-900">
                  {item.title}
                </h1>
                <p className="text-gray-600">{item.body}</p>

                {/* Action Buttons */}
                <div className="flex justify-between items-center mt-3">
                  <button className="text-red-500 hover:text-red-700 transition-all duration-200 flex items-center gap-2" onClick={()=>delid(item._id)}> {/*item._id returns object id */}
                    <MdDelete className="text-xl cursor-pointer" />
                    Delete
                  </button>
                  <button className="text-blue-500 hover:text-blue-700 transition-all duration-200 flex items-center gap-2" onClick={()=>update(index)}>
                    <GrDocumentUpdate className="text-xl cursor-pointer" />
                    
                   <Link to="/update">Update</Link> 
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
