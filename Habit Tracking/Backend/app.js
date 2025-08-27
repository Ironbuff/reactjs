const express = require('express')
const app = express()
const connDB=require('./conn/conn')
const userRoute = require('./route/user')
const habitRoute = require('./route/habit')
const authRoute = require('./route/auth')
const cors = require('cors');


require('dotenv').config()

// Configure CORS to allow requests from your frontend's URL
const corsOptions = {
  origin: 'http://localhost:5173',
};
app.use(cors(corsOptions));

// Correct way to use express.json()
app.use(express.json());



app.use('/auth/user',userRoute)
app.use('/user/habit',habitRoute)
app.use('/auth',authRoute)

connDB()

app.listen(process.env.PORT,()=>{
    console.log("App Started")
})


