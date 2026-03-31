'use client'

import { useParams } from 'next/navigation'
import React from 'react'
import { useGetFoodById } from './actions/foodById.action.config'
import { BASE_URL } from '@/axios/axiosInstance'

const FoodDetailScreen = () => {
  const params = useParams()
  const foodId = params?.food_id ?? ''

  const { data: foodData, isLoading } = useGetFoodById(foodId)

  const foodDetails = foodData?.data?.food

  const imageUrl = foodDetails?.image
    ? `${BASE_URL}/${foodDetails?.image}`
    : `${BASE_URL}/public/dummy.jpg`

  const discountAmount =
    foodDetails?.price -
    (foodDetails?.price * (foodDetails?.discount || 0)) / 100

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold">
        Loading...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden grid md:grid-cols-2 gap-6">

        {/* Image Section */}
        <div className="w-full h-[300px] md:h-full">
          <img
            src={imageUrl}
            alt={foodDetails?.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-3">
              {foodDetails?.title}
            </h1>

            <p className="text-gray-600 mb-4">
              {foodDetails?.description}
            </p>

            {/* Price Section */}
            <div className="flex items-center gap-3">
              {foodDetails?.discount > 0 ? (
                <>
                  <span className="text-gray-400 line-through text-lg">
                    Rs. {foodDetails?.price}
                  </span>
                  <span className="text-2xl font-semibold text-green-600">
                    Rs. {discountAmount}
                  </span>
                  <span className="bg-red-100 text-red-500 text-sm px-2 py-1 rounded">
                    {foodDetails?.discount}% OFF
                  </span>
                </>
              ) : (
                <span className="text-2xl font-semibold text-gray-800">
                  Rs. {foodDetails?.price}
                </span>
              )}
            </div>
          </div>

          {/* Action Button */}
          <button className="mt-6 w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition hover:scale-105">
            Order Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default FoodDetailScreen