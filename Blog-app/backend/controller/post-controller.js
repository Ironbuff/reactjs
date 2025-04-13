const post = require('../module/post')
const HttpError = require('../module/Error')
const jwt= require('jsonwebtoken')
const multer = require('multer')
//to set string for encryption
const secret = "adsdasfsfgsa"
const user = require('../module/user')
const fs= require('fs')



const createpost= async(req, res) => {
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
      
      
    //to verify user

    const { token } = req.cookies;

    jwt.verify(token, secret, {}, async(err, info) => {
          if (err) return res.status(401).json({ message: "Invalid token" });
          const {title,summary,content}= req.body
          const Postblog= new post({
              title,
              summary,
              content,
              img:newpath,
              creator:info.id, //to extract user id
          });
          try{
              await Postblog.save()
              res.json(Postblog)
          }
          catch(err){
              const error= new HttpError('Couldnt Save Post',404)
              throw error
          }
        });

  }

  //to get all the post
  const getpost = async(req,res)=> {
    try {
      const posts = await post
        .find()
        .sort({ createdAt: -1 }) // Sort by newest first
        .limit(20) // Limit to 20 posts
        .populate('creator', 'username'); // Populate username
  
      res.json(posts); // ✅ Send after sorting/limiting
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    }
  };


//to get all the post based on post id
const getPostByPostId= async(req,res)=>{
  try {
    const { id } = req.params; //to get id from user
    const singlePost = await post.findById(id).populate('creator', ['username']); //to find post by id and return username from creator

    if (!singlePost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(singlePost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};


//to update file
const updatepost = async(req,res)=>{
  let newpath= null ; //to see if uwe update the file we put new path of the file
  if(req.file){  
    // Destructure original file name from the uploaded file object
    const { originalname,path } = req.file;
  
    // Split the file name by dot to get the extension (e.g., .jpg, .png)
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1]; // Get the last part as extension
  //to get extension of image we use fs or file system
     newpath= path+'.'+ext
  
    fs.renameSync(path,newpath)
    //to save post
  }
  //to check token and grab cookie
  const{token}= req.cookies;
  //verify token
  jwt.verify(token, secret, {}, async(err, info) => 
    {
    
      if (err) return res.status(401).json({ message: "Invalid token" });
    
      const {title,summary,content,id}= req.body
      const Doc = await post.findById(id)
      //check userid is same as sent by client or authenticated user
      //since creator is type of object id so for better comparsion we use JSON.stringify for comparsion
      const isAuthor = JSON.stringify(Doc.creator)===JSON.stringify(info.id)
      //now we check author true and then update the blog
      if(!isAuthor){
        res.status(400).json("You aren't the author")
      }
      // Update document fields
      Doc.title = title;
      Doc.summary = summary;
      Doc.content = content;
      Doc.img = newpath ? newpath : Doc.img;
      await Doc.save();

      res.json({ message: 'Post updated successfully', post: Doc });
  })
}



exports.createpost = createpost;
exports.getpost= getpost;
exports.getPostByPostId=getPostByPostId;
exports.updatepost=updatepost;