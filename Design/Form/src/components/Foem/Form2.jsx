import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLocationDot,
  FaYoutube,
} from "react-icons/fa6";
import { FaPhoneAlt, FaTwitter } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
const Form2 = () => {
  const Location = [
    {
      id: 1,
      icon: <FaLocationDot />,
      text: "Sorakhutte nayabazar, Kathmandu, Nepal 44600",
    },
    { id: 2, icon: <FaPhoneAlt />, text: "01-5364421" },
    { id: 3, icon: <FaEnvelope />, text: "bbexport6@gmail.com" },
  ];
  const Social = [
    { id: 1, icon: <FaFacebookF />, link: "/" },
    { id: 2, icon: <FaInstagram />, link: "/" },
    { id: 3, icon: <FaTwitter />, link: "/" },
    { id: 4, icon: <FaYoutube />, link: "/" },
  ];
  return (
    <div className="bg-red-600 flex-1 space-y-6 px-5 w-[25%] py-7 h-[50vh] rounded-lg">
      <div className="text-neutral-100 flex flex-col mb-4">
        {/* heading */}
        <h1 className="text-2xl font-semibold">Contact Information</h1>
        {/* description */}
        <p className="text-base font-light">
          {" "}
          We are always there to help you. Contact us today to get started
        </p>
      </div>
      {/* location and description */}
      <div>
        <ul className="list-none flex flex-col gap-y-3">
          {Location.map((item) => (
            <li
              key={item.id}
              className="flex flex-row items-center gap-x-2 text-neutral-100 gap-y-1.5"
            >
              <Link className="bg-white/20 p-2 border border-white/10 rounded-lg">
                {item.icon}
              </Link>
              {item.text}
            </li>
          ))}
        </ul>
      </div>
      {/* social icons  */}
      <div>
        <ul className="list-none flex flex-row gap-x-7 justify-center">
          {Social.map((item) => (
            <li
              key={item.id}
              link={item.link}
              className="text-lg bg-white/30 px-2 py-2 text-neutral-100 rounded-lg"
            >
              {item.icon}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Form2;
