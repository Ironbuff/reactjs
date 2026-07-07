import { apiClient } from "@/axios/axiosInstance";
import { FOOD_STORE_GET_ADMIN } from "@/route/signRoute";
import { ChangeOrderStatusPayload } from "../types/adminOrder.type";

export const getAdminOrderList = async () => {
  const response = await apiClient.get(FOOD_STORE_GET_ADMIN.getOrderList);
  return response;
};

export const changeOrderStatus = async ({
  orderId,
  status,
}: ChangeOrderStatusPayload) => {
  const url = FOOD_STORE_GET_ADMIN.updateOrder.replace(":orderId", orderId);

  const response = await apiClient.put(url, {
    status,
  });

  return response;
};
