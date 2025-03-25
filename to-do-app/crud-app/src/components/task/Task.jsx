import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "./Task.css";
import { Link } from 'react-router-dom';
const Task = () => {
    const [task, setTask] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8081/")
            .then(res => {
                console.log(res);
                setTask(res.data); // Update state with fetched data
            })
            .catch(err => console.log(err));
    }, []);

//   function to delete task
    const handleDelete=async (id)=> {
         try{
            await axios.delete('http://localhost:8081/task/'+id) //it loads specific task with unique id to delete
            window.location.reload() //after delete this reloads the page
         }
         catch(err){
            console.log(err);
         }
    }
    
    
    return (
        <div className='top-box'>
            <div className='box-container'>
                <Link to="/create" className='btn-primary'>
                    Add Task
                </Link>
                <table className='table-container'>
                    <thead className='table-head'>
                        <tr className='table-space'>
                            <th>Number</th>
                            <th>Task</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className='table-head'>
                        {
                            task.map((data, i) => (
                                <tr key={i} className='table-b'>
                                    <td className='space'>{data.Name}</td>
                                    <td className='space'>{data.Task}</td>
                                    <td className='space flex'>
                                        {/* iIn link to update we pass data.id to find the exact task to update */}
                                        <Link to={`update/${data.ID}`} className='btn-blue'>
                                            Update
                                        </Link>
                                        <button className='btn-red' onClick={e=>handleDelete(data.ID)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>  
        </div>
    )
}

export default Task;
