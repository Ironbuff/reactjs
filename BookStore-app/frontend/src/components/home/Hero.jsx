import React from 'react'
import image from '../../assests/New Libary.png'
const Hero = () => {
  return (
    <div className='flex flex-row items-center justify-center w-full h-[calc(100vh-13ch)] bg-neutral-800'>
        <div className='flex flex-col gap-y-5  text-neutral-200 w-[40%] items-start '>
            <h1 className='text-5xl font-semibold items-start'>
            Discover Your Next <br></br> Great Read
            </h1>
            <p className='text-base'>
            Uncover captivating stories, enriching knowledge, and endless inspiration in our curated collection of books
            </p>
            <div className='text-2xl font-semibold'>
                <button className='border border-neutral-100 py-2 px-3 rounded-4xl hover:bg-neutral-500/25 hover:text-blue-400 '>
                Discover Books
                </button>
            </div>
        </div>
        <div className='flex items-center justify-center w-[40%]'>
             <img src={image} className='object-fill aspect-ratio w-auto h-[30rem]'/>
        </div>
    </div>
  )
}

export default Hero