"use client";

import { useParams, useRouter } from "next/navigation";
import { useGetFoodById } from "./actions/foodById.action.config";
import { BASE_URL } from "@/axios/axiosInstance";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const FoodDetailScreen = () => {
  const params = useParams();
  const router = useRouter();
  const foodId = params?.food_id ?? "";

  const { data: foodData, isLoading } = useGetFoodById(foodId);
  const role = useSelector((state: RootState) => state.auth.role);

  const foodDetails = foodData?.data?.food;

  const imageUrl = foodDetails?.image
    ? `${BASE_URL}/${foodDetails?.image}`
    : `${BASE_URL}/public/dummy.jpg`;

  const discountAmount =
    foodDetails?.price -
    (foodDetails?.price * (foodDetails?.discount || 0)) / 100;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="bg-white shadow-md rounded-2xl px-8 py-6 text-lg font-semibold text-gray-700">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
          {/* Image Section */}
          <div className="relative bg-gray-100">
            <img
              src={imageUrl}
              alt={foodDetails?.title}
              className="w-full h-[320px] sm:h-[420px] lg:h-full object-cover"
            />

            {foodDetails?.discount > 0 && (
              <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-md">
                {foodDetails?.discount}% OFF
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
            <div>
              <div className="mb-4">
                <p className="text-sm uppercase tracking-wider text-gray-400 font-medium">
                  Food Details
                </p>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
                  {foodDetails?.title}
                </h1>
              </div>

              <p className="text-gray-600 text-base leading-7 mb-6">
                {foodDetails?.description}
              </p>

              {/* Price Section */}
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 mb-6">
                <p className="text-sm text-gray-500 mb-2">Price</p>

                <div className="flex flex-wrap items-center gap-3">
                  {foodDetails?.discount > 0 ? (
                    <>
                      <span className="text-gray-400 line-through text-xl">
                        Rs. {foodDetails?.price}
                      </span>
                      <span className="text-3xl font-bold text-green-600">
                        Rs. {discountAmount}
                      </span>
                    </>
                  ) : (
                    <span className="text-3xl font-bold text-gray-900">
                      Rs. {foodDetails?.price}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button className="w-full bg-black text-white py-3.5 rounded-2xl font-semibold text-base hover:bg-gray-800 transition duration-200 hover:scale-[1.02]">
                Order Now
              </button>

              {role === "admin" && (
                <button
                  onClick={() => router.push(`/add/${foodId}`)}
                  className="w-full bg-blue-600 text-white py-3.5 rounded-2xl font-semibold text-base hover:bg-blue-700 transition duration-200 hover:scale-[1.02]"
                >
                  Edit Food
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetailScreen;
