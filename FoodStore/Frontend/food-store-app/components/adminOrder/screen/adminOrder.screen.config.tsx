"use client";

import React from "react";
import {
  useGetOrderListAdmin,
  useOrderStatusChange,
} from "../actions/adminOrder.action.config";
import { BASE_URL } from "@/axios/axiosInstance";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

const AdminOrderList = () => {
  const {
    data: adminOrder,
    isLoading: isAdminOrderListLoading,
    refetch,
  } = useGetOrderListAdmin();

  const { mutate: changeStatus, isPending } = useOrderStatusChange();

  const orders = adminOrder?.data?.order || [];

  const getImageUrl = (image?: string) => {
    if (!image) {
      return `${BASE_URL}/public/dummy.jpg`;
    }

    const fixedPath = image.replace(/\\/g, "/");

    return `${BASE_URL}/${fixedPath}`;
  };

  const getProgressStep = (status?: string) => {
    if (status === "Order Placed") return 1;
    if (status === "Preparing") return 2;
    if (status === "Served") return 3;

    return 1;
  };

  const handleStatusChange = (orderId: string, status: string) => {
    changeStatus(
      {
        orderId,
        status,
      },
      {
        onSuccess: (data) => {
          console.log(data);

          if (data?.data?.message) {
            toast.success(
              data?.data?.message || "Order changed successfully"
            );
          }

          refetch();
        },
        onError: (error: any) => {
          console.log(
            error?.response?.data?.message || "Something went wrong"
          );
        },
      }
    );
  };

  if (isAdminOrderListLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F5F1EB]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-orange-200 border-t-orange-500" />

          <p className="text-lg font-semibold text-[#0F172A]">
            Loading Admin Orders...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F1EB] px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-orange-500">
              Order Management
            </p>

            <h1 className="text-4xl font-bold text-[#0F172A]">
              Admin Orders
            </h1>

            <p className="mt-2 text-gray-500">
              View and manage all customer food orders
            </p>
          </div>

          <div className="w-fit rounded-2xl border border-orange-100 bg-white px-6 py-4 shadow-sm">
            <p className="text-sm text-gray-500">Total Orders</p>

            <p className="mt-1 text-3xl font-bold text-orange-500">
              {orders.length}
            </p>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-3xl border border-orange-100 bg-white p-12 text-center shadow-md">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-50 text-4xl">
              🍽️
            </div>

            <h2 className="mt-5 text-2xl font-semibold text-[#0F172A]">
              No Orders Found
            </h2>

            <p className="mt-2 text-gray-500">
              No customer orders are available right now.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {orders.map((order) => {
              const food = order?.food;
              const user = order?.user;
              const progressStep = getProgressStep(order?.status);

              const isOrderPlaced = progressStep === 1;
              const isPreparing = progressStep === 2;
              const isDelivered = progressStep === 3;

              return (
                <div
                  key={order?._id}
                  className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={getImageUrl(food?.image)}
                      alt={food?.title || "Food Image"}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                    <div className="absolute left-4 top-4">
                      <span className="rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-[#0F172A] shadow-md backdrop-blur-sm">
                        Order #{order?._id?.slice(-6)}
                      </span>
                    </div>

                    <div className="absolute right-4 top-4">
                      <span className="rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-lg">
                        {order?.status || "Order Placed"}
                      </span>
                    </div>

                    <div className="absolute bottom-5 left-5 right-5">
                      <h2 className="text-3xl font-bold text-white">
                        {food?.title || "Food Not Available"}
                      </h2>

                      <p className="mt-1 line-clamp-1 text-sm text-white/80">
                        {food?.description || "No description available"}
                      </p>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="line-clamp-2 leading-6 text-gray-500">
                      {food?.description || "No description available"}
                    </p>

                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <div className="rounded-2xl border border-orange-100 bg-orange-50 p-4">
                        <p className="text-sm text-gray-500">Price</p>

                        <p className="mt-1 text-2xl font-bold text-orange-600">
                          ${food?.price ?? 0}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-green-100 bg-green-50 p-4">
                        <p className="text-sm text-gray-500">Discount</p>

                        <p className="mt-1 text-2xl font-bold text-green-600">
                          {food?.discount ?? 0}%
                        </p>
                      </div>
                    </div>

                    <div className="mt-8 rounded-2xl border border-orange-100 bg-orange-50/40 p-5">
                      <div className="flex items-center">
                        <div
                          className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                            progressStep >= 1
                              ? "bg-orange-500 text-white"
                              : "bg-gray-200 text-gray-500"
                          }`}
                        >
                          1
                        </div>

                        <div
                          className={`h-1 flex-1 ${
                            progressStep >= 2
                              ? "bg-orange-500"
                              : "bg-gray-200"
                          }`}
                        />

                        <div
                          className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                            progressStep >= 2
                              ? "bg-orange-500 text-white"
                              : "bg-gray-200 text-gray-500"
                          }`}
                        >
                          2
                        </div>

                        <div
                          className={`h-1 flex-1 ${
                            progressStep >= 3
                              ? "bg-orange-500"
                              : "bg-gray-200"
                          }`}
                        />

                        <div
                          className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                            progressStep >= 3
                              ? "bg-orange-500 text-white"
                              : "bg-gray-200 text-gray-500"
                          }`}
                        >
                          3
                        </div>
                      </div>

                      <div className="mt-3 flex justify-between text-xs font-medium text-gray-500">
                        <span>Placed</span>
                        <span>Preparing</span>
                        <span>Delivered</span>
                      </div>
                    </div>

                    <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-5">
                      <span className="text-gray-500">Current Status</span>

                      <span className="rounded-full bg-orange-100 px-4 py-1.5 text-sm font-semibold text-orange-700">
                        {order?.status || "Order Placed"}
                      </span>
                    </div>

                    <div className="mt-5 overflow-hidden rounded-2xl border border-gray-100">
                      <div className="flex justify-between gap-4 border-b border-gray-100 px-4 py-3">
                        <span className="text-sm text-gray-500">Order ID</span>

                        <span className="text-sm font-semibold text-gray-700">
                          #{order?._id?.slice(-6)}
                        </span>
                      </div>

                      <div className="flex justify-between gap-4 border-b border-gray-100 px-4 py-3">
                        <span className="text-sm text-gray-500">Customer</span>

                        <span className="text-sm font-semibold text-gray-700">
                          {user?.username || "Unknown User"}
                        </span>
                      </div>

                      <div className="flex justify-between gap-4 border-b border-gray-100 px-4 py-3">
                        <span className="text-sm text-gray-500">Email</span>

                        <span className="max-w-[180px] truncate text-sm font-semibold text-gray-700">
                          {user?.email || "No email"}
                        </span>
                      </div>

                      <div className="flex justify-between gap-4 px-4 py-3">
                        <span className="text-sm text-gray-500">User Role</span>

                        <span className="text-sm font-semibold capitalize text-gray-700">
                          {user?.role || "N/A"}
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <Button
                        disabled={
                          isDelivered || isPreparing || isPending
                        }
                        className="h-12 rounded-full bg-orange-500 font-semibold text-white transition hover:bg-orange-600 disabled:bg-orange-200 disabled:text-white"
                        onClick={() => {
                          handleStatusChange(order._id, "Preparing");
                        }}
                      >
                        Preparing
                      </Button>

                      <Button
                        disabled={
                          isOrderPlaced || isDelivered || isPending
                        }
                        onClick={() =>
                          handleStatusChange(order._id, "Served")
                        }
                        className="h-12 rounded-full bg-green-500 font-semibold text-white transition hover:bg-green-600 disabled:bg-green-200 disabled:text-white"
                      >
                        Delivered
                      </Button>
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

export default AdminOrderList;