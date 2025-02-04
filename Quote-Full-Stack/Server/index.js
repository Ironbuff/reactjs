import express from 'express'
 
// Assigning variable a express fn 
const app= express()

// here 5000 is the port no and another is the function
app.listen(5000, ()=>{
  console.log("The Server is running.")
}) 
// It is used to show that the server is running in the background.