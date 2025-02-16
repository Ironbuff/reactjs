// Importing express, a web framework for Node.js used to create server applications
import express from 'express'; 
import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import middleware from '../middleware/middleware.js';
// Creating an instance of the Express Router
// The router helps in organizing routes (API endpoints) separately
const router = express.Router();

// Defining a POST route for user registration
// When a request is sent to '/register', this function will handle it
router.post('./register', async (res, req) => {
    // TODO: Implement the logic for handling user registration
    try{
               const {name, email, password}=req.body;
               const user= await UserActivation.findOne({email})
               if(user){
                return res.status(401).json({success: false, message:"User already exist"})
               }
               const hashPassword = await bcrypt.hash(password, 10)

               const newUser = new User({
                name, email, passowrd:hashPassword
               })
               await newUser.save()
               return res.status(200).json({success:true, message:"Accounted Created Sucessfully"})

    }catch(error){
        return res.status(200).json({success:false, message:"Error in Adding User"})
    }
});
router.post('./login', async (res, req) => {
    // TODO: Implement the logic for handling user registration
    try{
               const { email, password}=req.body;
               const user= await UserActivation.findOne({email})
               if(!user){
                return res.status(401).json({success: false, message:"User Not exist"})
               }
               const checkpassword = await bcrypt.compare(password, user.passowrd)
               if(!checkpassword){
                return res.status(401).json({ success:false, message:"Wrong Credentials"})
               }
               const token = jwt.sign({id: user_id}, "secretkeyofnotapp123@#",{expiresIn:"5h"})
               return res.status(200).json({success:true, token, user:{name: user.name}, message:"Login Sucessfully"})

    }catch(error){
        return res.status(200).json({success:false, message:"Error in Login Server"});
    }
});
router.get('/verify', middleware, async(req,res) =>{
    return res.status(200).json({success:true, user: req.user})
})
// Exporting the router so it can be used in other parts of the application
export default router;
