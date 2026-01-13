const User = require('../models/user-modal')
const js = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

require('dotenv').config()


exports.sign = async(req,res)=>{

    try{
        const {username,email,password} = req.body;

    const isEmailSame = await User.findOne({email});

    if(isEmailSame){
      return res.status(400).json({message:"Email must be Unique"})
    }
    
    const isUserNameSame = await User.findOne({username});

    if(isUserNameSame){
        return res.status(400).json({message:"UserName Already Used"})
    }

    
    const salt = await bcrypt.genSalt(10);
    const newpassword = await bcrypt.hash(password, salt);

    const newUser = new User({
        username,
        email,
        password:newpassword,
    })

    await newUser.save();

    return res.status(200).json({message:"User Created Sucessfully"})

    }
    catch(err){
        return res.status(500).json({message:"Server Error",error:err})
    }
}