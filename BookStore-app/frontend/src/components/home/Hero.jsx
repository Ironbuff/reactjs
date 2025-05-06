import React from 'react';
import image from '../../assests/New Libary.png';

const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center w-full min-h-[calc(100vh-13ch)] py-8 px-4 bg-neutral-800">
      {/* Text Content */}
      <div className="flex flex-col gap-y-5 text-neutral-200 w-full md:w-1/2 lg:w-2/5 mb-8 md:mb-0 md:pr-4 text-center md:text-left">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold">
          Discover Your Next <br className="hidden sm:block" /> Great Read
        </h1>
        <p className="text-sm sm:text-base max-w-md mx-auto md:mx-0">
          Uncover captivating stories, enriching knowledge, and endless inspiration in our curated collection of books
        </p>
        <div className="mt-2 w-full md:w-auto flex justify-center md:justify-start">
          <button className="border border-neutral-100 py-2 px-3 rounded-lg text-lg sm:text-2xl font-semibold hover:bg-neutral-500/25 hover:text-blue-400 transition-colors">
            Discover Books
          </button>
        </div>
      </div>

      {/* Image */}
      <div className="flex items-center justify-center w-full md:w-1/2 lg:w-2/5">
        <img 
          src={image} 
          alt="Library Books" 
          className="object-contain w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto md:h-64 lg:h-80 xl:h-96"
        />
      </div>
    </div>
  );
};

export default Hero;