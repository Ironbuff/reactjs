import { useQuery } from "@tanstack/react-query";
import { getOrderList } from "../service/order-placed-service";

export const useGetAllOrder = () => {
  return useQuery({
    queryKey: ["getAllOrder"],
    queryFn: getOrderList,
  });
};
