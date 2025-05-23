import React from 'react'
import img from '../../assets/Home.jpg'
import { Link } from 'react-router-dom'
const Hero = () => {
  return (
    <div className='flex flex-col-reverse lg:flex-row items-center w-full px-6 lg:px-28 gap-10 lg:gap-20 py-10 min-h-[calc(100vh-10ch)] bg-gray-200'>
      
      {/* Text Section */}
      <div className='flex flex-col gap-6 w-full lg:w-1/2 text-center lg:text-left items-center lg:items-start'>
        <small className='px-3 py-1 rounded-full bg-neutral-300  tracking-wide text-base font-semobold'>
          Cloth Store
        </small>
        <h2 className='text-3xl md:text-4xl lg:text-5xl text-neutral-800 font-bold leading-tight'>
          Investigate. Discover. Buy. Repeat.
        </h2>
        <p className='text-base text-neutral-600 max-w-md'>
          Find the perfect look with our curated collection. Style meets comfort, and trends meet tradition.
        </p>
        <Link
          to='/shop'
          className='px-6 py-3 text-white bg-neutral-800 hover:bg-neutral-700 transition-all rounded-xl text-lg font-medium shadow-md'
        >
          Shop Now
        </Link>
      </div>

      {/* Image Section */}
      <div className='w-full lg:w-1/2 flex justify-center'>
        <img
          src={img}
          alt='Clothing promo'
          className='object-cover h-[60vh] md:h-[70vh] lg:h-[80vh] w-full rounded-2xl shadow-lg'
        />
      </div>
    </div>
  )
}

export default Hero