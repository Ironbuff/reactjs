import React from 'react';

const Contact = () => {
  return (
    <div
     className="flex flex-col items-center justify-center h-[60vh] bg-gray-100 p-6 backdrop-blur-lg"
      style={{
          backgroundImage: 'url("https://cdn.pixabay.com/photo/2022/12/01/09/42/night-7628754_1280.jpg")',
          backgroundSize: "cover",
        backgroundPosition: "center",
  }}>
      <form className='flex flex-col items-center bg-white shadow-md p-6 rounded-lg w-full max-w-md backdrop-blur-lg'>
        {/* User Name */}
        <div className='flex flex-row items-center gap-3 w-full mb-4'>
          <input
            type='text'
            placeholder='First Name'
            className='border border-gray-300 rounded-md px-3 py-2 w-full outline-none focus:border-blue-500'
          />
          <input
            type='text'
            placeholder='Last Name'
            className='border border-gray-300 rounded-md px-3 py-2 w-full outline-none focus:border-blue-500'
          />
        </div>
        
        {/* Ratings */}
        <div className='flex flex-row gap-4 w-full mb-4'>
          <label className='flex items-center gap-2 text-gray-700'>
            <input type='radio' name='review' className='accent-blue-600' /> Best
          </label>
          <label className='flex items-center gap-2 text-gray-700'>
            <input type='radio' name='review' className='accent-red-600' /> Worst
          </label>
        </div>
        
        {/* Message Box */}
        <div className='w-full mb-4'>
          <textarea
            placeholder='Message'
            className='border border-gray-300 rounded-md px-3 py-2 w-full outline-none h-24 resize-none focus:border-blue-500'
          ></textarea>
        </div>
        
        {/* Submit Button */}
        <div>
          <button className='px-6 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition duration-300'>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;