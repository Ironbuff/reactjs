const express = require('express')
const app = express()
const connDB=require('./conn/conn')
const userRoute = require('./route/user')

require('dotenv').config()

app.use(express.json())


app.use('/auth/user',userRoute)

connDB()

app.listen(process.env.PORT,()=>{
    console.log("App Started")
})


