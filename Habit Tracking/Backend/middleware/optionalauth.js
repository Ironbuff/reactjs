const jwt = require('jsonwebtoken');

const optionalAuth = (req, res, next) => {
  try {

    const authHeader = req.header('Authorization');
    if (!authHeader) return next(); 

    const token = authHeader.split(' ')[1];
    if (!token) return next(); 

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };

    next();
  } catch (err) {

    next();
  }
};

module.exports = optionalAuth;
