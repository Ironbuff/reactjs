const express = require('express')
const Books = require('../models/book')
const Users = require('../models/user')

//add to favourite
const addfavourite = async(req,res)=>{
  try{
    const{id,bookid} = req.headers;
    const userinfo =  await Users.findById(id)
    //to check if the User has book id
    const isfavourite = await userinfo.favourites.includes(bookid)
    //check if user has the book in favourites
    if(isfavourite){
        return res.status(200).json({message:"book already in favourites"})
    }

    //here it updates the favourite field with the book id which is send from user of book
    await Users.findByIdAndUpdate(id,{$push:{favourites: bookid }})
    res.status(200).json({message:"book added to favourite"})
  }
  catch(err){
    res.status(500).json({messge:"Server Error"})
  }
}

//delete from favourite
const deletefavourite = async(req,res)=>{
   try{
    const{id,bookid} = req.headers;
    const userinfo =  await Users.findById(id)
    //to check if the User has book id
    const isfavourite = userinfo.favourites.includes(bookid)
    //check if user has the book in favourites
    if(isfavourite){
        //pull deletes from favourites
        await Users.findByIdAndUpdate(id,{$pull:{favourites: bookid }})
    }
    res.status(200).json({message:"book removed from favourite", data:isfavourite})
   }
   catch(err){
    res.status(500).json({messge:"Server Error"})
  }
    
}

//get all book from favourite
const getfavouritebook = async(req,res)=>{
    try{
    const{id}= req.headers;
    //if not done populate it only returns the id but adding populate returns all book information
    const userinfo = await Users.findById(id).populate('favourites'); 
    const favourtie = userinfo.favourites
    res.status(200).json({data:favourtie})
    }
    catch(err){
        res.status(500).json({messge:"Server Error"})
      }

}

exports.addfavourite = addfavourite
exports.deletefavourite = deletefavourite
exports.getfavouritebook = getfavouritebook