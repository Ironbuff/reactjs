import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const SignIn = () => {
    
    const history = useNavigate();
    
    const [inputs, setInputs] = useState({
        email: "",
        username: "",
        password: "",
    });

    const change = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    };

    const submit = async(e) => {
        e.preventDefault(); // Corrected method name
        await axios.post("http://localhost:1000/api/v1/register",inputs) //to print the inputs in form
        .then((response)=>{
           //pops up user already exists popoff box
            if(response.data.message ==="User already exists"){
            alert(response.data.message)
           }
           //it shows Sign In and then empties the inputs array
           else{
            alert(response.data.message)
            setInputs({
                email:"",
                username:"",
                password:"",
            });
            history("/login") //it takes to login page history is defined using useNavigate to navigate to login
           }
            
           
    });
    };

    return (
        <div className='h-[calc(100vh-23ch)] flex items-center justify-center'>
            <div className='bg-neutral-200/30 shadow-md rounded-2xl p-10 w-96'>
                <h2 className='text-center text-2xl font-bold text-neutral-500 mb-6'>Sign In</h2>
                <form className='flex flex-col gap-y-4' onSubmit={submit}> {/* Apply onSubmit to the form */}
                    {/* Email field */}
                    <div className='flex flex-col'>
                        <label htmlFor='email' className='text-neutral-500 font-semibold mb-1'>Email:</label>
                        <input
                            type='email'
                            id='email'
                            name='email' // Added name attribute for controlled components
                            className='w-full px-4 py-2 rounded-lg border-1 outline-none text-neutral-500 placeholder-neutral-800'
                            placeholder='Enter Email'
                            onChange={change}
                            value={inputs.email}
                        />
                    </div>

                    {/* Username field */}
                    <div className='flex flex-col'>
                        <label htmlFor='username' className='text-neutral-500 font-semibold mb-1'>Username:</label>
                        <input
                            type='text'
                            id='username'
                            name='username' // Added name attribute for controlled components
                            className='w-full px-4 py-2 rounded-lg border-1 outline-none text-neutral-500 placeholder-neutral-800'
                            placeholder='Enter Username'
                            onChange={change}
                            value={inputs.username}
                        />
                    </div>

                    {/* Password field */}
                    <div className='flex flex-col'>
                        <label htmlFor='password' className='text-neutral-500 font-semibold mb-1'>Password:</label>
                        <input
                            type='password'
                            id='password'
                            name='password' // Added name attribute for controlled components
                            className='w-full px-4 py-2 rounded-lg border-1 outline-none text-neutral-500 placeholder-neutral-800'
                            placeholder='Enter Password'
                            onChange={change}
                            value={inputs.password}
                        />
                    </div>

                    {/* Button field */}
                    <div className='pt-4'>
                        <button
                            className='w-full bg-red-500 text-white font-semibold py-2 rounded-lg hover:bg-neutral-800 hover:text-neutral-200'
                            type="submit" // This should be 'submit' to trigger form submission
                        >
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignIn;
