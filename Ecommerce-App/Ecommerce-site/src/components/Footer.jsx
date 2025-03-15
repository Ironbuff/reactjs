import React from 'react';
import image from '../assets/Logo.jpg';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { RiTwitterXLine } from 'react-icons/ri';

const Footer = () => {
  const socialLinks = [
    { icon: <FaFacebook />, id: 1 },
    { icon: <FaInstagram />, id: 2 },
    { icon: <RiTwitterXLine />, id: 3 },
  ];

  return (
    <div className='flex flex-row md:flex-row items-center gap-x-3 px-10 md:px-28 py-10 h-[50vh] bg-neutral-800 text-neutral-300 gap-10 md:gap-20'>
      {/* Logo and Socials */}
      <div className='flex flex-col items-center md:items-start gap-4 w-full md:w-1/3'>
        <img src={image} className='w-24 h-24 object-cover' alt='Logo' />
        <div className='text-center md:text-left'>
          <h1 className='text-lg font-semibold'>Connect with Us</h1>
          <div className='flex gap-4 mt-2 justify-center md:justify-start'>
            {socialLinks.map((item) => (
              <div
                key={item.id}
                className='text-xl p-3 bg-neutral-700 hover:bg-neutral-600 rounded-full transition duration-300 cursor-pointer'
              >
                {item.icon}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Services */}
      <div className=' flex flex-col py-0 md:text-top w-full md:w-1/3'>
        <h1 className='text-lg font-semibold border-b-2 border-neutral-500 pb-2'>Our Services</h1>
        <ul className='flex flex-col gap-y-5 items-start'>
          <li>
            <Link to='/products' className='hover:text-white transition duration-300'>Products</Link>
          </li>
          <li>
            <Link to='/customer' className='hover:text-white transition duration-300'>Customer Reviews</Link>
          </li>
          <li>
            <Link to='/contact' className='hover:text-white transition duration-300'>Contact</Link>
          </li>
        </ul>
      </div>

      {/* Location */}
      <div className=' flex flex-col  text-center md:text-left w-full md:w-1/3'>
        <h1 className='text-lg font-semibold border-b-2 border-neutral-500 pb-2'>Our Location</h1>
        <p className='mt-2'>Balaju, Kathmandu</p>
        <div className='px-1 flex justify-center md:justify-start'>
          <iframe
            title='Google Map'
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.488618554538!2d85.29111347521157!3d27.703671576152366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb191d819fe59b%3A0x55c152b8d792e5b3!2sBalaju%2C%20Kathmandu!5e0!3m2!1sen!2snp!4v1710457822616!5m2!1sen!2snp'
            width='250'
            height='100'
            style={{ border: 0 }}
            allowFullScreen=''
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Footer;
