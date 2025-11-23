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
      const errorMessage =
        err?.response?.data?.message || "Something went wrong!";
      toast.error(errorMessage);
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
    <div className="flex justify-center items-center min-h-[80vh] bg-gradient-to-br from-indigo-50 via-white to-indigo-100 p-4">
      <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-lg border border-gray-100 transition-all hover:shadow-xl">
        <h2 className="text-3xl font-semibold text-gray-800 mb-2 text-center">
          Create a New Habit
        </h2>
        <p className="text-gray-500 text-sm mb-6 text-center">
          Build consistency by tracking your daily routines
        </p>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="e.g., Morning Run"
              {...register("title")}
              className="w-full px-4 py-2.5 border border-gray-300 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-500">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              placeholder="Describe your habit..."
              {...register("description")}
              className="w-full px-4 py-2.5 border border-gray-300 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition resize-none h-24"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Image */}
          <div>
            <label
              htmlFor="image"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Upload Image
            </label>

            <input
              type="file"
              id="image"
              accept="image/*"
              {...register("image")}
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  const file = e.target.files[0];
                  setPreviewPage(URL.createObjectURL(file));
                }
              }}
              className="w-full px-4 py-2.5 border border-gray-300 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />

            {errors.image && (
              <p className="mt-1 text-sm text-red-500">
                {String(errors.image.message)}
              </p>
            )}

            {/* Preview Image */}
            {previewPage && (
              <div className="mt-4">
                <img
                  src={previewPage}
                  alt="Preview"
                  className="w-full h-40 object-cover rounded-xl border border-gray-300 shadow-sm"
                />
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-x-3 pt-2">
            <button
              type="submit"
              disabled={CreateHabit.isPending}
              className="w-full py-2.5 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 disabled:opacity-50"
            >
              {CreateHabit.isPending && (
                <Loader2 className="w-4 h-4 animate-spin" />
              )}
              {CreateHabit.isPending ? "Creating..." : "Create Habit"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="w-full py-2.5 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-300"
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
