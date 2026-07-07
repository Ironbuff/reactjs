"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  changeOrderStatus,
  getAdminOrderList,
} from "../services/adminOrder.services.config";

export const useGetOrderListAdmin = () => {
  return useQuery({
    queryKey: ["getOrderList"],
    queryFn: getAdminOrderList,
  });
};

export const useOrderStatusChange = () => {
  return useMutation({
    mutationFn: changeOrderStatus,
  });
};
