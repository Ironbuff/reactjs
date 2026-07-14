import AdminOrderList from '@/components/adminOrder/screen/adminOrder.screen.config'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import { Navbar } from '@/components/navbar/navbar'
import React from 'react'

const page = () => {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <Navbar/>
        <AdminOrderList/>
    </ProtectedRoute>
  )
}

export default page