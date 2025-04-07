// Importing required modules
const router = require('express').Router();
const bcrypt = require('bcryptjs'); // Added missing bcrypt import
const User = require("../models/user");

// SIGN UP Route (Registering a new user)
router.post('/register', async (req, res) => {
    try {
        // Destructuring data from the request body (email, username, password)
        const { email, username, password } = req.body;
        const hashpassword = bcrypt.hashSync(password);
        // Check if the user already exists (by email or username)
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(200).json({ message: "User already exists" });
        }
        
        // Here, you would typically check if the user already exists, hash the password, and save the user data
        const user = new User({ email, username, password: hashpassword });

        await user.save().then(() => res.status(200).json({ message:"Sign Up Sucessful" }));

    } catch (error) {
        res.status(400).json({ message: "Error occurred during registration" });
    }
});

// SIGN IN Route (Changed from /register to /login)
router.post("/login", async (req, res) => {
    try {
        // Find user by email
        const user = await User.findOne({ email: req.body.email });
        
        // Check if the user exists
        if (!user) {
            return res.status(200).json({ 
                message: "Please Sign Up First" 
            });
        }
        
        // Compare the provided password with the stored hashed password
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);
        
        // If password is incorrect, return an error message
        if (!isPasswordCorrect) {
            return res.status(200).json({ 
                message: "Password isn't correct" 
            });
        }
        
        // Explicitly convert to a plain object and spread
        const userObject = user.toObject();
        const { password, ...others } = userObject; // Destructure out the password, and collect all other user properties in 'others'
        
        // Explicitly return an object with 'others'
        res.status(200).json({ others });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error occurred during login" });
    }
});

// Exporting the router
module.exports = router;
