import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authActions } from '../../../store';
import { useDispatch } from 'react-redux';


const Login = () => {

    const history =useNavigate();
    const disptach =useDispatch(); // Used to dispatch actions to the Redux store and allow to update global state defined in redux

    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });

    const change = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    };

    const submit = async (e) => {         
        e.preventDefault();         
            await axios
            .post(
                "http://localhost:1000/api/v1/login", 
                inputs)
            .then((response)=>{
                    sessionStorage.setItem("id",response.data.others._id);
                    // disptach used to call specific function as defined in reducer for that we import authactions from redux
                      disptach(authActions.loggin()); //convert value of is loggin from false to true

                    history('/todo')
                   });
            // save id of user in session
           
    };    

    return (
        <div className='h-[calc(100vh-23ch)] flex items-center justify-center'>
            <div className='bg-neutral-200/30 shadow-md rounded-2xl p-10 w-96'>
                <h2 className='text-center text-2xl font-bold text-neutral-500 mb-6'>Log In</h2>
                <form className='flex flex-col gap-y-4' 
                onSubmit={submit}
                >
                    {/* Email field */}
                    <div className='flex flex-col'>
                        <label htmlFor='email' className='text-neutral-500 font-semibold mb-1'>Email:</label>
                        <input type='email' id='email' className='w-full px-4 py-2 rounded-lg border-1  outline-none  text-neutral-500 placeholder-neutral-800' placeholder='Enter Email'
                        name='email'
                        value={inputs.email}
                        onChange={change}
                        />
                    </div>
                                      
                   {/* Password field */}
                   <div className='flex flex-col'>
                       <label htmlFor='password' className='text-neutral-500 font-semibold mb-1'>Password:</label>
                       <input type='password' id='password' className='w-full px-4 py-2 rounded-lg border-1  outline-none  text-neutral-500 placeholder-neutral-800' placeholder='Enter Password' 
                       name='password'
                       value={inputs.password}
                       onChange={change}
                       />
                   </div>
                   
                   {/* Button field */}
                   <div className='pt-4'>
                       <button className='w-full bg-neutral-500 text-white font-semibold py-2 rounded-lg   hover:bg-neutral-800 hover:text-neutral-200' type='submit'>
                            Log In
                        </button>
                   </div>
                </form>
            </div>
        </div>
    );
}

export default Login;