const express = require('express')
const Habit = require('../module/habit');


exports.addHabit = async(req,res)=>{
   try{
     const{title,description}= req.body;
    const userid = req.user.id;
    const newHabit = new Habit({
        title,
        description,
        user:userid,
    })
    await newHabit.save()
    return res.status(200).json({message:"Habit Sucessfully created",habit:newHabit})
}
catch(err){
    return res.status(500).json({message:"Server Error",error:err.message})
}}

exports.getUserHabit = async(req,res)=>{
    try{
      const newhabit = await Habit.find().sort({createdAt:-1})
      return res.status(200).json({newhabit})
    }
    catch(err){
        return res.status(500).json({message:"Server Error",error:err.message})   
     }
}

exports.deleteUserHabit = async(req,res)=>{
    try{
        const userid = req.user.id;
        const {ids} = req.params;
        await Habit.findByIdAndDelete(ids)
        return res.status(200).json({message:"Sucessfully deleted"})
    }
    catch(err){
        return res.status(500).json({message:"Server Error",error:err.message})
    }
}

// Update a habit's title or description
exports.updateHabit = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const updatedHabit = await Habit.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );

    if (!updatedHabit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    res.status(200).json({ message: 'Habit updated', habit: updatedHabit });
  } catch (err) {
    res.status(500).json({ message: 'Error updating habit', error: err.message });
  }
};



exports.toggleHabitCompletion = async (req, res) => {
    const habitId = req.params.id;
    const userId = req.user._id; // Make sure your middleware attaches this
    const { date } = req.body;

    try {
        const habit = await habit.findOne({ _id: habitId, user: userId });

        if (!habit) {
            return res.status(404).json({ message: 'Habit not found' });
        }

        const targetDate = date ? new Date(date) : new Date();
        targetDate.setHours(0, 0, 0, 0); // normalize time

        const isAlreadyCompleted = habit.completedDates.some(d =>
            new Date(d).toDateString() === targetDate.toDateString()
        );

        if (isAlreadyCompleted) {
            // Remove the date (uncheck)
            habit.completedDates = habit.completedDates.filter(d =>
                new Date(d).toDateString() !== targetDate.toDateString()
            );
        } else {
            // Add the date (mark complete)
            habit.completedDates.push(targetDate);
        }

        await habit.save();

        return res.status(200).json({ message: 'Habit updated', habit });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
};
