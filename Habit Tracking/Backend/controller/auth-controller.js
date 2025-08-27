const User = require('../module/user');
const jwt = require('jsonwebtoken');

exports.refreshtoken = async (req, res) => {
    try {
        const authHeaders = req.headers.authorization;

        if (!authHeaders || !authHeaders.startsWith('Bearer ')) {
            // Added space after Bearer for correct split
            return res.status(401).json({ message: "No token Provided" });
        }

        const refreshToken = authHeaders.split(' ')[1];

        if (!refreshToken) {
            return res.status(401).json({ message: "Refresh token not found" });
        }

        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
            if (err) {
                // Return to prevent the next res.json from being called
                return res.status(403).json({ message: "Invalid Refresh token" });
            }

            // Check if user exists based on decoded ID
            const foundUser = User.findById(decoded.id);
            if (!foundUser) {
                return res.status(404).json({ message: "User not found" });
            }
            
            // Issue new access token using decoded user data
            const accessToken = jwt.sign(
                { id: decoded.id, email: decoded.email },
                process.env.JWT_SECRET,
                { expiresIn: "15m" }
            );

            res.json({ accessToken, expiresAt: Date.now() + 15 * 60 * 1000 });
        });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: "Server error" });
    }
};