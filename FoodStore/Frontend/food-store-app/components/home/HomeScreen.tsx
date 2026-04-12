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
      <div className="min-h-screen bg-linear-to-br from-orange-50 to-red-50">
        <div className="container mx-auto px-4 py-12">
          {/* Header Skeleton */}
          <div className="text-center mb-12">
            <div className="h-12 bg-gray-200 rounded-lg animate-pulse mx-auto max-w-md mb-4"></div>
            <div className="h-6 bg-gray-200 rounded animate-pulse mx-auto max-w-sm"></div>
          </div>

          {/* Food Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse"
              >
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-5 bg-gray-200 rounded w-16"></div>
                    <div className="h-4 bg-gray-200 rounded w-12"></div>
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
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-red-50">
      <div className="container mx-auto px-4 py-12">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-r from-orange-400 to-red-500 rounded-full mb-6 shadow-lg">
            <ChefHat className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Delicious Food
            <span className="block text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-red-600">
              Delivered Fresh
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover mouthwatering dishes crafted with love. Order now and
            experience culinary excellence at your doorstep.
          </p>
        </div>

        {/* Food Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {foods.map((food: FoodDetailType) => {
            const imageUrl = food?.image
              ? `${BASE_URL}/${food?.image}`
              : `${BASE_URL}/public/dummy.jpg`;

            return (
              <Link
                href={`/${food?._id}`}
                key={food?._id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-orange-200 transform hover:-translate-y-1"
              >
                {/* Image Container */}
                <div className="relative w-full h-56 overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={food?.title || "Food item"}
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Discount Badge */}
                  {food?.discount && food?.discount > 0 && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                      {food?.discount}% OFF
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h2 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-2">
                      {food?.title}
                    </h2>
                    <div className="flex items-center text-yellow-500 ml-2">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-medium ml-1">4.5</span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {food?.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-2xl font-bold text-green-600">
                        Rs. {food?.price}
                      </span>
                      {food?.discount && food?.discount > 0 && food?.price && (
                        <span className="text-sm text-gray-500 line-through">
                          Rs.{" "}
                          {Math.round(food.price / (1 - food.discount / 100))}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center text-gray-500 text-sm">
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
          <div className="text-center py-16">
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
