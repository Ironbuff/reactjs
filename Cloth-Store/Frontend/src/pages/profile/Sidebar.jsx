import React from "react";
import { RxAvatar } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { Link, Router, useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth";



const Sidebar = ({datas}) => {
  
   const dispatch = useDispatch()
   const navigate = useNavigate()

  const handlelogout = ()=>{
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    dispatch(authActions.logout())
    alert("Sucessfully Logout")
    navigate("/")  
  }
  
  return (
    <div className="flex  items-center justify-center  py-10  px-28 h-full w-full  ">
         
       <div className="flex flex-col gap-y-3 w-full h-[80%] rounded-xl bg-gray-200 justify-center items-start px-5">
            
         <div className="flex flex-col gap-y-2 border-b py-5 border-b-neutral-300 w-full">

           <RxAvatar size={50} className="text-green-600" />
           <h2 className="text-lg font-semibold leading-relaxed">
                          {datas.username}
           </h2>

           <p className="text-sm font-light ">
            {datas.email}
           </p>

         </div>
         
         
         {/* Cart Section */}
         <div className="w-full  flex items-center">
          {/* total Orders */}
          {datas.role==="user"?
          <Link to={'order'} className="text-base w-[100%] ">
            Total Order
          </Link>:
          <>
          <Link to={"total"} className="text-base w-full ">
             All Orders
          </Link>
          <Link to={"add"} className="p-2 text-neutral-100 text-base bg-cyan-400 flex items-center justify-center">
          Add Cloth
          </Link>
          </>
          }
          
         </div>

         <div className="flex items-center">
            <button onClick={handlelogout} className="p-2 rounded-xl bg-blue-500 text-neutral-200">
               Logout 
            </button>
         </div>

       </div>
         
    </div>
  )
}

export default Sidebar