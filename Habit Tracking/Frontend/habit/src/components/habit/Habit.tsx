import React, { useState } from "react";
import { getHabits } from "../../services/GetHabits";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteHabit, toggleHabit } from "../../services/ChangeHabits";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { Link } from "react-router-dom";
import { CheckCircle, Trash2, Edit3, Loader2 } from "lucide-react";

export interface habitType {
  _id?: string;
  title?: string;
  description?: string;
  user?: string;
  completedDates?: string[];
}

const Habit = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["habit"],
    queryFn: getHabits,
  });

  const userId = localStorage.getItem("id");

  const DeleteMutation = useMutation({
    mutationKey: ["delete"],
    mutationFn: deleteHabit,
    onSuccess: (data) => {
      toast.success(data?.data?.message || "Successful");
      queryClient.invalidateQueries({ queryKey: ["habit"] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error?.response?.data?.message);
    },
  });

  const toggleHabitMutation = useMutation({
    mutationKey: ["toggleHabit"],
    mutationFn: toggleHabit,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["habit"] });
      toast.success(data.data.message || "Habit status updated!");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error?.response?.data?.message || "Could not update habit.");
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
        <p className="ml-2 text-lg font-medium text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500 font-medium">
          Error: {(error as Error).message}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-8 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      <h1 className="text-5xl font-extrabold font-serif text-gray-800 mb-8">
        🌱 My Habits
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {data?.data?.newhabit?.map((habit: habitType) => {
          const today = new Date().toDateString();
          const isCompletedToday = habit.completedDates?.some(
            (dateStr) => new Date(dateStr).toDateString() === today
          );

          return (
            <div
              key={habit._id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 p-6 flex flex-col gap-4 border border-gray-100"
            >
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-bold text-gray-800">
                  {habit?.title}
                </h2>
                {isCompletedToday ? (
                  <span className="px-3 py-1 text-xs text-center font-semibold text-green-800 bg-green-100 rounded-full">
                    Done
                  </span>
                ) : (
                  <span className="px-3 py-1 text-xs font-semibold text-yellow-800 bg-yellow-100 rounded-full">
                    Pending
                  </span>
                )}
              </div>

              <p className="text-gray-600 text-sm leading-relaxed">
                {habit?.description}
              </p>

              {habit?.user === userId && (
                <div className="flex gap-2 mt-auto pt-4">
                  {/* Toggle Button */}
                  <button
                    onClick={() =>
                      toggleHabitMutation.mutate(habit?._id as string)
                    }
                    disabled={toggleHabitMutation.isPending}
                    className={`flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-xl w-full transition-colors duration-300 ${
                      isCompletedToday
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {toggleHabitMutation.isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <CheckCircle className="w-4 h-4" />
                    )}
                    {isCompletedToday ? "Completed" : "Mark as Done"}
                  </button>

                  {/* Edit Button */}
                  <Link
                    to={`/edit/${habit?._id}`}
                    className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 rounded-xl transition-colors duration-300"
                  >
                    <Edit3 className="w-4 h-4" />
                    Edit
                  </Link>

                  {/* Delete Button */}
                  <button
                    onClick={() => DeleteMutation?.mutate(habit?._id as string)}
                    disabled={DeleteMutation.isPending}
                    className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors duration-300"
                  >
                    {DeleteMutation.isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                    Delete
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Floating Add Button */}
      <Link
        to="/add"
        className="fixed bottom-8 right-8 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full p-4 shadow-lg hover:scale-110 transition-transform duration-300"
      >
        <span className="text-2xl font-bold">+</span>
      </Link>
    </div>
  );
};

export default Habit;
