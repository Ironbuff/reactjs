import React from "react";
import image from "../../assests/New Libary.png";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="flex px-12 flex-col-reverse md:flex-row items-center justify-between w-full min-h-[calc(100vh-13ch)] bg-neutral-900  py-12">
      {/* Text Content */}
      <div className="w-full md:w-1/2 ml-12 lg:w-2/5 text-center md:text-left text-neutral-100 space-y-6">
        <h1 className="text-4xl sm:text-5xl font-bold  leading-tight">
          Discover Your Next <br className="hidden sm:inline" /> Great Read
        </h1>
        <p className="text-base sm:text-lg max-w-md mx-auto md:mx-0 text-neutral-300">
          Uncover captivating stories, enriching knowledge, and endless
          inspiration in our curated collection of books.
        </p>
        <div className="pt-2">
          <button
            onClick={() => {
              navigate("/book");
            }}
            className="inline-block cursor-pointer text-lg sm:text-xl font-semibold border border-neutral-200 px-6 py-3 rounded-xl bg-neutral-800 hover:bg-blue-500 hover:text-white transition-all duration-300"
          >
            Discover Books
          </button>
        </div>
      </div>

      {/* Image Section */}
      <div className="w-full md:w-1/2 lg:w-2/5 mb-10 md:mb-0 flex justify-center">
        <img
          src={image}
          alt="Library Books"
          className="object-contain max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto rounded-xl shadow-lg"
        />
      </div>
    </section>
  );
};

export default Hero;
