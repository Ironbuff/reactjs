const User = require("../models/user-modal");
const { decode } = require("../validation/password-schema");
const jwt = require("jsonwebtoken");

exports.refreshtoken = async (req, res) => {
  try {
    const authHeaders = req.headers.authorization;

    if (!authHeaders || !authHeaders.startsWith("Bearer")) {
      return res.status(401).json({ message: "Token isnt provided" });
    }

    const refreshToken = authHeaders.split(" ")[1];

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token not found" });
    }
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid Refresh Token" });
      }
      const foundUser = User.findById(decoded.id);
      if (!foundUser) {
        return res.status(404).json({ message: "User not found." });
      }
      const accessToken = jwt.sign(
        { id: decoded.id, email: decoded.email },
        process.env.JWT_SECRET,
        { expiresIn: "30s" },
      );
      res.json({
        accessToken,
        accessTokenExpiresAt: Date.now() + 1 * 60 * 1000,
      });
    });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: "Server error" });
  }
};
