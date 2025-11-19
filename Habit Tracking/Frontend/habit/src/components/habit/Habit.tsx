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
  CircleCheck,
} from "lucide-react";

export interface habitType {
  _id?: string;
  title?: string;
  description?: string;
  user?: string;
  completedDates?: string[];
  image:string;
}


interface HabitCardProps {
  habit: habitType;
  userId: string | null;
}

const HabitCard: React.FC<HabitCardProps> = ({ habit, userId }) => {
  const queryClient = useQueryClient();

  const today = new Date().toDateString();
  const isCompletedToday = habit.completedDates?.some(
    (dateStr) => new Date(dateStr).toDateString() === today
  );

  const toggleHabitMutation = useMutation({
    mutationKey: ["toggleHabit", habit._id],
    mutationFn: () => toggleHabit(habit._id as string),
    

    onMutate: async () => {

      await queryClient.cancelQueries({ queryKey: ["habit"] });


      const previousHabits = queryClient.getQueryData<any>(["habit"]);

      queryClient.setQueryData(["habit"], (oldData: any) => {
        const oldHabits = oldData?.data?.newhabit || [];
        const newHabits = oldHabits.map((h: habitType) => {
          if (h._id === habit._id) {

            return {
              ...h,
              completedDates: [...(h.completedDates || []), new Date().toISOString()],
            };
          }
          return h;
        });
        return { ...oldData, data: { ...oldData.data, newhabit: newHabits } };
      });


      return { previousHabits };
    },
    

    onSuccess: (data) => {
      toast.success(data.data.message || "Habit updated!");
    },


    onError: (
      error: AxiosError<{ message: string }>,
      variables,
      context
    ) => {
      toast.error(error?.response?.data?.message || "Could not update habit.");
      if (context?.previousHabits) {
        queryClient.setQueryData(["habit"], context.previousHabits);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["habit"] });
    },
  });


  const deleteMutation = useMutation({
    mutationKey: ["delete", habit._id],
    mutationFn: () => deleteHabit(habit._id as string),

    onMutate: async () => {

      if (!window.confirm(`Are you sure you want to delete "${habit.title}"?`)) {

        throw new Error("Delete cancelled by user");
      }

      await queryClient.cancelQueries({ queryKey: ["habit"] });
      const previousHabits = queryClient.getQueryData<any>(["habit"]);

      queryClient.setQueryData(["habit"], (oldData: any) => {
        const oldHabits = oldData?.data?.newhabit || [];
        const newHabits = oldHabits.filter((h: habitType) => h._id !== habit._id);
        return { ...oldData, data: { ...oldData.data, newhabit: newHabits } };
      });

      return { previousHabits };
    },

    onSuccess: (data) => {
      toast.success(data?.data?.message || "Habit deleted successfully!");
    },

    onError: (error: AxiosError<any>, variables, context) => {
      if (error.message === "Delete cancelled by user") {
        return;
      }
      

      const errorMessage =
        error?.response?.data?.message || "An unexpected error occurred.";
      toast.error(errorMessage);

      // Rollback
      if (context?.previousHabits) {
        queryClient.setQueryData(["habit"], context.previousHabits);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["habit"] });
    },
  });


  const baseButtonClass = "flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-xl w-full sm:w-auto transition-all duration-300 shadow-md";
  const editButtonClass = `${baseButtonClass} text-gray-800 bg-yellow-300 hover:bg-yellow-400`;
  const deleteButtonClass = `${baseButtonClass} text-white bg-red-600 hover:bg-red-700 disabled:opacity-50`;
  

  const toggleButtonClass = `${baseButtonClass} ${
    isCompletedToday
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-green-600 hover:bg-green-700"
  } disabled:opacity-50`;

  return (
    <div className="relative bg-white/80 backdrop-blur-md rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 p-6 flex flex-col border border-gray-100 group">
      <span
        className={`absolute top-4 right-4 px-3 py-1 text-xs font-semibold rounded-full shadow-sm ${
          isCompletedToday
            ? "bg-green-100 text-green-700"
            : "bg-yellow-100 text-yellow-700"
        }`}
      >
        {isCompletedToday ? "Done" : "Pending"}
      </span>

       <img
                src={`http://localhost:8081/${habit.image}`}
                alt={habit?.title}
                className="w-full h-[25ch] object-cover rounded-t-2xl"
              />

      <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-1 pr-16">
        {habit?.title}
      </h2>

      <p className="text-gray-600 text-sm leading-relaxed mt-1 line-clamp-3 min-h-[60px]">
        {habit?.description}
      </p>

      {habit?.user === userId && (
        <div className="flex flex-col sm:flex-row gap-2 mt-5">
          <button
            onClick={() => toggleHabitMutation.mutate()}
            // Disable if completed OR if a mutation is already in progress
            disabled={isCompletedToday || toggleHabitMutation.isPending}
            title={isCompletedToday ? "Already completed today" : "Mark as done"}
            className={toggleButtonClass}
          >
            {toggleHabitMutation.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : isCompletedToday ? (
              <>
                <CircleCheck className="w-4 h-4" />
                <span>Completed</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>Mark as Done</span>
              </>
            )}
          </button>

          {/* Edit */}
          <Link to={`/edit/${habit?._id}`} className={editButtonClass}>
            <Edit3 className="w-4 h-4" />
            Edit
          </Link>

          {/* Delete */}
          <button
            onClick={() => deleteMutation.mutate()}
            disabled={deleteMutation.isPending}
            className={deleteButtonClass}
          >
            {deleteMutation.isPending ? (
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
};


const Habit = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["habit"],
    queryFn: getHabits,
  });

  const userId = localStorage.getItem("id");


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
          <h2 className="text-xl font-semibold text-gray-700">
            No habits yet!
          </h2>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
          {habits.map((habit: habitType) => (
            <HabitCard key={habit._id} habit={habit} userId={userId} />
          ))}
        </div>
      )}

      {userId && (
        <Link
          to="/habit"
          aria-label="Add new habit"
          className="fixed bottom-8 right-8 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full p-4 shadow-xl hover:scale-110 hover:shadow-2xl transition-all duration-300"
        >
          <Plus className="w-6 h-6" />
        </Link>
      )}
    </div>
  );
};

export default Habit;