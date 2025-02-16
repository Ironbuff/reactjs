import express from 'express'
import Quote from '../models/Quote.js';
import middleware from '../middleware/middleware.js';
const router = express.Router()
router.post('/add', middleware ,async(req, res)=>{
    try{
                  const { title,description}=req.body;
                  const newQuote = new Quote({
                    title,
                    description,
                    userId: req.user.id
                  });
                 
                  await newQuote.save();
                  
                
                  return res.status(200).json({success:true,message:"Quote Created Sucessfully"});
   
       }catch(error){
           console.log(error.nessage);
           return res.status(200).json({success:false, message:"Error in Adding Quote"});
       }
})

router.get('/', middleware, async(req,res)=>{
    try{
        const quotes = await Quote.find({userId: req.user.id})
        return res.status(200).json({sucess: true, quotes})
    }
    catch(error){
        return res.status(500).json({success:false, message:"cant retrive the quotes"})
    }
})

router.put("/id", async (req,res)=>{
    try{
        const {id} = req.params;
        const updateQuote = await Quote.findByIdandUpdate(id, req.body)
        return res.status(200).json({success:false, updateQuote})
    } catch(error){
        return res.status(500).json({success:false, message:"cant update quotes"})
    }
})

router.delete("/id", async (req,res)=>{
    try{
        const {id} = req.params;
        const updateQuote = await Quote.findByIdAndUpdate(id)
        return res.status(200).json({success:false, updateQuote})
    } catch(error){
        return res.status(500).json({success:false, message:"cant delete quotes"})
    }
})
export default router;