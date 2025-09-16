import React, { useState } from "react";
import { getHabits } from "../../services/GetHabits";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteHabit, toggleHabit } from "../../services/ChangeHabits";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import HabitEdit from "../habitEdit/HabitEdit";

interface habitType {
  _id?: string;
  title?: string;
  description?: string;
  user?: string;
  completedDates?: string[];
}

const Habit = () => {
  const queryClient = useQueryClient();
  const [editHabit, setEditHabit] = useState<habitType | null>(null); 

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
        <p className="text-lg font-semibold text-gray-600 animate-pulse">
          Loading...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500 font-medium">Error: {(error as Error).message}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold font-serif text-gray-800 mb-6">
        🌱 Habits
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {data?.data?.newhabit?.map((habit: habitType) => {
          const today = new Date().toDateString();
          const isCompletedToday = habit.completedDates?.some(
            (dateStr) => new Date(dateStr).toDateString() === today
          );

          return (
            <div
              key={habit._id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-5 flex flex-col gap-3 border border-gray-100"
            >
              <h2 className="text-2xl font-semibold text-gray-800">
                {habit?.title}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                {habit?.description}
              </p>
              <div className="flex flex-row gap-x-2 items-center justify-start mt-auto pt-3">
                {habit?.user === userId && (
                  <button
                    onClick={() =>
                      toggleHabitMutation.mutate(habit?._id as string)
                    }
                    disabled={toggleHabitMutation.isPending}
                    className={`px-4 py-2 text-sm font-medium text-white rounded-xl transition-colors duration-300 w-32 text-center ${
                      isCompletedToday
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {toggleHabitMutation.isPending
                      ? "Updating..."
                      : isCompletedToday
                      ? "✅ Completed"
                      : "Mark as Done"}
                  </button>
                )}

                {habit?.user === userId && (
                  <button
                    type="button"
                    onClick={() =>
                      DeleteMutation?.mutate(habit?._id as string)
                    }
                    disabled={DeleteMutation.isPending}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-xl hover:bg-red-700 transition-colors duration-300"
                  >
                    Delete
                  </button>
                )}

                {habit?.user === userId && (
                  <button
                    type="button"
                    onClick={() => setEditHabit(habit)} 
                    className="px-4 py-2 text-sm font-medium text-white bg-yellow-600 rounded-xl hover:bg-yellow-700 transition-colors duration-300"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>


      {editHabit && (
        <HabitEdit
          id={editHabit._id}
          habitData={editHabit}
          onClose={() => setEditHabit(null)}
        />
      )}
    </div>
  );
};

export default Habit;
