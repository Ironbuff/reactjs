import React, { useState } from 'react'
import { FaBars,  FaX } from "react-icons/fa6";

const Mainheader = (props) => {
    const [open, setOpen] = useState(false);
    const onToggle = () => {
        setOpen(!open);
    }
    return (
    <header className="bg-red-700 flex flex-row px-28 justify-between h-[8ch] items-center ">
         {/* Toggle button */}
         <button onClick={onToggle} className="w-8 h-8 rounded-md md:hidden flex text-xl pt-1.5">
                {
                    open ?
                    <FaX />
                    :
                    <FaBars />
                }
            </button>
        {/* this will add the code from navigation */}
        {props.children}

        </header>
  )
}

export default Mainheader