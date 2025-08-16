import React from 'react'
import { getHabits } from '../../services/GetHabits'
import { useQuery } from '@tanstack/react-query'

const Habit = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['habit'],
    queryFn: getHabits,
  })

  console.log(data?.data)

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error: {error.message}</p>
  }

  return (
    <div>
      <h2>Habits</h2>
      <ul>
        {data?.data?.newhabit?.map((habit) => (
          <li key={habit._id}>{habit.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default Habit
