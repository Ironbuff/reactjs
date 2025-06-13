import React, { useEffect, useState } from 'react'
import {Outlet} from 'react-router-dom'
import Sidebar from './Sidebar'
import axios from 'axios'
const Profile = () => {
  
  const [profile,setProfile] = useState('')

  

  
  useEffect(()=>{
    const fetch = async()=>{
      const response = await axios.get ('http://localhost:8081/api/users/getuser',{headers:
        {
               'Authorization':`Bearer ${localStorage.getItem('token')}`,
                    id:localStorage.getItem('id'),
        }
      })
      
    
      setProfile(response.data)
    }
    fetch()
  }
  ,[])
  
  
  return (
    <div className='h-screen w-full flex flex-row items-center justify-start'>
      
      <div className='w-1/5 h-full'>
      <Sidebar datas={profile} />
      </div>
      <div>
      <Outlet className='w-3/5 h-full'/> 
      </div>
    </div>
  )
}

export default Profile