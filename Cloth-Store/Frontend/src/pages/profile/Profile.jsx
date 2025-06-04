import React from 'react'

const Profile = () => {
  return (
    <div className='h-screen w-full flex flex-row items-center justify-center'>
      
      <div className='w-2/5 h-full'>
      <Sidebar />
      </div>
      <div>
      <Outlet className='w-3/5 h-full'/>
      </div>
    </div>
  )
}

export default Profile