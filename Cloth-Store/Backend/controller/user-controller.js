const User = require('../model/user')
const jwt = require('jsonwebtoken')
const salt = 10;
const bcrypt = require('bcryptjs')
require('dotenv').config()


const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ username: username })

        if (existingUser) {
            return res.status(400).json({ message: "User Already Exists" })
        }

        if (password.length <= 4) {
            return res.status(400).json({ message: "Password Length should be of length 5" })
        }

        const Existingemail = await User.findOne({ email: email })

        if (Existingemail) {
            return res.status(400).json({ message: "Email is already Used use another email" })
        }

        const hashpassword = bcrypt.hashSync(password, salt)

        const RegisterUser = new User({
            username: username,
            email: email,
            password: hashpassword,
        })

        await RegisterUser.save()
        return res.status(200).json({ message: "User Registered Sucessfully" })
    }
    catch (err) {
        return res.status(500).json({ message: "Server Error" ,error:err})
    }
}

// login User
const login = async(req,res)=>{
  
  try{
      const{username,password}= req.body;

    const existingUser = await User.findOne({username})

    if(!existingUser){
        return res.status(400).json({message:"User Doesn't Exist Enter Correct Credential"})
    }

    bcrypt.compare(password,existingUser.password,(err,data)=>{
        if(err){
            return res.status(400).json({message:"Invalid Credential"})
        }
        else{
            //information needed for jwt token jwt payload should be object not array of single object
            const authclaims = {
                name:existingUser.username,
                role:existingUser.role
            }

            // jwt verify part
            const token = jwt.sign({authclaims},process.env.JWT_Secert,{expiresIn:'30d'})

            return res.status(200).json({id:existingUser._id,role:existingUser.role,token:token,message:"Login Sucessful"})
        }
    })
  }
  catch(err){
    return res.status(500).json({message:"Server Error",error:err})
  }
}

// to get all users
const getUser = async(req,res)=>{
    try{

        const {id} = req.headers;
        const getusers = await User.findById(id).select('-password')
        return res.status(200).json(getusers)

    }
    catch(err){
        return res.status(500).json({message:"Server Error"})
    }
}

exports.registerUser = registerUser
exports.login = login
exports.getUser = getUser