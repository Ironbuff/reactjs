import express from 'express'
import cors from 'cors'
import authRouter from './routes/auth.js'
import connectToMongoDB from './db/db.js'
// Assigning variable a express fn 
const app= express()

// Enabling CORS (Cross-Origin Resource Sharing) for the application
// CORS allows your backend to accept requests from different domains (e.g., frontend running on a different URL)
app.use(cors())
app.use(express.json())

// Setting up a middleware for authentication-related routes
// All routes inside 'authRouter' will be prefixed with '/api/auth'
// this will check the user authenication by directing it to auth.js file 
app.use('/api/auth',authRouter)

// here 5000 is the port no and another is the function
app.listen(5000, ()=>{
  connectToMongoDB()
  console.log("The Server is running.")
}) 
// It is used to show that the server is running in the background.