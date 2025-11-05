const User = require("../module/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passwordSchema = require("../validation/Passwordschema");
const crypto = require("crypto"); 
const nodemailer = require("nodemailer"); 

require("dotenv").config();

const sign = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Validate password
    const checkPassword = passwordSchema.safeParse({ password });
  
    
    if (!checkPassword.success) {
      
      
      // Extract errors from ZodError - the errors are in the error object itself
      const errors = checkPassword.error.issues?.map((err) => err.message) || 
                   checkPassword.error.errors?.map((err) => err.message) || 
                   ['Password validation failed'];
      
      return res.status(400).json({ 
        message: "Password validation failed",
        errors: errors 
      });
    }

    const isEmailSame = await User.findOne({ email });
    if (isEmailSame) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const SameUsername = await User.findOne({ username });
    if (SameUsername) {
      return res
        .status(400)
        .json({ message: "Username already exists. It should be unique." });
    }

    const salt = await bcrypt.genSalt(10);
    const newpassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: newpassword,
    });

    await newUser.save();

    return res.status(200).json({ message: "User created successfully." });
  } catch (err) {
    console.error('Sign up error:', err);
    return res.status(500).json({ message: "Error within the server." });
  }
};



const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Credentials Doesn't Match" });
    }

    //  Password Checking
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.status(401).json({ message: "Enter the Correct Password" });
    }

    //Payload for JWT Sign
    const payload = {
      id: user._id,
      email: user.email,
    };

    // Get expiry times in milliseconds for sending to client
    const accessTokenExpiresIn = 30 * 1000; // 15 minutes in milliseconds
    const refreshTokenExpiresIn = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "30s",
    });
    const refreshtoken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "7d",
    });

    // Calculate actual expiration timestamps for client
    const accessTokenExpiresAt = Date.now() + accessTokenExpiresIn;
    const refreshTokenExpiresAt = Date.now() + refreshTokenExpiresIn;

    return res.status(200).json({
      messge: "Login Sucessful",
      refreshtoken,
      token,
      accessTokenExpiresAt,
      refreshTokenExpiresAt,
      user: {
        id: user._id,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }
};


const forgotPassword = async (req, res) => {
    let user; // <-- 1. Declare 'user' here, outside the try block.
    try {
        const { email } = req.body;
        user = await User.findOne({ email }); // <-- 2. Assign the value here.

        if (!user) {
            return res.status(200).json({ message: "If an account with that email exists, a reset link has been sent." });
        }

        // 1. Generate a secure token
        const resetToken = crypto.randomBytes(20).toString('hex');

        // 2. Hash the token and set it on the user model
        user.resetPasswordToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');
        
        // 3. Set an expiration time (e.g., 15 minutes)
        user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

        await user.save();

        // 4. Create the reset URL for the frontend
        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

        // 5. Send the email with the link
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password Reset Request",
            text: `You are receiving this email because you (or someone else) have requested the reset of a password. Please click on the following link, or paste this into your browser to complete the process within 15 minutes:\n\n${resetUrl}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "Password reset link sent successfully to your email." });

    } catch (error) {
        console.error("Forgot Password Error:", error);
        // Clear token on error
        if (user) { // <-- Now 'user' is accessible here
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save();
        }
        res.status(500).json({ message: "Failed to send reset link." });
    }
};

const resetPassword = async (req, res) => {
    try {
        // Get the token from the URL params
        const resetToken = req.params.token;
        const hashedToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');

        // Find the user with the matching, non-expired token
        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token." });
        }

        // Set the new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);
        
        // Invalidate the token
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(200).json({ message: "Password updated successfully." });

    } catch (error) {
        console.error("Reset Password Error:", error);
        res.status(500).json({ message: "Failed to reset password." });
    }
};


exports.sign = sign;
exports.login = login;
exports.forgotPassword = forgotPassword;
exports.resetPassword = resetPassword;