const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const salt = 10 
const bcrypt = require('bcryptjs')
const secert = "asdasfasgasgas"



//register user
const userRegister=async(req,res)=>{
    try{

        const{username,password,address,email}= req.body;
        
        const existingUser = await User.findOne({username:username})

        if(existingUser){
            return res.status(400).json({message:"user already exists"})
        }
        if(password.length<=5){
            return res.status(400).json({message:"password must be atleast of length 5"})
        }
        //checking email
        const existingEmail = await User.findOne({email:email})
        if(existingEmail){
            return res.status(400).json({message:"Email already exists"})
        }
        
        //bcrypting password
        const hash = bcrypt.hashSync(password,salt)
        
        const RegisterUser = new User({
            username:username,
            email:email,
            password:hash,
            address:address
        })

        await RegisterUser.save()
        return res.status(200).json({message:"user registered sucessfully"})

    }catch(err){
        res.status(500).json({message:"Server Error", Error:err})
    }
}


//login
const userLogin = async(req,res)=>{
    try{
    const{username,password} = req.body;
    const existingUser = await User.findOne({username:username})

    if(!existingUser){
        return res.status(400).json({message:"user doesnt exist"})
    }
     bcrypt.compare(password,existingUser.password,(err,data)=>{
        if(err){
            res.status(200).json({message:"invalid credential"})
        }else{
             

            //sign
            const authclaims = [{
                name:existingUser.username,
                role:existingUser.role
            }]

            const token = jwt.sign({authclaims},secert,{expiresIn:'30d'})
   

            res.status(200).json({id:existingUser._id,role:existingUser.role,token:token})
        }
     })
    }
    catch(err){
        res.status(500).json({message:'serverError', Error:err})
    }
    
}

const getUsers = async(req,res)=>{
    try{
        // get id from the authentication
        const {id}= req.headers;
        const user = await User.findById(id).select('-password')
        res.status(200).json(user)
    }
    catch(err){
        res.status(500).json({message:"Server Error",Error:err})
    }
}


exports.userRegister =userRegister
exports.userLogin =userLogin
exports.getUsers =getUsers