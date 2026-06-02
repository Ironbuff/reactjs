import { apiClient } from "@/axios/axiosInstance";
import { ORDER_FOOD_URL } from "@/route/signRoute";

export const getOrderList = async () => {
  const res = await apiClient.get(ORDER_FOOD_URL.getAllOrder);
  return res;
};
