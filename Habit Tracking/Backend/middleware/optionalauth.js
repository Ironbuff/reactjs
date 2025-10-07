const jwt = require('jsonwebtoken');

const optionalAuth = (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.header('Authorization');
    if (!authHeader) return next(); // no token → continue

    const token = authHeader.split(' ')[1];
    if (!token) return next(); // malformed header

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };

    next();
  } catch (err) {
    // Invalid or expired token → still continue
    next();
  }
};

module.exports = optionalAuth;
