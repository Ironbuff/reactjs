const User = require('../module/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

require('dotenv').config()


const sign = async(req,res)=>{
    try{
        const {username,email,password} = req.body;

        const isEmailSame = await User.findOne({email})
        if(isEmailSame){
            return res.status(400).json({message:"Email Already Exists"})
        }
        
        const SameUsername = await User.findOne({username})
        if(SameUsername){
            return res.status(400).json({messge:"Username Already Exists It should be Unique"})
        }

        const salt = await bcrypt.genSalt(10);

        const newpassword = await bcrypt.hash(password,salt)

        const newUser = new User({
            username,
            email,
            password:newpassword,
        })
        
        await newUser.save();
        
        return res.status(200).json({message:"User Created Sucessfully"})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message:"Error Within the Server"})
    }
}


const login = async(req,res)=>{
    try{
         const {email,password} = req.body;

         const user = await User.findOne({email})

         if(!user){
            return res.status(401).json({messge:"Credentials Doesn't Match"})gi
         }
        
        //  Password Checking
         const matchPassword = await bcrypt.compare(password,user.password)
         if(!matchPassword){
            return res.status(401).json({messge:"Enter Valid Password"})
         }


         //Payload for JWT Sign
         const payload ={
            id:user._id,
            email:user.email,
         }

         
        // Get expiry times in milliseconds for sending to client
        const accessTokenExpiresIn = 15 * 60 * 1000; // 15 minutes in milliseconds
        const refreshTokenExpiresIn = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds


         const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"15m"})
         const refreshtoken = jwt.sign(payload,process.env.JWT_REFRESH_SECRET,{expiresIn:"7d"})


         // Calculate actual expiration timestamps for client
        const accessTokenExpiresAt = Date.now() + accessTokenExpiresIn;
        const refreshTokenExpiresAt = Date.now() + refreshTokenExpiresIn
    

         return res.status(200).json({
            messge:"Login Sucessful",
            refreshtoken,
            token,
            accessTokenExpiresAt,
            refreshTokenExpiresAt,
            user:{
                id:user._id,
            }
         })


    }
    catch(err){
        console.log(err)
        return res.status(500).json({message:"Server Error"})
    }
}



exports.sign =  sign
exports.login = login