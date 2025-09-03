import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import axios from 'axios';
import { AddHabit } from '../../services/Addhabit';




// 1. Define the validation schema with Zod
// This ensures the data is in the correct format before sending to the backend.
const habitSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters long.' }),
  description: z.string().min(5, { message: 'Description must be at least 5 characters long.' }),
});


const AddHabit = () => {
  const queryClient = useQueryClient();
  

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  

  const [errors, setErrors] = useState({});

  const addHabitMutation = useMutation({
    mutationFn:AddHabit
    onSuccess: () => {
  
      console.log('Habit added successfully!');

      setTitle('');
      setDescription('');
      setErrors({});
    },
    onError: (error) => {
      // Handle any API errors
      console.error('Error adding habit:', error);
      setErrors({ api: error.response?.data?.message || error.message || 'Failed to add habit. Please try again.' });
    },
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    const newHabit = { title, description };
    const result = habitSchema.safeParse(newHabit);
    if (!result.success) {
      const formattedErrors = {};
      result.error.errors.forEach((err) => {
        formattedErrors[err.path[0]] = err.message;
      });
      setErrors(formattedErrors);
    } else {

      addHabitMutation.mutate(result.data);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-lg mx-auto mt-8 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Create a New Habit</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-600 mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="e.g., Read for 15 minutes"
          />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="description" className="block text-sm font-medium text-gray-600 mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="e.g., Read one chapter of a non-fiction book"
            rows="3"
          ></textarea>
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
        </div>
        
        {errors.api && <p className="text-red-500 text-sm mb-4 text-center">{errors.api}</p>}

        <button
          type="submit"
          disabled={addHabitMutation.isLoading}
          className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300 disabled:bg-gray-400"
        >
          {addHabitMutation.isLoading ? 'Adding Habit...' : 'Add Habit'}
        </button>
      </form>
    </div>
  );
};

export default AddHabit;

