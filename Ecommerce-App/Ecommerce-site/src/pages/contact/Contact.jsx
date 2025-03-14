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
       {/* Glassy Form */}
       <form className="flex flex-col items-center bg-white/30 backdrop-blur-lg shadow-lg border border-white/20 p-6 rounded-lg w-full max-w-md">
        {/* User Name */}
        <div className="flex flex-row items-center gap-3 w-full mb-4">
          <input
            type="text"
            placeholder="First Name"
            className="border border-white/30 bg-white/20 text-white rounded-md px-3 py-2 w-full outline-none placeholder-gray-300 focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="border border-white/30 bg-white/20 text-white rounded-md px-3 py-2 w-full outline-none placeholder-gray-300 focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Ratings */}
        <div className="flex flex-row gap-4 w-full mb-4 text-white">
          <label className="flex items-center gap-2">
            <input type="radio" name="review" className="accent-blue-500 text-white/35" /> Best
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="review" className="accent-red-500" /> Worst
          </label>
        </div>

        {/* Message Box */}
        <div className="w-full mb-4">
          <textarea
            placeholder="Message"
            className="border border-white/30 bg-white/20 text-white rounded-md px-3 py-2 w-full outline-none h-24 resize-none placeholder-gray-300 focus:ring-2 focus:ring-blue-400"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div>
          <button className="px-6 py-2 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition duration-300">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;