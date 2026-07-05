'use client'

import React from 'react'


import { useGetOrderListAdmin } from '../actions/adminOrder.action.config'

const AdminOrderList = () => {

    const {data:adminOrder, isLoading:isAdminOrderListLoading}= useGetOrderListAdmin()

    console.log({adminOrder})
  return (
    <div>AdminOrderList</div>
  )
}

export default AdminOrderList