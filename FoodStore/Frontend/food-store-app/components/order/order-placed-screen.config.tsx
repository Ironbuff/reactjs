"use client";

import React from "react";
import { useGetAllOrder } from "./actions/order-placed-action";

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

  const orders = orderData?.orders || [];

  return (
    <div className="min-h-screen bg-[#F5F1EB] py-10 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-[#0F172A]">
            My Orders
          </h1>
          <p className="text-gray-500 mt-2">
            Track all your placed orders
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center shadow-md">
            <h2 className="text-2xl font-semibold text-[#0F172A]">
              No Orders Found
            </h2>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* Image */}
                <div className="relative">
                  <img
                    src={
                      order?.food?.image ||
                      "https://images.unsplash.com/photo-1504674900247-0877df9cc836"
                    }
                    alt={order?.food?.title}
                    className="w-full h-56 object-cover"
                  />

                  <span className="absolute top-4 right-4 bg-[#FF5A00] text-white px-4 py-1 rounded-full text-sm font-semibold">
                    {order.status}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-[#0F172A]">
                    {order?.food?.title || "Food Not Available"}
                  </h2>

                  <p className="text-gray-500 mt-2">
                    {order?.food?.description}
                  </p>

                  <div className="flex justify-between items-center mt-6">
                    <div>
                      <p className="text-sm text-gray-400">Price</p>
                      <p className="text-xl font-bold text-[#FF5A00]">
                        ${order?.food?.price}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-400">Discount</p>
                      <p className="font-semibold text-green-600">
                        {order?.food?.discount || 0}% OFF
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 border-t pt-4">
                    <p className="text-sm text-gray-500">
                      Order ID
                    </p>
                    <p className="font-medium text-[#0F172A] break-all">
                      {order._id}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderPlacedScreen;