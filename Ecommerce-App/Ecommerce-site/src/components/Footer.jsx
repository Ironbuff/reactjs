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
    <div className='flex flex-col md:flex-row items-center justify-between px-10 md:px-28 py-6 bg-neutral-800 text-neutral-300'>
      {/* Logo and Socials */}
      <div className='flex flex-col items-center md:items-start gap-4'>
        <img src={image} className='w-24 h-24 object-cove' alt='Logo' />
        <div className='text-center md:text-left'>
          <h1 className='text-lg font-semibold'>Connect with Us</h1>
          <div className='flex gap-4 mt-2'>
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
      <div className='mt-6 md:mt-0 text-center md:text-left'>
        <h1 className='text-lg font-semibold border-b-2 border-neutral-500 pb-2'>Our Services</h1>
        <ul className='mt-3 space-y-2'>
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
    </div>
  );
};

export default Footer;