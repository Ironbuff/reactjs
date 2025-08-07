const express = require('express')
const app = express()
const connDB=require('./conn/conn')
const userRoute = require('./route/user')
const habitRoute = require('./route/habit')

require('dotenv').config()

app.use(express.json())


app.use('/auth/user',userRoute)
app.use('/user/habit',habitRoute)

connDB()

app.listen(process.env.PORT,()=>{
    console.log("App Started")
})


