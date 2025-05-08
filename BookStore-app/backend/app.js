const express= require('express')
const app = express()
const userRoutes = require('./route/user')
const bookRoutes = require('./route/book')
const favouriteRoutes = require('./route/favourite')
const cartRoute = require('./route/cart')
const orderRoute = require('./route/order')
const cors = require('cors')
//for enivronment import
require('dotenv').config()
//for importing database connection
require('../backend/conn/conn')
//to connect to backend and frontend
app.use(cors())


app.use(express.json())
app.use('/api/users',userRoutes)
app.use('/api/books',bookRoutes)
app.use('/api/books/favourite',favouriteRoutes)
app.use('/api/books/cart',cartRoute)
app.use('/api/books/order',orderRoute)

app.listen(process.env.PORT,()=>{
    console.log(`app is running on port ${process.env.PORT} `)
})