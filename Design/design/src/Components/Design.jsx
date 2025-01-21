import React from "react";
import { BrowserRouter } from "react-router-dom";
import { FaRegPaperPlane } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { FaPhoneAlt } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
const Design = () => {
  const Social = [
    { id: 1, icon: <FaFacebook />, link: "/" },
    { id: 2, icon: <FaInstagram />, link: "/" },
    { id: 3, icon: <FaXTwitter />, link: "/" },
    { id: 4, icon: <FaYoutube />, link: "/" },
  ];
  const Location = [
    {
      id: 1,
      icon: <CiLocationOn />,
      link: "/",
      text: "Sorakhutte,Kathmandu,Nepal,44600",
    },
    { id: 2, icon: <FaPhoneAlt />, link: "/", text: " 01-435605" },
    { id: 3, icon: <FaEnvelope />, link: "/", text: "bbExport75@gmail.com" },
  ];
  return (
    <div className=" h-screen bg-[url('https://cdn.pixabay.com/photo/2021/02/23/11/06/mountains-6043079_1280.jpg')] bg-cover bg-center bg-no-repeat w-full flex items-center justify-center">
      {/* First form box also parent box */}
      <div className="flex flex-col gap-y-5 py-8 w-[50%] items-center justify-center  backdrop-blur-lg ml-72  pl-36 relative">
        <div className="flex flex-row  px-28 justify-center text-neutral-900 font-bold">
          <h1 className="text-3xl text-neutral-50 "> Get in touch with Us</h1>
        </div>
        <div>
          
          <form className="flex flex-col gap-y-4">
            <div className="flex gap-x-7 ">
              <input
                type="text"
                placeholder="First Name"
                className="outline-none rounded-lg border border-neutral-100 bg-slate-50 px-4 py-2 w-44"
              />
              <input
                type="text"
                placeholder="Second Name"
                className="outline-none rounded-lg border border-neutral-100 bg-slate-50 px-4 py-2 w-44"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Subject"
                className="outline-none rounded-lg border border-neutral-100 bg-slate-50 px-4 py-2 w-96"
              />
            </div>
            <div>
              <textarea
                placeholder="Message"
                className="outline-none rounded-lg border border-neutral-100 bg-slate-50 px-4 py-2 w-96"
              ></textarea>
            </div>
            <div className="flex justify-center border border-red-600 bg-red-600 px-5 py-2 rounded-lg text-white w-96">
              <Link
                to="/"
                className="flex items-center justify-center gap-4 font-semibold"
              >
                Message Us
                <FaRegPaperPlane />
              </Link>
            </div>
          </form>
        </div>
      </div>
         {/* Second form box of children box  */}
      <div className="flex flex-col bg-red-600 w-[30%] px-7 py-3 rounded-lg absolute left-64 top-50">
        <div className="flex flex-col text-neutral-100 py-5">
          <h2 className="text-2xl font-bold">Contact Information</h2>
          <p className="text-base ">
            We are always ready to help you. Contact<br></br> us today and get
            started
          </p>
        </div>

        <div className="text-base text-neutral-100">
         {/* location icons */}
          <ul className="flex flex-col gap-y-3">
            {Location.map((item) => (
              <li className="flex flex-row items-center gap-4" key={item.id}>
                <div className="flex flex-row bg-white/10 px-1 rounded-md py-1 items-center justify-center border border-white/10">
                  {item.icon}
                </div>
                <h3>{item.text}</h3>
              </li>
            ))}
          </ul>
        </div>
        <div className="py-5">
          {/* Social Icons */}
          <ul className="list-none flex flex-row gap-x-4">
            {Social.map((item) => (
              <li
                className=" py-1 px-2 bg-white/10 rounded-lg text-white flex items-center justify-center w-auto "
                key={item.id}
              >
                {item.icon}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Design;
