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
 <div className="min-h-screen bg-gradient-to-br from-indigo-500/10 via-white to-indigo-300/30 flex justify-center items-center p-6">

    <div className="w-full max-w-xl bg-white/70 backdrop-blur-2xl border border-white/40 rounded-3xl shadow-xl p-10 
    hover:shadow-2xl transition duration-500">

      {/* Title */}
      <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-2 tracking-tight drop-shadow-sm">
        🌿 New Habit
      </h2>
      <p className="text-gray-600 text-center mb-8 text-sm">
        Build discipline — one habit at a time
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">

        {/* Title Input */}
        <div>
          <label className="font-semibold text-gray-700 text-sm mb-2 block">Habit Title</label>
          <input
            type="text"
            {...register("title")}
            placeholder="e.g., Morning Meditation"
            className="w-full px-4 py-3 rounded-2xl border border-gray-300 bg-white/60
            text-gray-800 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
            transition-all duration-200 outline-none"
          />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="font-semibold text-gray-700 text-sm mb-2 block">Description</label>
          <textarea
            {...register("description")}
            placeholder="Why is this habit important for you?"
            className="w-full px-4 py-3 rounded-2xl border border-gray-300 bg-white/60 text-gray-800 
            h-32 resize-none shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
        </div>

        {/* Image Upload */}
        <div>
          <label className="font-semibold text-gray-700 text-sm mb-2 block">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            {...register("image")}
            onChange={(e) => {
              if (e.target.files?.length) setPreviewPage(URL.createObjectURL(e.target.files[0]));
            }}
            className="w-full p-2.5 rounded-xl border border-gray-300 bg-white/60 cursor-pointer 
            focus:ring-2 focus:ring-indigo-400 transition"
          />
          {errors.image && <p className="text-red-500 text-xs mt-1">{String(errors.image.message)}</p>}

          {previewPage && (
            <div className="mt-5 rounded-2xl overflow-hidden border shadow-lg hover:scale-[1.02] 
            transition-transform duration-300">
              <img src={previewPage} className="w-full h-48 object-cover" />
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-3">
          <button
            type="submit"
            disabled={CreateHabit.isPending}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 
            hover:from-indigo-700 hover:to-indigo-600 text-white font-semibold shadow-md
            flex items-center justify-center gap-2 transition duration-300 disabled:opacity-50"
          >
            {CreateHabit.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
            {CreateHabit.isPending ? "Creating..." : "Create"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex-1 py-3 rounded-xl bg-gray-500 hover:bg-gray-600 text-white font-semibold shadow-md 
            transition duration-300"
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
