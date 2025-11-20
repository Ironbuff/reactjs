const express = require('express')
const app = express()
const connDB=require('./conn/conn')
const userRoute = require('./route/user')
const habitRoute = require('./route/habit')
const authRoute = require('./route/auth')
const cors = require('cors');


require('dotenv').config()

const corsOptions = {
  origin: `${process.env.FRONTEND_URL}`,
};
app.use(cors(corsOptions));

app.use(express.json());

app.use("/uploads", express.static("uploads"));



app.use('/auth/user',userRoute)
app.use('/user/habit',habitRoute)
app.use('/auth',authRoute)

connDB()

app.listen(process.env.PORT,()=>{
    console.log("App Started")
})


