const jwt = require('jsonwebtoken')

exports.optionalAuth = async(req,res,next)=>{
    try{
        const authHeader = req.headers.authorization

         if(!authHeader){
         return next() 
        }

        const token = authHeader.split(' ')[1]
        if(!token){
          return  next()
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        
        req.user = { id: decoded.id }

        return next()

    }
    catch(err){
        return res.status(401).json({
      message: "Invalid or expired token"
    });
    }
}