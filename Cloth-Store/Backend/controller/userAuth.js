const jwt = require('jsonwebtoken')
require('dotenv').config()

const authenticatetoken=(req,res,next)=>{
    const authHeaders = req.headers["authorization"] //since req.headers is a object not a function so we take ['authorization'] not ('authorization')
    const token = authHeaders && authHeaders.split(" ")[1]  //since usually token is sent as $Bearer <token> so we use space to take token part

    if(!token){
        return res.status(400).json({message:"Authentication token needed"})
    }

    jwt.verify(token,process.env.JWT_Secert,{},(err,data)=>{
        if(err){
            return res.status(403).json({message:"Authentication token expired"})
        }
        req.data= data;
        next();
    })
}

module.exports={authenticatetoken}