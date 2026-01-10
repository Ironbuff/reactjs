const mongoose = require('mongoose')

require('dotenv').config()
const dburl = process.env.db_connect

const connection = async()=>{
 try{
    await mongoose.connect(dburl);
    console.log("DB Connected")
 }
 catch(err){
       console.log("Error in Connecting to Database",err)
 } 
}

module.exports = connection