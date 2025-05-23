const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.URL)
.then(()=>{
    console.log("Database Connected")
})
.catch((err)=>{
    console.log("Database not Connected",err)
})