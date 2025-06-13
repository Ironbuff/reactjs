import React from "react";
import { RxAvatar } from "react-icons/rx";
import { Link } from "react-router-dom";


const Sidebar = ({datas}) => {
  
  
  return (
    <div className="flex flex-col gap-y-2 px-28 py-10 w-full ">
         
         <div className="flex flex-col gap-y-1 border-b py-5 border-b-neutral-300 w-full">

           <RxAvatar size={50} className="text-green-600" />
           <h2 className="text-lg font-semibold leading-relaxed">
                          {datas.username}
           </h2>

           <p className="text-sm font-light ">
            {datas.email}
           </p>

         </div>
         
         {/* Cart Section */}
         <div className="w-full bg-blue-500 flex items-center">
          {/* total Orders */}
          <Link to={'/order'} className="text-base w-full bg-red-500">
             All Order
          </Link>
         </div>

         <div>
           Logout 
         </div>
         
    </div>
  )
}

export default Sidebar