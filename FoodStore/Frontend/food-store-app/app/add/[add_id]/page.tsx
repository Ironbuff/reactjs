import AddScreen from '@/components/add/add'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import { Navbar } from '@/components/navbar/navbar'
import React from 'react'

const page = () => {
  return (
<>
<Navbar/>
<AddScreen mode='Edit'/>
</>
  )
}

export default page