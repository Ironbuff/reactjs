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