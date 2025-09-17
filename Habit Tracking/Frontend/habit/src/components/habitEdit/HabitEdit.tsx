import { useMutation } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { edithabit } from "../../services/ChangeHabits";

interface HabitEditProps {
  id?: string;
  habitData: {
    title?: string;
    description?: string;
    completedDates?: string[];
    createdAt?: string;
    updatedAt?: string;
    user?: string;
    _id?: string;
  };
}

const HabitEdit: React.FC<HabitEditProps> = ({ id, habitData }) => {
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    completedDates: [] as string[],
  });

  // Prefill form when habitData changes
  useEffect(() => {
    if (habitData) {
      setFormValues({
        title: habitData.title || "",
        description: habitData.description || "",
        completedDates: habitData.completedDates || [],
      });
    }
  }, [habitData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value,
    }));
  };


  const EditHabitMutation = useMutation({
    mutationKey:['editData'],
    mutationFn:edithabit,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded">
      <div>
        <label className="block font-medium">Title</label>
        <input
          type="text"
          name="title"
          value={formValues.title}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
      </div>

      <div>
        <label className="block font-medium">Description</label>
        <textarea
          name="description"
          value={formValues.description}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Save Changes
      </button>
    </form>
  );
};

export default HabitEdit;
