import React from 'react'
import { IoIosPaperPlane } from "react-icons/io";
import { Link } from 'react-router-dom';
const Form1 = () => {
  return (
    <div className='flex flex-col gap-y-3 bg-black/40 w-[100%] rounded-lg py-3 justify-end'>
        {/* top heading */}
        <h1 className='text-2xl font-semibold  text-neutral-100 text-center'>
            Get in touch with us
        </h1>
        <div className='flex flex-col gap-y-4 items-center '>
            <form className='flex flex-col gap-y-4 '>
                {/* top input section */}
                <div className='flex flex-row gap-x-3'>
                    <div className='border border-white/80 rounded-lg bg-white'>
                    <input type='text' placeholder='First Name' className='outline-none px-2 py-2'/>
                    </div>
                    <div className='border border-white/80 rounded-lg bg-white'>
                    <input type='text' placeholder='Second Name' className='outline-none px-2 py-2'/>
                    </div>   
                </div>
                {/* subject input section */}
                <div className='border border-white/80 rounded-lg bg-white '>
                    <input type='text' placeholder='Subject' className='outline-none px-2 py-2'/>
                </div>
                {/* Message Section */}
                <div className='border border-white/80 rounded-lg bg-white '>
                    <textarea placeholder='Message' className='outline-none px-2 py-2 w-full'></textarea>
                </div>
                <div className=' bg-red-600 flex gap-x-3 justify-center rounded-lg'>
                   <Link className='flex flex-row items-center py-2 text-neutral-100 gap-x-1'>
                   Send Message
                     <IoIosPaperPlane />
                   </Link>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Form1