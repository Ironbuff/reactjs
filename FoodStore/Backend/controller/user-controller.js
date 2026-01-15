const User = require("../models/user-modal");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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

    return res
      .status(200)
      .json({
        message: "User Logged Sucessfully",
        accessToken: token,
        refreshToken,
        accessTokenExpiresAt,
        refreshTokenExpiresAt,
      });

  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Something Went Wrong", error: err });
  }
};
