import { apiClient } from "@/axios/axiosInstance";
import { FoodType } from "../add";
import { FOOD_STORE_ACTION } from "@/route/signRoute";

export const addFood = async (data: FoodType) => {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("price", data.price.toString());

  // optional
  formData.append("discount", "0");

  // 🔥 THIS IS THE KEY FIX
  if (data.imagepath) {
    formData.append("image", data.imagepath); // must match multer field
  }

  const response = await apiClient.post(
    FOOD_STORE_ACTION.addFood,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response;
};