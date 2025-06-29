const express = require('express')
const router = express.Router()
const User = require('../model/user')
const mutler = require('multer')
const upload = mutler({dest:'uploads/'})
const fs = require('fs')
const Clothes = require('../model/clothes')
const clothes = require('../model/clothes')
const { error } = require('console')

const addCloth = async(req,res)=>{
    try{

        const {id} = req.headers;
        const adminUser = await User.findById(id)

        if(adminUser.role!="admin"){
            return res.status(400).json({message:"User isnt the admin and not allowed too acess"})
        }

        if(!req.file){
            return res.status(400).json({message:"File not uploaded"})
        }


        const {originalname,path}= req.file;

        const parts = originalname.split(".")

        const ext = parts[parts.length-1]

        const newpath = path+'.'+ext

        fs.renameSync(path,newpath)

        const {price,description,title,category,seller,discount,quantity} = req.body;

        const newCloth = new Clothes({
            img:newpath,
            price,
            description,
            title,
            category,
            seller,
            discount,
            quantity,
        })
        await newCloth.save()
        return res.status(200).json(newCloth)
    }
    catch(err){
        return res.status(500).json({message:"Server Error",error:err})
    }
}

//update cloth
const update = async(req,res)=>{
    try{
        let newpath = null;

        if(req.file){
            const {originalname,path}= req.file;

            const parts = originalname.split(".")

            const ext = parts[parts.length-1]

            const newpath = path+'.'+ext

            fs.renameSync(path,newpath)
        }

        const {clothid} = req.params;

        const updateCloth = await Clothes.findById(clothid)

        if(!updateCloth){
            return res.status(400).json({message:'Cloth not found'})
        }

        const {price,description,title,category,seller,discount} = req.body;

        updateCloth.img = newpath?newpath:updateCloth.img;
        updateCloth.price = price;
        updateCloth.description= description;
        updateCloth.title = title;
        updateCloth.category= category;
        updateCloth.seller= seller;
        updateCloth.discount= discount;

        await updateCloth.save()

        res.status(200).json(updateCloth)
    }
    catch(err){
          return res.status(500).json({message:"Server Error"})
    }
}

//delete cloth
const removecloth = async(req,res)=>{
    try{
        const{clothid}= req.body;
        await clothes.findByIdAndDelete(clothid)
        return res.status(200).json({message:"Cloth sucessfully deleted"})
    }
    catch(err){
        return res.status(500).json({message:"Server Error",error:err.message})

    }
}

//apply discount functionality
const applydiscount=(clothes)=>{

    if(clothes.discount && clothes.discount>0){
        disamount = (clothes.price*clothes.discount)/100
        return{
            ...clothes._doc,
            discountedprice: parseFloat((clothes.price-disamount).toFixed(2))
        }
    }
    
}

//get clothes
const getclothes = async(req,res)=>{
    try{
        const cloths= await Clothes.find()
        const discountcloth = cloths.map(applydiscount)
        return res.status(200).json(discountcloth)
    }
    catch(err){
        return res.status(500).json({message:"Server Error"})
    }
}

//get clothes by id
const getclothesbyid = async(req,res)=>{
    try{
         const {id}= req.params;
         const cloth = await Clothes.findById(id)
         const discountcloth = applydiscount(cloth)

         if(!discountcloth){
            return res.status(200).json(cloth)
         }
         return res.status(200).json(discountcloth)
    }
    catch(err){

        return res.status(500).json({message:"Server Error"})
    }
        
}

//get latest 4 clothes
const getlatestcloth = async(req,res)=>{
    try{
          const latestcloth = await Clothes.find().sort({createdAt:-1}).limit(4)
          
          return res.status(200).json(latestcloth)
    }
    catch(err){
        return res.status(500).json({message:"Server Error"})
    }
}

//filter by genre
// const filtercloth = async(req,res)=>{
//     try{
           
//     }
//     catch(err){
//           return res.status(500).json({message:"Server Error"})
//     }
// }

exports.update = update
exports.addCloth=addCloth
exports.removecloth=removecloth
exports.getclothes=getclothes
exports.getclothesbyid=getclothesbyid
exports.getlatestcloth=getlatestcloth