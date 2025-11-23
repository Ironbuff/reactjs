import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { edithabit } from "../../services/ChangeHabits";
import { useNavigate, useParams } from "react-router-dom";
import { getHabits } from "../../services/GetHabits";
import { habitType } from "../habit/Habit";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

interface HabitEditProps {
  title?: string;
  description?: string;
  completedDates?: string[];
  createdAt?: string;
  updatedAt?: string;
  user?: string;
  _id?: string;
}

const HabitEdit: React.FC<HabitEditProps> = () => {
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

        if (habitData.image) {
          setPreviewImage(habitData.image);
        }
      }
    }
  }, [habits, id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
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

    if (imageFile) {
      formData.append("image", imageFile);
    }

    // Send FormData + id
    EditHabitMutation.mutateAsync({ id, data: formData });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          ✏️ Edit Habit
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formValues.title}
              onChange={handleChange}
              placeholder="Enter habit title"
              className="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-100 p-3 w-full rounded-lg transition"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formValues.description}
              onChange={handleChange}
              placeholder="Describe your habit..."
              rows={4}
              className="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-100 p-3 w-full rounded-lg transition"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Habit Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="border border-gray-300 p-2 w-full rounded-lg"
            />
            {(imageFile || formValues.image) && (
              <img
                src={(imageFile ? previewImage : `http://localhost:8081/${formValues.image}`) || ""}
                alt="Preview"
                className="mt-3 w-32 h-32 object-cover rounded-lg shadow"
              />
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={EditHabitMutation.isPending}
              className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50 transition"
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
