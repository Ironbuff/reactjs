import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { AddHabit } from "../../services/Addhabit";
import { AddhabitSchema } from "../../schema/AddhabitSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const AddnewHabit = () => {
  const navigate = useNavigate();
  const [previewPage, setPreviewPage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(AddhabitSchema),
  });

  const CreateHabit = useMutation({
    mutationKey: ["addhabit"],
    mutationFn: AddHabit,
    onSuccess: (data) => {
      toast.success(data?.data?.message || "Habit added successfully!");
      navigate("/");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Something went wrong!");
    },
  });

  const onSubmit = (data: any) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("image", data.image[0]);
    CreateHabit.mutate(formData);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-indigo-100 via-white to-indigo-200 p-5">
      <div className="w-full max-w-lg bg-white/80 backdrop-blur-xl border border-gray-200 p-10 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.12)] transition-all duration-300">

        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-2 tracking-wide">
          🌱 Add New Habit
        </h2>
        <p className="text-gray-500 text-center text-sm mb-8">
          Set your routine & grow every day
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Title */}
          <div className="group">
            <label className="text-gray-700 font-semibold text-sm block mb-2">Habit Title</label>
            <input
              type="text"
              placeholder="e.g., Drink Water Daily"
              {...register("title")}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-800 shadow-sm 
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
              transition-all group-hover:border-indigo-400"
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
          </div>

          {/* Description */}
          <div className="group">
            <label className="text-gray-700 font-semibold text-sm block mb-2">Description</label>
            <textarea
              placeholder="Write habit details here..."
              {...register("description")}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-800 shadow-sm 
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
              transition-all h-28 resize-none group-hover:border-indigo-400"
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
          </div>

          {/* Image upload */}
          <div>
            <label className="text-gray-700 font-semibold text-sm block mb-2">Image (optional)</label>
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              onChange={(e) => {
                if (e.target.files?.length) {
                  setPreviewPage(URL.createObjectURL(e.target.files[0]));
                }
              }}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-gray-900 cursor-pointer
              focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />

            {errors.image && <p className="text-red-500 text-xs mt-1">{String(errors.image.message)}</p>}

            {/* Preview Box */}
            {previewPage && (
              <div className="mt-4">
                <img
                  src={previewPage}
                  className="w-full h-44 object-cover rounded-xl border shadow-md hover:scale-[1.02] transition-transform"
                />
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-3">
            <button
              type="submit"
              disabled={CreateHabit.isPending}
              className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 
              text-white font-semibold shadow-md flex items-center justify-center gap-2 
              disabled:opacity-50 transition-all duration-300"
            >
              {CreateHabit.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
              {CreateHabit.isPending ? "Creating..." : "Create Habit"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex-1 py-3 rounded-xl bg-gray-500 hover:bg-gray-600 text-white font-semibold 
              shadow-md transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddnewHabit;
