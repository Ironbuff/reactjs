import { apiClient } from "@/axios/axiosInstance";
import { FOOD_STORE_GET_ADMIN } from "@/route/signRoute";

export const getAdminOrderList = async () => {
  const response = await apiClient.get(FOOD_STORE_GET_ADMIN.getOrderList);
  return response;
};
