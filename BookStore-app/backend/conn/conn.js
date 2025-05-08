const mongoose = require('mongoose')


const conn = async()=>{
   try{
    mongoose.connect(`${process.env.URI}`)
    console.log('Database connected')
   }catch(err){
    console.log(err)
   }
}
conn()