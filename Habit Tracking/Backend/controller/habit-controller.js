const express = require('express')
const Habit = require('../module/habit');
const { error } = require('console');
const habit = require('../module/habit');

exports.addHabit = async(req,res)=>{
   try{
     const{title,description}= req.body;
    const userid = req.userid;
    const newHabit = new Habit({
        title,
        description,
        user:userid,
    })
    return res.status(200).json({message:"Habit Sucessfully created",habit:newHabit})
}
catch(err){
    return res.status(500).json({message:"Server Error",error:err.message})
}
}