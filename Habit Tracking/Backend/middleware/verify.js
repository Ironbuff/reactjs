const jwt = require('jsonwebtoken')


const verifyToken = (req,res,next)=>{
    const authHeaders= req.headers.authorization;

    if(!authHeaders  || !authHeaders.startsWith('Bearer')){
        res.status(401).json({messge:"No token Provided"})
    }

    const token = authHeaders.split(' ')[1];

    jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
         if (err) {
            // Specific error messages can be helpful for debugging, but be careful not to reveal too much to clients.
            if (err.name === 'TokenExpiredError') {
                return res.status(403).json({ message: "Token expired" });
            }
            return res.status(403).json({ message: "Invalid token" });
        }
        req.user=decoded
        next()
    })
}

module.exports = verifyToken