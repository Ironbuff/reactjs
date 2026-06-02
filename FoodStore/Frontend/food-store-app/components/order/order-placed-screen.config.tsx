'use client'
import React from 'react'
import { useGetAllOrder } from './actions/order-placed-action'

const OrderPlacedScreen = () => {

    const {data:orderData, isLoading:orderDataLoading}= useGetAllOrder();

    console.log(orderData)
  return (
    <div>OrderPlacedScreen</div>
  )
}

export default OrderPlacedScreen