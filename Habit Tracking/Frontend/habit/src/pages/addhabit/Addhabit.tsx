import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import axios from 'axios';
import {AddHabit}  from '../../services/Addhabit';
import { AddhabitSchema } from '../../schema/AddhabitSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { error } from 'console';
import { toast } from 'react-toastify';






const AddnewHabit = () => {
  const queryClient = useQueryClient();
  

 const {
    register,
     handleSubmit,
     formState: { errors },
   } = useForm({
     resolver: zodResolver(AddhabitSchema),
   });

  const CreateHabit = useMutation({
    mutationKey:['addhabit'],
    mutationFn:AddHabit,
    onSuccess:(data)=>{
       toast.success(data?.data?.message || "Habit added successfully!")
    },
    onError:(err:any)=>{
         const errorMessage = err?.response?.data?.message || "Something went wrong!";
        toast.error(errorMessage);
    }
  })
  
  const onSubmit = (data)=>{
    CreateHabit.mutateAsync(data)
  }


  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-lg mx-auto mt-8 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Create a New Habit</h2>
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {/*Title */}
          <div>
            <label
              htmlFor="Title"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="Enter Title of Habit"
              {...register("title")}
              className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.title&& (
              <p className="mt-1 text-sm text-red-500">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="Description"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              placeholder="Enter your password"
              {...register("description")}
              className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={CreateHabit.isPending} 
            className="w-full py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 disabled:opacity-50"
          >
           Create Habit
          </button>
        </form>
    </div>
  );
};

export default AddnewHabit;

