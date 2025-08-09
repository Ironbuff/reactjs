const express = require('express')
const Habit = require('../module/habit');
const { error } = require('console');
const habit = require('../module/habit');

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