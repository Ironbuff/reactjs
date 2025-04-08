import React from 'react'

const Home = () => {
  return (
    <div className='h-[calc(100vh-23ch)] px-28 flex flex-col gap-y-6 items-center justify-center'>
        <h1 className='font-bold text-4xl flex items-center justify-center'>Organize your tasks <br></br> work and life</h1>
        <p className='font-base text-l flex items-center justify-center'>
            Creating Fully managed Mern stack for your convience
       </p>
       <button className='px-2 py-2 text-neutral-100 shadow-sm bg-red-500 border-2 font-bold border-neutral-500/50 rounded-lg'>
        Make Todo List
       </button>
    </div>
  )
}

export default Home