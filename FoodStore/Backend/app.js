const express = require('express')
const app = express();
const connDB = require('./conn/conn')
const userRoute = require('../Backend/route/user-route')

require('dotenv').config()

connDB();

app.use(express.json())

app.use('/auth',userRoute)

app.listen(process.env.PORT,()=>{
   console.log(`App Started in port ${process.env.PORT}`);
})

