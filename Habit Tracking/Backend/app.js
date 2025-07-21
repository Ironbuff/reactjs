const express = require('express')
const app = express()
const connDB=require('./conn/conn')

require('dotenv').config()

connDB()

app.listen(process.env.PORT,()=>{
    console.log("App Started")
})


