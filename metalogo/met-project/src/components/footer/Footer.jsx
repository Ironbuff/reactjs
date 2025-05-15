import React from 'react'
import img from '../../assets/metalogo.png';
import { IoLocationOutline } from "react-icons/io5";
import { FiPhone } from "react-icons/fi";
import { FaRegEnvelope } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { FiFacebook } from "react-icons/fi";
import { FaViber } from "react-icons/fa";
import { SlSocialLinkedin } from "react-icons/sl";
import { FaInstagram } from "react-icons/fa6";

const Footer = () => {

  const company = [
    { id: 1, title: "Feedback", links: "/feed" },
    { id: 2, title: "Partnership", links: "/partner" },
    { id: 3, title: "Terms and Condition", links: "/terms" },
  ]

  const Services = [
    { id: 1, title: "Custom Software Development", link: "/custom" },
    { id: 2, title: "Web Development", link: "/web" },
    { id: 3, title: "Mobile App Development", link: '/mobile' },
    { id: 4, title: "Cloud Computing Services", link: "/cloud" },
    { id: 5, title: "Quality Assurance and Testing", link: "/quality" },
    { id: 6, title: "UI/UX Designing", link: "/design" },
    { id: 7, title: "Maintenance and Support", link: "/maintainece" },
    { id: 8, title: "Dev Ops", link: "/devops" },
    { id: 9, title: "Blockchain Solutions", link: "/block" },
  ]

  const Join = [
    { id: 1, title: "Careers at MetaLogic", links: "/met" },
    { id: 2, title: "Internships", links: "/intern" },
  ]

  const Media = [
    { id: 1, icon: <FaViber /> },
    { id: 2, icon: <FiFacebook /> },
    { id: 3, icon: <FaInstagram/> },
    { id: 4, icon: <SlSocialLinkedin /> }

  ]


  return (
    <div className='md:h-[60vh] bg-blue-950 flex md:flex-row flex-col w-full flex-wrap justify-between md:px-14 px-4 py-12 gap-y-4'>
      {/* Logo Section */}
      <div className='flex flex-col gap-y-4 md:w-[30%] w-full'>
        {/* Top Part of Logo */}
        <div className='flex flex-row gap-x-2 items-center '>
          <img src={img} className='h-[5vh]' />
          <div className='flex flex-col gap-y-0.5 text-neutral-100'>
            <h1 className='text-2xl tracking-widest font-semibold '>MetaLogic</h1>
            <small>Software Private Limited</small>
          </div>
        </div>

        {/* Below The Logo */}
        <div className='px-10'>
          <ul className='flex flex-col gap-y-1'>
            <li className=' flex flex-row text-neutral-300  gap-x-2 items-center  font-semibold hover:underline'>
              <IoLocationOutline size={15} /> <small>Saptakhel, Lalitpur (Head office)</small>
            </li>
            <li className='flex flex-row text-neutral-300 gap-x-2 items-center font-semibold hover:underline'>
              <FiPhone size={15} /> <small>+ 977 9851353599</small>
            </li>
            <li className='flex flex-row text-neutral-300 gap-x-2 items-center font-semibold hover:underline'>
              <FaRegEnvelope size={15} /> <small>info@metalogic.com.np</small>
            </li>
          </ul>
        </div>

      </div>

      <div className='flex md:flex-row flex-col gap-y-8 px-10  gap-x-16'>

        {/* Company Section */}
        <div className='flex flex-col gap-y-1 text-neutral-200'>
          <h1 className='text-base font-semibold'>Company</h1>
          {company.map((item, i) => (
            <Link key={i} to={item.links} className='text-sm font-light hover:underline'>{item.title}</Link>
          ))}
        </div>

        {/* Services Section */}
        <div className='flex flex-col gap-y-1 text-neutral-200'>
          <h1 className='text-base font-semibold'>Services</h1>
          {Services.map((item, i) => (
            <Link key={i} to={item.link} className='text-sm font-light hover:underline'>{item.title}</Link>
          ))
          }
        </div>

        {/* Join Section */}
        <div className='flex flex-col gap-y-1 text-neutral-200'>
          <h1 className='text-base font-semibold'>
            Join
          </h1>
          {Join.map((item, i) => (
            <Link to={item.links} key={i} className='text-sm font-light hover:underline'>
              {item.title}
            </Link>
          ))}
        </div>

        {/* Social Media Section */}
        <div className='flex flex-col gap-y-2'>
          <h1 className='text-base font-semibold text-neutral-200'>
            Join Us Social Media
          </h1>
          <div className='flex flex-row flex-wrap gap-x-3'>
            {Media.map((item, i) => (
              <Link key={i} className='text-neutral-200 border-1 shadow-sm border-neutral-300 px-2 py-2 rounded-full flex items-center hover:bg-neutral-700 transition-all ease-in-out duration-300'>
                {item.icon}
              </Link>
            ))}
          </div>
        </div>

      </div>

      {/* Copyright Section */}
      <div className='md:text-end text-center text-neutral-300 md:font-semibold'>
          <small>© Copyright 2024 MetaLogic. All rights reserved.</small>
      </div>

    </div>

  )
}

export default Footer