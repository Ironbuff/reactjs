const express = require('express')
const secret = "asdsadasdfasdasfgdg"
const jwt = require('jsonwebtoken')
const Quote = require('../model/quote')
const fs= require('fs')



//to create post
const createpost = async(req,res)=>{
    
    try{
         
         // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
  
    // Destructure original file name from the uploaded file object
    const { originalname,path } = req.file;
  
    // Split the file name by dot to get the extension (e.g., .jpg, .png)
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1]; // Get the last part as extension
  //to get extension of image we use fs or file system
     const newpath= path+'.'+ext
  
    fs.renameSync(path,newpath)
    //to save post
      
      //verify user
          //get token from user
          const { token } = req.cookies;
          //to verify token
          jwt.verify(token,secret,{},async(err,info)=>{  
             if(err) throw res.status(404).json({message:"Invalid Token"})
             
               //now get value from user since token has been validated
               const { title, quote}= req.body

                const createdpost = new Quote({
                title,
                quote,
                creator:info.id,
                image:newpath
            })
            try{
                await createdpost.save()
                res.status(200).json(createdpost)
            }
            catch(err){
                res.status(404).json(err)
            }
          })
    }
    catch(err){
        res.status(404).json({message:"error in authentication"})
    }
}

//to get  all the quote
const getQuote = async(req,res)=>{
  try {
        const quotes = await Quote
          .find()
          .sort({ createdAt: -1 }) // Sort by newest first
          .limit(20) // Limit to 20 posts
          .populate('creator', 'username'); // Populate username
    
        res.json(quotes); // ✅ Send after sorting/limiting
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
      }   
}

//to get all the quote based on quote id
const getquoteByQuotetId= async(req,res)=>{
  try {
    const { id } = req.params; //to get id from user
    console.log(id)
    const singleQuote = await Quote.findById(id).populate('creator', ['username']); //to find post by id and return username from creator

    if (!singleQuote) {
      return res.status(404).json({ message: "quote not found" });
    }

    res.json(singleQuote);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

//to update quote
const Updatequote = async(req,res) =>{
  try{

    const {token} = req.cookies;
    jwt.verify(token,secret,{},async(err,info)=>{
       //to check token
       if (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
      }
        //if token verified we go to update code
      const{title,quote,_id}= req.body;
      const Doc = await Quote.findById(_id);
      //to check if the post id is same as post id send by the user
      const isAuthor = JSON.stringify(Doc.creator)===JSON.stringify(info.id)
      //condition if not equal
      console.log(info)
      if(!isAuthor){
        res.status(404).json({message:"Quote not found"})
      }
      else{
        Doc.title=title;
        Doc.quote=quote;
          // Check if a new file was uploaded
          if (req.file) {
            // Process the new file
            const { originalname,path } = req.file;
            const parts = originalname.split('.');
            const ext = parts[parts.length - 1];
            const newpath= path+'.'+ext;
            fs.renameSync(path,newpath);
            Doc.image = newpath; // Update the image path
          }
        await Doc.save();
        res.status(200).json({message:"quote Sucessfully updated",Quote:Doc})
      }
    })
  }
  catch(err){
    console.log(err)
    res.status(500).json({message:"Server Error",error:err})
  }
}


// DELETE quote by ID
const deleteQuote = async (req, res) => {
  try {
    const { token } = req.cookies;

    jwt.verify(token, secret, {}, async (err, info) => {
      if (err) return res.status(401).json({ message: 'Invalid token',error:err });

      const { id } = req.params;
      console.log(id)

      const quote = await Quote.findById(id);

      if (!quote) return res.status(404).json({ message: 'Quote not found' });

      // Check if the logged-in user is the creator
      if (quote.creator.toString() !== info.id) {
        return res.status(403).json({ message: "Unauthorized: Not your quote" });
      }

      await Quote.findByIdAndDelete(id);
      res.status(200).json({ message: "Quote successfully deleted" });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteQuote = deleteQuote;
exports.createpost = createpost
exports.getQuote = getQuote
exports.getquoteByQuotetId = getquoteByQuotetId
exports.Updatequote = Updatequote