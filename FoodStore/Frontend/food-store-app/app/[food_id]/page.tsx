import AddScreen from '@/components/add/add'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import FoodDetailScreen from '@/components/foodDetail/FoodDetail.screen'
import { Navbar } from '@/components/navbar/navbar'
import React from 'react'

const page = () => {
  return (
    <ProtectedRoute allowedRoles={[""]}>
      <Navbar/>
    <FoodDetailScreen/>
   </ProtectedRoute>
  )
}

export default page