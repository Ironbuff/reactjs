import { useQuery } from "@tanstack/react-query";
import { getUserList } from "../services/permission.service.config";

export const useUserList = () => {
  return useQuery({
    queryKey: ["getUserList"],
    queryFn: () => getUserList(),
  });
};
