import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getFoodById,
  placeFoodOrder,
} from "../service/foodById.service.config";

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
  });
};
