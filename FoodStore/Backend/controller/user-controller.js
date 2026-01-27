const User = require("../models/user-modal");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const passwordSchema = require("../validation/password-schema");

require("dotenv").config();

exports.sign = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const isEmailSame = await User.findOne({ email });

    if (isEmailSame) {
      return res.status(400).json({ message: "Email must be Unique" });
    }

    const isUserNameSame = await User.findOne({ username });

    if (isUserNameSame) {
      return res.status(400).json({ message: "UserName Already Used" });
    }

    const checkPassword = passwordSchema.safeParse({ password });

    if (!checkPassword.success) {
      const errors = checkPassword.error.issues.map((err) => err.message) ||
        checkPassword.error.errors.map((err) => err.message) || [
          "Password Validation Failed",
        ];
      return res
        .status(400)
        .json({ message: "Password validation Error", error: errors });
    }

    const salt = await bcrypt.genSalt(10);
    const newpassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: newpassword,
    });

    await newUser.save();

    return res.status(200).json({ message: "User Created Sucessfully" });
  } catch (err) {
    return res.status(500).json({ message: "Server Error", error: err });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Crediential doesn't match" });
    }

    const isPasswordSame = await bcrypt.compare(password, user.password);

    if (!isPasswordSame) {
      return res.status(401).json({ message: "Crediential doesn't match" });
    }

    const payload = {
      id: user._id,
      email: user.email,
    };

    //access token and refresh token
    const accessTokenExpiresIn = 60 * 60 * 1000; // 1 hour in millisecond
    const refreshTokenExpiresIn = 7 * 24 * 60 * 60 * 1000; // 7 days in millisecond

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "7d",
    });

    const accessTokenExpiresAt = Date.now() + accessTokenExpiresIn;
    const refreshTokenExpiresAt = Date.now() + refreshTokenExpiresIn;
    const role = user.role;

    return res.status(200).json({
      message: "User Logged Sucessfully",
      accessToken: token,
      refreshToken,
      accessTokenExpiresAt,
      refreshTokenExpiresAt,
      role,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Something Went Wrong", error: err });
  }
};

exports.setRole = async (req, res) => {
  try {
    const { role, userIdValue } = req.body;
    const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({ message: "User isn't authoried" });
    }

    const userValue = await User.findById(userId);

    const roleIsAdmin = userValue.role === "admin";

    if (!roleIsAdmin) {
      return res
        .status(403)
        .json({ message: "User doesn't have permission to change role" });
    }

    const updateRole = await User.findByIdAndUpdate(
      userIdValue,
      {
        role,
      },
      { new: true, runValidators: true },
    );

    if (!updateRole) {
      return res.status(404).json({ message: "User Not Found" });
    }

    return res.status(200).json({ message: "User Role Updated Sucessfully" });
  } catch (err) {
    console.log(err);
    return res
      .staus(500)
      .json({ message: "Internal Server Error", error: err });
  }
};
