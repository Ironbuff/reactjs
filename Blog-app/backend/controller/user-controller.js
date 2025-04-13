const mongoose = require('mongoose')
const User = require('../module/user')
const HttpError = require('../module/Error')
const bcrypt = require('bcryptjs')
const jwt= require('jsonwebtoken')

//for salt
const salt = bcrypt.genSaltSync(10) //to set string for encryption
const secret = "adsdasfsfgsa"

//register user
const register = async(req,res,next)=>{
    const { username, password} = req.body;
    
    //user check
    let users
    try{
        users=await User.findOne({username:username})
    }
    catch(err)
    {
        const error= new HttpError('Unable register',500)
        return next(error) //returns the error to next middleware
    }

    if(users){
        const error = new HttpError('User aleady exists',422)
        return next (error)
    }
    //to save user
    const CreatedUser= new User({
        username,
        password:bcrypt.hashSync(password,salt)
    })
    try{
        await CreatedUser.save()
    }
    catch(err){
        const error= new HttpError('Couldnt Save User',404)
        return next(error)
    }
    res.status(200).json({message:'user logged in Sucessfully'})

}


// Login User
const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Wrong credentials' });
        }

        // Compare passwords
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Wrong credentials' });
        }

        // Generate JWT Token
        const token = jwt.sign({ username, id: user._id }, secret, { expiresIn: '1h' });

        // Send token as cookie
        res.cookie('token', token, { httpOnly: true, sameSite: 'None', secure: true })
           .status(200)
           .json({ id:user._id,username,});

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// to get cookie
const getCookie = async (req, res) => {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: "Not authenticated" });
  
    jwt.verify(token, secret, {}, (err, info) => {
      if (err) return res.status(401).json({ message: "Invalid token" });
      res.status(200).json(info); // returns { username, id }
    });
  };
  

// Logout User
const logout = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
    });
    res.status(200).json({ message: "Logged out successfully" });
};


exports.register=register //ensure the function is exported
exports.login = login
exports.getCookie=getCookie
exports.logout=logout