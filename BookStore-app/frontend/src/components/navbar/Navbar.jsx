import React from 'react';
import { Link } from 'react-router-dom';
import image from "../../assests/newbook.png"
import { useSelector } from 'react-redux'
const Navbar = () => {
  const navitem = [
    { id: 1, name: "Home", links: "/" },
    { id: 2, name: "All Books", links: "/book" },
    { id: 3, name: "Cart", links: "/cart" },
    { id: 4, name: "Profile", links: "/profile" },
    {id:5, name:"Admin Profile", links:"/profile"}  
  ];

  //redux use here is logged holds the value of isLoggedIn true or false
  const islogged = useSelector((state) => state.auth.isLoggedIn)
  const role = useSelector((state)=>state.auth.role)

  // condition to load only home and all books if not loggedIn or else load both cart and profile if the user is logged in
  if (islogged === false) {
    navitem.splice(2, 2) //it deletes from cart and hides 2 value cart and profile
  }
  if(islogged===true && role==="admin"){
    navitem.splice(3,1)
  }
  if(islogged===true && role==="user"){
    navitem.splice(4,1)
  }


  return (
    <nav className='flex flex-row justify-between items-center h-[8ch] w-full px-20 bg-gray-900 shadow-md'>
      <h1 className='text-2xl text-neutral-200 font-semibold flex flex-row items-center'>
        <img src={image} className='w-fit aspect-video h-[4rem]' />
        BookStore
      </h1>

      <div className='flex flex-row items-center gap-x-4 text-lg'>
        {navitem.map((item) => (
          <Link key={item.id} to={item.links} className=' text-neutral-200 cursor-pointer hover:text-blue-500'>
            {item.name}
          </Link>
        ))}
        {islogged == false && (

          <>

            <Link to={"/signin"} className='text-neutral-200 border-2 px-2 py-1 border-blue-500 hover:bg-blue-500/15 rounded-xl transition-all duration-300'>Sign In</Link>
            <Link to={"/login"} className='text-neutral-200 hover:border-2 px-2 py-1  bg-blue-500 rounded-xl transition-all duration-300 hover:border-blue-500 hover:bg-gray-900'>Log In</Link>

          </>

        )}

      </div>
    </nav>
  );
};

export default Navbar;
