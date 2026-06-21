"use client";

import React from "react";
import { useGetAllOrder } from "./actions/order-placed-action";
import { BASE_URL } from "@/axios/axiosInstance";

const OrderPlacedScreen = () => {
  const { data: orderData, isLoading } = useGetAllOrder();

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#F5F1EB]">
        <p className="text-xl font-semibold text-[#0F172A]">
          Loading Orders...
        </p>
      </div>
    );
  }

  const orders = orderData?.data?.orders || [];

  const getImageUrl = (image) => {
    if (!image) {
      return `${BASE_URL}/public/dummy.jpg`;
    }

    // Fix Windows-style path: uploads\image-name
    const fixedPath = image.replace(/\\/g, "/");

    return `${BASE_URL}/${fixedPath}`;
  };

  const getProgressStep = (status) => {
    if (status === "Order Placed") return 1;
    if (status === "Preparing") return 2;
    if (status === "Delivered") return 3;
    return 1;
  };

  return (
    <div className="min-h-screen bg-[#F5F1EB] py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-[#0F172A]">My Orders</h1>
          <p className="text-gray-500 mt-2">
            Track all your placed food orders
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center shadow-md">
            <h2 className="text-2xl font-semibold text-[#0F172A]">
              No Orders Found
            </h2>
            <p className="text-gray-500 mt-2">
              You have not placed any orders yet.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {orders.map((order) => {
              const food = order?.food;
              const progressStep = getProgressStep(order?.status);

              return (
                <div
                  key={order._id}
                  className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Image Section */}
                  <div className="relative h-64">
                    <img
                      src={getImageUrl(food?.image)}
                      alt={food?.title || "Food Image"}
                      className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />

                    <div className="absolute top-4 right-4">
                      <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                        {order?.status || "Order Placed"}
                      </span>
                    </div>

                    <div className="absolute bottom-5 left-5 right-5">
                      <h2 className="text-3xl font-bold text-white">
                        {food?.title || "Food Not Available"}
                      </h2>

                      <p className="text-white/80 text-sm mt-1 line-clamp-1">
                        {food?.description || "No description available"}
                      </p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-gray-500 line-clamp-2">
                      {food?.description || "No description available"}
                    </p>

                    {/* Price & Discount */}
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="bg-orange-50 rounded-2xl p-4">
                        <p className="text-sm text-gray-500">Price</p>
                        <p className="text-2xl font-bold text-orange-600">
                          ${food?.price ?? 0}
                        </p>
                      </div>

                      <div className="bg-green-50 rounded-2xl p-4">
                        <p className="text-sm text-gray-500">Discount</p>
                        <p className="text-2xl font-bold text-green-600">
                          {food?.discount ?? 0}%
                        </p>
                      </div>
                    </div>

                    {/* Order Progress */}
                    <div className="mt-8">
                      <div className="flex items-center">
                        <div
                          className={`w-5 h-5 rounded-full ${
                            progressStep >= 1 ? "bg-orange-500" : "bg-gray-200"
                          }`}
                        />

                        <div
                          className={`flex-1 h-1 ${
                            progressStep >= 2 ? "bg-orange-500" : "bg-gray-200"
                          }`}
                        />

                        <div
                          className={`w-5 h-5 rounded-full ${
                            progressStep >= 2 ? "bg-orange-500" : "bg-gray-200"
                          }`}
                        />

                        <div
                          className={`flex-1 h-1 ${
                            progressStep >= 3 ? "bg-orange-500" : "bg-gray-200"
                          }`}
                        />

                        <div
                          className={`w-5 h-5 rounded-full ${
                            progressStep >= 3 ? "bg-orange-500" : "bg-gray-200"
                          }`}
                        />
                      </div>

                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>Placed</span>
                        <span>Preparing</span>
                        <span>Delivered</span>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="mt-8 border-t border-gray-100 pt-5">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">Status</span>

                        <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold">
                          {order?.status || "Order Placed"}
                        </span>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-5 space-y-2 text-sm text-gray-500">
                      <div className="flex justify-between gap-4">
                        <span>Order ID</span>
                        <span className="font-medium text-gray-700">
                          #{order?._id?.slice(-6)}
                        </span>
                      </div>

                      <div className="flex justify-between gap-4">
                        <span>Customer</span>
                        <span className="font-medium text-gray-700">
                          {order?.user?.username || "Unknown User"}
                        </span>
                      </div>

                      <div className="flex justify-between gap-4">
                        <span>Email</span>
                        <span className="font-medium text-gray-700 truncate max-w-[180px]">
                          {order?.user?.email || "No email"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderPlacedScreen;