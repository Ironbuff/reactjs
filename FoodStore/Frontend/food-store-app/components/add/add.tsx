"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useParams, useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { useAddFood } from "./action/add.action.config";
import { AddScreenProps } from "./interface/FoodInterface.config";
import { useGetFoodById } from "../foodDetail/actions/foodById.action.config";
import { useEditFood } from "./action/edit.action.config";
import { BASE_URL } from "@/axios/axiosInstance";

const foodSchema = z.object({
  title: z.string().min(1, "Title is Required"),
  description: z.string().min(1, "Description is Required"),
  price: z.number().min(1, "Price must be greater than 0"),
  imagepath: z.any().optional(),
  discount: z.number().optional(),
});

export type FoodType = z.infer<typeof foodSchema>;

const AddScreen = ({ mode }: AddScreenProps) => {
  const [preview, setPreview] = useState("");
  const params = useParams();
  const id = params?.add_id ?? "";

  const form = useForm<FoodType>({
    resolver: zodResolver(foodSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      discount: 0,
      imagepath: undefined,
    },
  });

  const imageFile = form.watch("imagepath");

  const { mutate, isPending } = useAddFood();
  const { mutate: editFoodMutate, isPending: editFoodPending } = useEditFood(id);
  const { data: foodDataById } = useGetFoodById(id);

  const foodDetails = foodDataById?.data?.food;

  useEffect(() => {
    if (mode === "Edit" && foodDetails) {
      form.setValue("title", foodDetails.title || "");
      form.setValue("description", foodDetails.description || "");
      form.setValue("price", foodDetails.price || 0);
      form.setValue("discount", foodDetails.discount || 0);

      const oldImage = foodDetails.image?.replace(/\\/g, "/");
      setPreview(oldImage ? `${BASE_URL}/${oldImage}` : "");
    }
  }, [mode, foodDetails, form]);

  useEffect(() => {
    if (imageFile instanceof File) {
      const objectUrl = URL.createObjectURL(imageFile);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [imageFile]);

  const onSubmit = (data: FoodType) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("price", String(data.price));
    formData.append("discount", String(data.discount || 0));

    if (data.imagepath instanceof File) {
      formData.append("image", data.imagepath);
    }

    if (mode === "Edit") {
      formData.append("id", String(id));
      editFoodMutate(data);
    } else {
      mutate(data);
    }
  };

  const loading = isPending || editFoodPending;

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="mx-auto max-w-6xl rounded-2xl bg-white shadow-xl border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left Side Form */}
          <div className="p-6 md:p-8">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-900">
                {mode === "Edit" ? "Edit Food" : "Add Food"}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {mode === "Edit"
                  ? "Update food details and replace the image if needed."
                  : "Fill in the details to add a new food item."}
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Food Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter food title"
                          className="h-11 rounded-xl"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Food description"
                          className="min-h-[120px] rounded-xl"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter price"
                            className="h-11 rounded-xl"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="discount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Discount (%)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter discount"
                            className="h-11 rounded-xl"
                            {...field}
                            value={field.value ?? 0}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="imagepath"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {mode === "Edit" ? "Change Food Image" : "Food Image"}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          className="h-11 rounded-xl cursor-pointer"
                          onChange={(e) => field.onChange(e.target.files?.[0])}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 rounded-xl text-base font-semibold"
                >
                  {loading
                    ? mode === "Edit"
                      ? "Updating..."
                      : "Adding..."
                    : mode === "Edit"
                      ? "Update Food"
                      : "Add Food"}
                </Button>
              </form>
            </Form>
          </div>

          {/* Right Side Preview */}
          <div className="bg-gray-50 border-l border-gray-200 p-6 md:p-8 flex flex-col justify-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Live Preview
            </h3>

            <div className="rounded-2xl overflow-hidden border bg-white shadow-sm">
              <div className="h-[280px] bg-gray-200">
                {preview ? (
                  <img
                    src={preview}
                    alt="Food Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                    No image selected
                  </div>
                )}
              </div>

              <div className="p-5 space-y-2">
                <h4 className="text-2xl font-bold text-gray-900">
                  {form.watch("title") || "Food Title"}
                </h4>

                <p className="text-gray-600 min-h-[48px]">
                  {form.watch("description") ||
                    "Food description will appear here."}
                </p>

                <div className="flex items-center gap-3 pt-2">
                  {(form.watch("discount") || 0) > 0 ? (
                    <>
                      <span className="text-gray-400 line-through text-lg">
                        Rs. {form.watch("price") || 0}
                      </span>
                      <span className="text-2xl font-semibold text-green-600">
                        Rs.{" "}
                        {(
                          (form.watch("price") || 0) -
                          ((form.watch("price") || 0) *
                            (form.watch("discount") || 0)) /
                            100
                        ).toFixed(2)}
                      </span>
                      <span className="bg-red-100 text-red-500 text-sm px-2 py-1 rounded-full">
                        {form.watch("discount") || 0}% OFF
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl font-semibold text-gray-800">
                      Rs. {form.watch("price") || 0}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {mode === "Edit" && (
              <p className="text-sm text-gray-500 mt-4">
                Select a new image only if you want to replace the old one.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddScreen;
