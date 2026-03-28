"use client";

import Image from "next/image";
import { useGetAllFoods } from "./action/home.config.action";
import { BASE_URL } from "@/axios/axiosInstance";

export default function Home() {
  const { data: FoodsData, isLoading: isfoodDataLoading } = useGetAllFoods();

  const foods = FoodsData?.data?.foods || [];

  if (isfoodDataLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold">Loading foods...</p>
      </div>
    );
  }


  return (
    <div className="px-7 py-10">
      {/* Header */}
      <h1 className="text-2xl font-semibold text-center px-4 py-3 rounded-md border border-neutral-700 font-mono bg-neutral-700 text-neutral-200 mb-10">
        Order Food <br /> We Are Here to Serve You.
      </h1>

      {/* Food Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {foods.map((food: any) => {
          const imageUrl = food?.image
            ? `${BASE_URL}/${food.image}` 
            : `${BASE_URL}/public/dummy.jpg`;

          return (
            <div
              key={food._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              {/* Image */}
              <div className="relative w-full h-48">
                <img
                  src={imageUrl}
                  alt={food.title}
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <h2 className="text-lg font-bold">{food.title}</h2>
                <p className="text-sm text-gray-600">{food.description}</p>

                <div className="flex justify-between items-center mt-3">
                  <span className="font-semibold text-green-600">
                    Rs. {food.price}
                  </span>

                  {food.discount > 0 && (
                    <span className="text-sm text-red-500">
                      {food.discount}% OFF
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
