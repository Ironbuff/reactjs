const mongoose = require('mongoose')

const connection=async()=>{
    try{
        await mongoose.connect(`${process.env.DBURL}`)
        console.log("Database Connected")
    }
    catch(err){
          console.log("Error in Connecting to Database",err)
    }
}
 
module.exports= connection