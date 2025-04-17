const express = require('express')
const User = require('../model/user')
const bcrypt = require('bcrypt')
const salt = 10;
const jwt = require('jsonwebtoken')
//for secret key
const secret = "asdsadasdfasdasfgdg"
//for registration
const UserRegister = async(req,res)=>{
  
    //get username and passowrd from user
    try{
        const {username,password} = req.body;
        //generate salt rounds
       const ExistingUser = await User.findOne({username})
       if(ExistingUser){
         return res.status(400).json({message:"credential match"})
       }
       const genSaltRounds= bcrypt.genSaltSync(salt)
       const hashpassword = bcrypt.hashSync(password,salt)

       const CreateUser = new User({
        username,
        password:hashpassword
       })
       
       await CreateUser.save()
       return res.status(200).json({ message: "Registered Successfully" });
        }

    catch(err){
       return res.status(404).json({message:"Error occur during registration"})
    }
}

//for login
const Userlogin = async(req,res)=>{
   try{
     const {username, password}= req.body;

      // Validate inputs
    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }

     //for username
     const userlog = await User.findOne({username})
     
     if(!userlog){
       return res.status(400).json({message:"Wrong Credential"})
     }
    //for password
     const passlog = bcrypt.compareSync(password, userlog.password)
     if(!passlog){
        return res.status(400).json({message:'Wrong Credential'})
     }
     //gen jwt token asynchronously or sign
     const token = jwt.sign({username,id:userlog._id},secret,{expiresIn:'1h'})
     
     //send token as a cookie
     // ✅ Fixed: Removed `secure: true` for development (localhost won't send secure cookies)
     return res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'Lax', // ✅ Changed from 'None' to 'Lax' for development
        // secure: true, // ❌ Removed this for localhost; required only for HTTPS in production
     })
     .status(200)
     .json({id:userlog._id,username})
   }
   catch(err){
    console.log(err);
    res.status(500).json({message:"Internal Server Error"})
   }
}

//to get user profile
// to get cookie
const getCookie = async (req, res) => {
  try{
    const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: "Not authenticated" });

  jwt.verify(token, secret, {}, (err, info) => {
    if (err) return res.status(401).json({ message: "Invalid token" });
    res.status(200).json(info); // returns { username, id }
  })}
  catch(err){
    console.log(err);
  }
};

//for logout 
// Logout User
const logout = (req, res) => {
  res.clearCookie('token', {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
  });
  res.status(200).json({ message: "Logged out successfully" });
};

exports.UserRegister = UserRegister
exports.Userlogin = Userlogin
exports.getCookie = getCookie
exports.logout = logout