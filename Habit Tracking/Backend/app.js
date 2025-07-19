const express = require('express')
const app = express()
const connDB=require('./conn/conn')

require('dotenv').config()

connDB()

app.listen(8081,()=>{
    console.log("App Started")
})


