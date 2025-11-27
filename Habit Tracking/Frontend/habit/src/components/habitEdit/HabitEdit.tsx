import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { edithabit } from "../../services/ChangeHabits";
import { useNavigate, useParams } from "react-router-dom";
import { getHabits } from "../../services/GetHabits";
import { habitType } from "../habit/Habit";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const HabitEdit: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    completedDates: [] as string[],
    image: "",
  });

  const { data: habits } = useQuery({
    queryKey: ["habit"],
    queryFn: getHabits,
  });

  useEffect(() => {
    if (habits && id) {
      const habitData = habits?.data?.newhabit?.find(
        (item: habitType) => item._id === id
      );

      if (habitData) {
        setFormValues({
          title: habitData.title || "",
          description: habitData.description || "",
          completedDates: habitData.completedDates || [],
          image: habitData.image || "",
        });

        if (habitData.image) setPreviewImage(habitData.image);
      }
    }
  }, [habits, id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const EditHabitMutation = useMutation({
    mutationKey: ["editData"],
    mutationFn: edithabit,
    onSuccess: (res) => {
      toast.success(res?.data?.message);
      navigate("/");
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err?.response?.data?.message || "Something Went Wrong");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", formValues.title);
    formData.append("description", formValues.description);
    if (imageFile) formData.append("image", imageFile);
    EditHabitMutation.mutateAsync({ id, data: formData });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-50 via-white to-gray-100 p-5">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-10 border border-gray-200 hover:shadow-[0_8px_35px_rgba(0,0,0,0.07)] transition-all duration-300">
        
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center tracking-wide">
          ✏️ Edit Your Habit
        </h1>

        <form onSubmit={handleSubmit} className="space-y-7">
          
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formValues.title}
              onChange={handleChange}
              className="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 py-3 px-4 w-full rounded-xl text-gray-800 transition-all outline-none"
              placeholder="Enter habit title"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Description</label>
            <textarea
              name="description"
              value={formValues.description}
              onChange={handleChange}
              rows={5}
              className="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 py-3 px-4 w-full rounded-xl text-gray-800 transition-all outline-none resize-none"
              placeholder="Describe your habit..."
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Habit Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="border border-gray-300 py-2 px-3 w-full rounded-xl cursor-pointer"
            />

            {(imageFile || formValues.image) && (
              <img
                src={(imageFile ? previewImage : `http://localhost:8081/${formValues.image}`) || ""}
                alt="Preview"
                className="mt-4 w-44 h-44 object-cover rounded-xl shadow-md mx-auto"
              />
            )}
          </div>

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-5 py-2.5 rounded-xl border border-gray-400 text-gray-700 font-medium hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={EditHabitMutation.isPending}
              className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 disabled:opacity-50 shadow-md transition-all"
            >
              {EditHabitMutation.isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default HabitEdit;
