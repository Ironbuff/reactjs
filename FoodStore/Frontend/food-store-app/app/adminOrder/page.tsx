import AdminOrderList from '@/components/adminOrder/screen/adminOrder.screen.config'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import React from 'react'

const page = () => {
  return (
    <ProtectedRoute allowedRoles={["admin"]} >
        <AdminOrderList/>
    </ProtectedRoute>
  )
}

export default page