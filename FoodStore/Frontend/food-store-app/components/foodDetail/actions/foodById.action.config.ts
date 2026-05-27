import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getFoodById,
  placeFoodOrder,
} from "../service/foodById.service.config";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

type ErrorResponse = {
  message: string;
};

export const useGetFoodById = (id: string | string[]) => {
  return useQuery({
    queryKey: ["foodDetail", id],
    queryFn: () => getFoodById(id),
    enabled: !!id,
  });
};

export const useFoodOrderPlaced = () => {
  return useMutation({
    mutationKey: ["PlaceOrder"],
    mutationFn: (order: string) => placeFoodOrder(order),
    onSuccess: (data) => {
      const sucessMessage = data?.data?.message || "Order Placed";
      toast.success(sucessMessage);
    },
    onError: (err: AxiosError<ErrorResponse>) => {
      const message =
        err?.response?.data?.message || ("Error in Order" as string);
      if (message) {
        toast.error(message);
      }
    },
  });
};
