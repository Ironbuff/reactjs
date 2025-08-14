import React from 'react'
import UseGetHabits from '../../libary/GetHabitsValue'

const Habit = () => {
  
   const {data} = UseGetHabits()

   console.log({data})
  
    return (
    <div>

    </div>
  )
}

export default Habit