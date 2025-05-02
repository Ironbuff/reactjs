import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/profile/Sidebar'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import Loader from '../../components/loader/Loader'

const Profile = () => {
  const [profile, setProfile] = useState('')
 

  useEffect(() => {
    const headers = {
      id: localStorage.getItem("id"),
      authorization: `Bearer ${localStorage.getItem('token')}` // Fixed template literal syntax
    }

    const fetch = async() => {
      try {
        const response = await axios.get('http://localhost:3000/api/users/getuser', {headers})
        setProfile(response.data)
      } catch (error) {
        console.error("Error fetching profile:", error)
      }
    }
    fetch();
  }, [])

  return (
    <div className='w-full h-screen bg-zinc-800 flex flex-row'> {/* Added flex flex-row */}
      {!profile && 
        <div className='h-full w-full flex items-center justify-center'> {/* Added flex */}
          <Loader/>
        </div>
      }
      {profile && 
        <>
          <div className='w-2/6 py-10 px-15'>
            <Sidebar data={profile}/>
          </div>
          <div className='w-4/6 pr-20'> {/* Added padding */}
            <Outlet/>
          </div>
        </>
      }
    </div>
  )
}

export default Profile