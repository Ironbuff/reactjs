import { apiClient } from "@/axios/axiosInstance";
import { FoodType } from "../add";
import { FOOD_STORE_ACTION } from "@/route/signRoute";

export const editFood = async (data: FoodType) => {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("price", data.price.toString());
  formData.append("discount", data.price.toString());


  if (data.imagepath) {
    formData.append("image", data.imagepath); 
  }

  const response = await apiClient.post(
    FOOD_STORE_ACTION.editFood,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response;
};