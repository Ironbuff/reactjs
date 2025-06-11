const express = require('express')
const cors = require('cors')
const app = express()
const userRoute = require('./route/user')
const orderRoute = require('./route/orders')
const cartRoute = require('./route/cart')
const clothesRoute = require('./route/clothes')
// import PORT 
require('dotenv').config()
const mongoose = require('./conn/conn')
const clothes = require('./model/clothes')

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true

}))
app.use('/uploads', express.static(__dirname + '/uploads'));
//✅ This tells Express to serve files from uploads/ directory. So if an image is saved like and also to server all static file

app.use(express.json())
app.use('/api/users',userRoute);
app.use('/api/user/clothes',clothesRoute);
app.use('/api/user/order',orderRoute)
app.use('/api/user/cart',cartRoute)

app.listen(process.env.PORT,()=>{
    console.log(`App is listening in port  ${process.env.PORT}`)
})