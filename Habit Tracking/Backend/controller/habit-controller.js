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
    return res.status(200).json({message:"Habit Sucessfully created",habit:newHabit})
}
catch(err){
    return res.status(500).json({message:"Server Error",error:err.message})
}}

exports.getUserHabit = async(req,res)=>{
    try{
      const userid = req.user.id
      const habit = await Habit.find({user:userid}).sort({createdAt:-1})
      return res.staus(200).json({habit})
    }
    catch(err){
        return res.status(500).json({message:"Server Error",error:err.message})    }
}