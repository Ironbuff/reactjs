const express = require('express')
const Habit = require('../module/habit');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })


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
        let newhabit;
        if(req.user && req.user.id){
            newhabit = await Habit.find({user:req.user.id}).sort({createdAt:-1})
        }
        else{
            newhabit = await Habit.find().sort({createdAt:-1})
        }
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
        return res.status(200).json({message:"User Habit Sucessfully deleted"})
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
    const { id } = req.params
    const userId = req.user.id; 
    const date = req.body?.date; 

    try {  
        const habit = await Habit.findOne({ _id: id, user: userId });
        if (!habit) {
            return res.status(404).json({ message: 'Habit not found' });
        }
  
        const targetDate = date ? new Date(date) : new Date();
        targetDate.setHours(0, 0, 0, 0);

        const isAlreadyCompleted = habit.completedDates.some(d =>
            new Date(d).toDateString() === targetDate.toDateString()
        );

        let responseMessage;

        if (isAlreadyCompleted) {

            return res.status(400).json({ 
                message: 'Habit already completed today. Cannot undo.' 
            });
        
        } else {
            habit.completedDates.push(targetDate);
            responseMessage = "Habit marked as complete!";
        }

        await habit.save();
        return res.status(200).json({ message: responseMessage, habit });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
};