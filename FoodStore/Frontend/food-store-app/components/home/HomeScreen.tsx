"use client";

import { useGetAllFoods } from "./action/home.config.action";
import { BASE_URL } from "@/axios/axiosInstance";
import Link from "next/link";
import { FoodDetailType } from "./type/FoodDetailInterface";
import { ChefHat, Clock, Star } from "lucide-react";

export default function Home() {
  const { data: FoodsData, isLoading: isfoodDataLoading } = useGetAllFoods();

  const foods = FoodsData?.data?.foods || [];

  if (isfoodDataLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <div className="h-12 bg-gray-200 rounded-lg animate-pulse mx-auto max-w-md mb-4"></div>
            <div className="h-6 bg-gray-200 rounded animate-pulse mx-auto max-w-sm"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-md overflow-hidden animate-pulse"
              >
                <div className="h-52 bg-gray-200"></div>
                <div className="p-6 space-y-3">
                  <div className="h-5 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="flex justify-between">
                    <div className="h-5 w-16 bg-gray-200 rounded"></div>
                    <div className="h-4 w-12 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-400 to-red-500 rounded-full mb-6 shadow-xl">
            <ChefHat className="w-10 h-10 text-white" />
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
            Delicious Food
            <span className="block bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
              Delivered Fresh
            </span>
          </h1>

          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Discover mouthwatering dishes crafted with love and delivered hot to
            your doorstep.
          </p>
        </div>

        {/* Food Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {foods.map((food: FoodDetailType) => {
            const imageUrl = food?.image
              ? `${BASE_URL}/${food?.image}`
              : `${BASE_URL}/public/dummy.jpg`;

            return (
              <Link
                href={`/${food?._id}`}
                key={food?._id}
                className="group bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-orange-300 hover:-translate-y-2"
              >
                {/* Image */}
                <div className="relative w-full h-56 overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={food?.title || "Food item"}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />

                  {/* Discount Badge */}
                  {food?.discount && food?.discount > 0 && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                      {food?.discount}% OFF
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col justify-between h-[180px]">
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <h2 className="text-lg font-semibold text-gray-800 group-hover:text-orange-600 transition line-clamp-2">
                        {food?.title}
                      </h2>

                      <div className="flex items-center text-yellow-500 text-sm">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="ml-1 font-medium">4.5</span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-500 line-clamp-2">
                      {food?.description}
                    </p>
                  </div>

                  {/* Bottom */}
                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <span className="text-xl font-bold text-green-600">
                        Rs. {food?.price}
                      </span>
                      {(food?.discount ?? 0) > 0 && food?.price && (
                        <div className="text-xs text-gray-400 line-through">
                          Rs.{" "}
                          {Math.round(
                            food.price / (1 - (food.discount ?? 0) / 100),
                          )}
                        </div>
                      )}
                    </div>  

                    <div className="flex items-center text-gray-400 text-xs">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>25-30 min</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Empty State */}
        {foods.length === 0 && !isfoodDataLoading && (
          <div className="text-center py-20">
            <ChefHat className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">
              No foods available
            </h3>
            <p className="text-gray-500">
              Check back later for delicious options!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
