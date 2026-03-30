'use client'

import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { useGetFoodById } from './actions/foodById.action.config';

const FoodDetailScreen = () => {

  const router = useParams();
  const foodId=router?.food_id ?? '' ;
  const {data:foodData, isLoading:isFoodDataLoading}= useGetFoodById(foodId)

  console.log(foodData)
  return (
    <div>foodDetailScreen</div>
  )
}

export default FoodDetailScreen