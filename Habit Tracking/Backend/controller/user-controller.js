const User = require('../module/user')
const bcrypt = require('bcryptjs')


const sign = async(req,res)=>{
    try{
        const {username,email,password} = req.body;

        const isEmailSame = await User.find({email})
        if(isEmailSame){
            return res.status(400).json({message:"Email Already Exists"})
        }
        
        const SameUsername = await User.find({username})
        if(SameUsername){
            return res.status(400).json({messge:"Username Already Exists It should be Unique"})
        }

        const salt = await bcrypt.getSalt(10);

        const newpassword = await bcrypt.hashSync(password,salt)

        const newUser = new User({
            username,
            email,
            password,
        })
        
        await newUser.save();
        
        return res.status(200).json({message:"User Created Sucessfully"})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message:"Error Within the Server"})
    }
}