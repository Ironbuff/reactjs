const express =require('express')
//for api
const cors = require('cors')
//for database
const mongoose = require('mongoose')
//for cookieparsing
const cookieparsing = require('cookie-parser')
const app = express()
//for userroute specific
const userroute= require('../backend/routes/user')
//for quoteroute specific
const quoteroute = require('../backend/routes/quote')
const path = require('path');
//for parsing json
app.use(express.json())
//for parsing cookie
app.use(cors(({ credentials: true, origin: "http://localhost:5173" }))) //configure with credentials support to get cookie from user that is the token
app.use(cookieparsing())
//to for user authentication define url and then routes
app.use('/api/users',userroute)
//to for post quote
app.use('/api/quotes',quoteroute)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect("mongodb+srv://insane:insane22@cluster0.kv56yao.mongodb.net/")
.then(()=>{
    //to show that database is connected
    app.listen(2000,()=>{
        console.log("Server is running at port 2000 and connected to database")
    })
})
.catch(err=>{
    console.log('Database connection error',err)
})