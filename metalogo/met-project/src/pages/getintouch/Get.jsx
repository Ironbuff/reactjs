import React from 'react'
import { FiHeadphones } from "react-icons/fi";
import { FaHandshake } from "react-icons/fa6";
import { FaViber } from "react-icons/fa";

const Get = () => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 bg-gray-300 md:px-40 px-3 py-10 gap-10'>

            {/* Left Section */}
            <div className='flex flex-col gap-6'>

                <h1 className='text-red-500 font-semibold text-sm uppercase'>Get in Touch</h1>

                <h2 className='text-blue-950 text-4xl font-bold'>Let's Kickstart Your <br/> Project</h2>

                <p className='text-gray-700 text-sm'>
                    Ready to take the next step? Fill out the form to schedule a <br/> consultation with our experts.
                </p>

                {/* Support & Partnerships Card */}
                <div className='bg-neutral-100 p-4 rounded-xl flex flex-col gap-4 w-full md:w-fit'>

                    {/* Customer Support */}
                    <div className='flex items-center gap-3'>
                        <FiHeadphones className='bg-sky-300 p-1 rounded-lg text-neutral-900' size={30} />
                        <div>
                            <h3 className='text-base font-semibold'>Customer Support</h3>
                            <p className='text-sm font-light'>
                                Need a technical Assistance? 
                                <span className='text-blue-600 font-semibold border-b border-blue-600 ml-1 cursor-pointer hover:text-blue-600/50 ease-in-out transition-all duration-300 '>Contact Support</span>
                            </p>
                        </div>
                    </div>

                    {/* Partnerships */}
                    <div className='flex items-center gap-3'>
                        <FaHandshake className='bg-sky-300 p-1 rounded-lg text-neutral-900' size={30} />
                        <div>
                            <h3 className='text-sm font-semibold'>Partnerships</h3>
                            <p className='text-sm font-light'>
                                Want to offer MetaLogic to your client? <br></br> Become a 
                                <span className='text-blue-600 font-semibold border-b border-blue-600 ml-1 hover:text-blue-600/50 ease-in-out transition-all duration-300 cursor-pointer'>Partner</span>
                            </p>
                        </div>
                    </div>

                </div>

                <div className='border-t border-gray-400 pt-4 text-sm font-semibold'>
                    Or you can directly send a message in WhatsApp 
                </div>

                <button className='bg-blue-950 text-white rounded-md px-6 py-2 w-full flex items-center gap-x-1 justify-center hover:bg-blue-950/80 ease-in-out transition-all duration-300 hover:translate-1'>
                    Whatsapp <FaViber />
                </button>

            </div>

            {/* Right Form Section */}
            <div className='bg-white p-5 rounded-xl shadow-md'>

                <form className='flex flex-col gap-1'>

                    {/* Name */}
                    <div>
                        <label className='text-sm font-base'>Full Name<span className='text-red-500'>*</span></label>
                        <input type='text' placeholder='Eg: Ram Bahadur Thapa' className='border border-neutral-200 shadow-sm w-full p-2 rounded-md mt-1'/>
                    </div>

                    {/* Email & Contact */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                        <div>
                            <label className='text-sm font-base'>Email<span className='text-red-500'>*</span></label>
                            <input type='email' placeholder='Eg: ram@mail.com' className='border border-neutral-200 shadow-sm w-full p-2 rounded-md mt-1'/>
                        </div>
                        <div>
                            <label className='text-sm font-base'>Contact<span className='text-red-500'>*</span></label>
                            <input type='text' placeholder='Eg: 98xxxxxxxx' className='border border-neutral-200 shadow-sm w-full p-2 rounded-md mt-1'/>
                        </div>
                    </div>

                    {/* Company Name & Location */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                        <div>
                            <label className='text-sm font-base'>Company Name</label>
                            <input type='text' placeholder='Eg: Metalogic Pvt Ltd' className='border border-neutral-200 shadow-sm w-full p-2 rounded-md mt-1'/>
                        </div>
                        <div>
                            <label className='text-sm font-base'>Company Location</label>
                            <input type='text' placeholder='Eg: Lalitpur, Nepal' className='border border-neutral-200 shadow-sm w-full p-2 rounded-md mt-1'/>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className='text-sm font-base'>Description<span className='text-red-500'>*</span></label>
                        <textarea placeholder='Anything particular we should know?' className='border border-neutral-200 shadow-sm w-full p-2 rounded-md mt-1' rows={4}></textarea>
                    </div>

                    {/* Checkbox */}
                    <div className='flex items-start gap-2 text-sm'>
                        <input type='checkbox' className='mt-1'/>
                        <p>
                            I agree to Metalogic sending me marketing communications, as described in the 
                            <span className='text-blue-600 underline ml-1'>Website and Cookie Policy</span>.
                        </p>
                    </div>

                    {/* Submit Button */}
                    <button className='bg-blue-950 text-white py-2 rounded-md hover:bg-blue-950/80 ease-in-out transition-all duration-300 hover:translate-1'>
                        Submit
                    </button>

                </form>
            </div>

        </div>
    )
}

export default Get;
