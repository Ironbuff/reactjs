import React from "react";
import { getHabits } from "../../services/GetHabits";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteHabit } from "../../services/ChangeHabits";
import { toast } from "react-toastify";
import { AxiosError } from "axios";


interface habitType{
   _id?: string;
  title?:string;
  description?:string;
  user?:string;
}

const Habit = () => {
  
  const queryClient = useQueryClient()
  
  const { data, isLoading, error } = useQuery({
    queryKey: ["habit"],
    queryFn: getHabits,
  });

  const userId = localStorage.getItem("id");

  const DeleteMutation = useMutation({
    mutationKey: ["delete"],
    mutationFn: deleteHabit,
    onSuccess: (data) => {
      toast.success(data?.data?.message || "Sucessful");
      queryClient.invalidateQueries({queryKey:["habit"]});
    },
    onError: (error:AxiosError<{message:string}>) => {
      toast.error(error?.response?.data?.message);
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold text-gray-600 animate-pulse">
          Loading...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500 font-medium">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-extrabold font-serif text-gray-800 mb-6">
        🌱 Habits
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {data?.data?.newhabit?.map((habit:habitType, idx:number) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-5 flex flex-col gap-3 border border-gray-100"
          >
            <h2 className="text-2xl font-semibold text-gray-800">
              {habit?.title}
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              {habit?.description}
            </p>
            <div className="flex flex-row gap-x-2 items-center justify-center">
              <button className="mt-auto self-start px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-xl hover:bg-green-700 transition-colors duration-300">
                Track Habit
              </button>
              {habit?.user === userId &&
              (
                 <button
                type="button"
                onClick={() => DeleteMutation?.mutate(habit?._id)}
                className="mt-auto self-start px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-xl hover:bg-green-700 transition-colors duration-300"
              >
                Delete Habit
              </button>
              )}
             
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Habit;
