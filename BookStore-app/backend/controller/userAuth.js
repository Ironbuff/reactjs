const jwt = require('jsonwebtoken')
const secert = "asdasfasgasgas"

const authenticateToken = (req,res,next)=>{
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]

    if(!token){
        return res.status(400).json({message:"Authentication token needed"});
    }

    jwt.verify(token,secert,{},(err,data)=>{
        if(err){
            res.status(403).json({message:"token expired please sign in again", Error:err})
        }
        req.data = data;
        next();
    
    })
}

module.exports = {authenticateToken}