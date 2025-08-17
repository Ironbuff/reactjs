import React from 'react'
import { getHabits } from '../../services/GetHabits'
import { useQuery } from '@tanstack/react-query'

const Habit = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['habit'],
    queryFn: getHabits,
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold text-gray-600 animate-pulse">Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500 font-medium">Error: {error.message}</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-extrabold font-serif text-gray-800 mb-6">
        🌱 Habits
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {data?.data?.newhabit?.map((habit, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-5 flex flex-col gap-3 border border-gray-100"
          >
            <h2 className="text-2xl font-semibold text-gray-800">
              {habit?.title}
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              {habit?.description}
            </p>
            <button className="mt-auto self-start px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-xl hover:bg-green-700 transition-colors duration-300">
              Track Habit
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Habit
