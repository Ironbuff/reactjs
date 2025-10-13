const User = require("../module/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passwordSchema = require("../validation/Passwordschema");

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
      return res.status(401).json({ message: "Enter Valid Password" });
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


let verificationCodes = {}; // Temporary (you can replace this with MongoDB later)

const verifyEmail = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "No account found with that email" });

    // Generate 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // Store it temporarily (you can use Redis or MongoDB instead)
    verificationCodes[email] = {
      code,
      expiresAt: Date.now() + 5 * 60 * 1000,
    };

    // Setup email transport
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
      subject: "Password Reset Verification Code",
      text: `Your verification code is: ${code}. It will expire in 5 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Verification code sent successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send verification code." });
  }
};

const confirmCode = async (req, res) => {
  try {
    const { email, code } = req.body;

    const stored = verificationCodes[email];
    if (!stored) return res.status(400).json({ message: "No code sent for this email." });

    if (Date.now() > stored.expiresAt) {
      delete verificationCodes[email];
      return res.status(400).json({ message: "Verification code expired." });
    }

    if (stored.code !== code) {
      return res.status(400).json({ message: "Invalid verification code." });
    }

    delete verificationCodes[email]; 

    res.status(200).json({ message: "Email verified successfully. Proceed to change password." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Verification failed." });
  }
};

exports.sign = sign;
exports.login = login;
exports.verifyEmail = verifyEmail;
exports.confirmCode=confirmCode;
