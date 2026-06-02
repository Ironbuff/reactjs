import ProtectedRoute from '@/components/auth/ProtectedRoute'
import { Navbar } from '@/components/navbar/navbar'
import OrderPlacedScreen from '@/components/order/order-placed-screen.config'
import React from 'react'

const page = () => {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
        <Navbar/>
        <OrderPlacedScreen/>
    </ProtectedRoute>
  )
}

export default page