import React from "react";
import { getHabits } from "../../services/GetHabits";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteHabit, toggleHabit } from "../../services/ChangeHabits";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { Link } from "react-router-dom";
import {
  CheckCircle,
  Trash2,
  Edit3,
  Loader2,
  Plus,
  NotebookPen,
} from "lucide-react";

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
      toast.success(data?.data?.message || "Habit deleted successfully!");
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
      toast.success(data.data.message || "Habit updated!");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error?.response?.data?.message || "Could not update habit.");
    },
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        <p className="mt-3 text-lg font-semibold text-gray-700">
          Loading habits...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100">
        <p className="text-red-500 font-semibold">
          Error: {(error as Error).message}
        </p>
      </div>
    );
  }

  const habits = data?.data?.newhabit || [];

  return (
    <div className="flex flex-col items-center px-6 py-12 bg-gradient-to-br from-white via-gray-50 to-gray-200 min-h-screen">
      <h1 className="text-3xl md:text-4xl font-extrabold font-serif text-gray-900 mb-12 tracking-tight drop-shadow-sm text-center">
        🌱 My Habits Tracker
      </h1>

      {habits.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <NotebookPen className="w-16 h-16 text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-700">No habits yet!</h2>
          <p className="text-gray-500 mt-2 mb-6 max-w-md">
            Start your journey by adding your first habit. Consistency begins
            with one small step!
          </p>
          <Link
            to="/habit"
            className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-blue-500 text-white px-5 py-3 rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <Plus className="w-5 h-5" /> Add Habit
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl cursor-pointer">
          {habits.map((habit: habitType) => {
            const today = new Date().toDateString();
            const isCompletedToday = habit.completedDates?.some(
              (dateStr) => new Date(dateStr).toDateString() === today
            );

            return (
              <div
                key={habit._id}
                className="relative bg-white/80 backdrop-blur-md rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 p-6 flex flex-col border border-gray-100 group"
              >
                {/* Status Badge */}
                <span
                  className={`absolute top-4 right-4 px-3 py-1 text-xs font-semibold rounded-full shadow-sm ${isCompletedToday
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                    }`}
                >
                  {isCompletedToday ? "Done" : "Pending"}
                </span>

                {/* Title */}
                <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-1">
                  {habit?.title}
                </h2>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mt-1 line-clamp-3">
                  {habit?.description}
                </p>

                {habit?.user === userId && (
                  <div className="flex flex-col sm:flex-row gap-2 mt-5">
                    {/* Toggle Button */}
                    <button
                      onClick={() =>
                        toggleHabitMutation.mutate(habit?._id as string)
                      }
                      disabled={toggleHabitMutation.isPending}
                      className={`flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-xl w-full transition-all duration-300 shadow-md ${isCompletedToday
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "bg-green-600 hover:bg-green-700"
                        }`}
                    >
                      {toggleHabitMutation.isPending ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <CheckCircle className="w-4 h-4" />
                      )}
                      {isCompletedToday ? "Completed" : "Mark Done"}
                    </button>

                    {/* Edit */}
                    <Link
                      to={`/edit/${habit?._id}`}
                      className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-800 bg-yellow-300 hover:bg-yellow-400 rounded-xl transition-all duration-300 shadow-md"
                    >
                      <Edit3 className="w-4 h-4" />
                      Edit
                    </Link>

                    {/* Delete */}
                    <button
                      onClick={() =>
                        DeleteMutation.mutate(habit?._id as string)
                      }
                      disabled={DeleteMutation.isPending}
                      className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-xl transition-all duration-300 shadow-md"
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
      )}

      {userId && (
        <Link
          to="/habit"
          className="fixed bottom-8 right-8 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full p-4 shadow-xl hover:scale-110 hover:shadow-2xl transition-all duration-300"
        >
          <Plus className="w-6 h-6" />
        </Link>
      )}
    </div>
  );
};

export default Habit;
