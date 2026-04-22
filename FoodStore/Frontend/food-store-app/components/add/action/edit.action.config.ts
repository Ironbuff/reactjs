import { useMutation, useQuery } from "@tanstack/react-query";
import { FoodType } from "../add";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { editFood } from "../service/edit.service.config";
import { getFoodById } from "@/components/foodDetail/service/foodById.service.config";
import { useRouter } from "next/navigation";

export const useEditFood = (id: string | string[]) => {
  const router = useRouter();
  return useMutation({
    mutationKey: ["edit-food", id],
    mutationFn: (data: FoodType) => editFood(data, id),
    onSuccess: (data) => {
      toast.success(data?.data?.message || "Food added sucessfully");
      router.push("/");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage =
        error?.response?.data?.message || "Failed to Add Food";
      toast.error(errorMessage);
    },
  });
};
