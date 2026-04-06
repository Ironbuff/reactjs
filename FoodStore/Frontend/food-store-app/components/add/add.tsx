"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
import { useParams } from "next/navigation";
import { useGetFoodById } from "../foodDetail/actions/foodById.action.config";
import { useEditFood } from "./action/edit.action.config";
import { BASE_URL } from "@/axios/axiosInstance";

const foodSchema = z.object({
  title: z.string().min(1, "Title is Required"),
  description: z.string().min(1, "Description is Required"),
  price: z.number().min(1, "Price must be greater than 0"),
  imagepath: z.instanceof(File, { message: "Image is required" }),
  discount: z.number().optional(),
});

export type FoodType = z.infer<typeof foodSchema>;
export type Mode = 'Edit' | 'Add';

const AddScreen = ({ mode}: AddScreenProps) => {
  const [preview,setPreview] = useState('')
  const params = useParams()
  const form = useForm({
    resolver: zodResolver(foodSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      discount:0,
    },
  });

  const id = params?.add_id ?? ''

   const imageFile = form.watch("imagepath");
   
   const {mutate,isPending}= useAddFood()
   const {mutate:editFoodMutate, isPending:editFoodPending}= useEditFood()

   const {data:foodDataById,isLoading:isFoodDataLoading}= useGetFoodById(id)

  const foodDetails = foodDataById?.data?.food



  useEffect(()=>{
    if(mode==='Edit'){
      form.setValue('title',foodDetails?.title);
      form.setValue('description',foodDetails?.description);
      form.setValue('imagepath', foodDetails?.image);
      form.setValue('discount', foodDetails?.discount)
    }

  },[id, foodDataById])

    useEffect(() => {
      if(mode==='Add'){
    if (imageFile) {
      const objectUrl = URL.createObjectURL(imageFile);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }
  else return;
  }, [imageFile]);


  const onSubmit = (data: FoodType) => {
  
    if (mode==='Edit'){
      editFoodMutate?.(data)
    }
    else{
    mutate(data)
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 border p-4 rounded-md shadow-md border-gray-200 max-h-[80vh]">
      <h2 className="text-2xl font-semibold mb-6">Add Food</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Food Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter food title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Food description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Price */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Price" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Discount */}
          <FormField
          control={form.control}
          name="discount"
          render={({field})=>(
            <FormItem>
              <FormLabel>
                Discount
              </FormLabel>
              <FormControl>
              <Input type="number" placeholder="Enter Discount Amount" {...field} onChange={(e)=>field.onChange(Number(e.target.value))}/>
              </FormControl>
            </FormItem>
          )}
          />

          {/* Image Path */}
          <FormField
            control={form.control}
            name="imagepath"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Food Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => field.onChange(e.target.files?.[0])}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          {/* Image Preview */}
          {preview || !!form?.watch('imagepath') && (
            <div className="mt-4">
              <p className="mb-2 text-sm font-medium">Image Preview:</p>
              <img
                src={preview|| `${BASE_URL}/${foodDetails?.image}`}
                alt="Preview"
                className="w-full h-28 object-fill rounded-lg border"
              />
            </div>
          )}


          <Button type="submit" className="w-full">
            Add Food
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddScreen;
