"use client";
import { useQuery } from "@tanstack/react-query";
import { getAdminOrderList } from "../services/adminOrder.services.config";

export const useGetOrderListAdmin = () => {
  return useQuery({
    queryKey: ["getOrderList"],
    queryFn: getAdminOrderList,
  });
};
