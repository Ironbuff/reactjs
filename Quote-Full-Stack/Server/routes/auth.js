// Importing express, a web framework for Node.js used to create server applications
import express from 'express'; 
import User from '../models/User.js'
import bcrypt from 'bcrypt'
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

// Exporting the router so it can be used in other parts of the application
export default router;
