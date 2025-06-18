const express = require('express')
const Books = require('../models/book')
const Users = require('../models/user')

//add to Cart
const addtoCart = async(req,res)=>{
  try{
    const{id,bookid} = req.headers;
    const userinfo =  await Users.findById(id)
    //to check if the book is in cart
    const isInCart = userinfo.cart.includes(bookid)
    //check if user has the book in favourites
    if(isInCart){
        return res.status(200).json({message:"book already in cart"})
    }

    //update book id in cart
    await Users.findByIdAndUpdate(id,{$push:{cart: bookid }})
    res.status(200).json({message:"book added to cart"})
  }
  catch(err){
    res.status(500).json({messge:"Server Error"})
  }
}


// Delete from cart
const removeFromCart = async(req,res) => {
  try {
    const { id } = req.headers;
    const { bookid } = req.params;
    
    console.log("User ID:", id);
    console.log("Book ID to remove:", bookid);
    
    const userinfo = await Users.findById(id);
    
    if (!userinfo) {
      return res.status(404).json({message: "User not found"});
    }
    
    console.log("User cart:", userinfo.cart);
    
    // Check if the book is in cart - convert all to strings for comparison
    const isInCart = userinfo.cart.some(item => 
      item.toString() === bookid.toString()
    );
    
    // If not in cart, return appropriate message
    if (!isInCart) {
      return res.status(404).json({message: "Book not found in cart"});
    }
    
    // Remove book from cart
    await Users.findByIdAndUpdate(id, {$pull: {cart: bookid}});
    res.status(200).json({message: "Book removed from cart"});
  }
  catch(err) {
    console.log(err);
    res.status(500).json({message: "Server Error"});
  }
}


//get all book from cart
const getcartbooks = async(req,res)=>{
    try{
    const{id}= req.headers;
    //if not done populate it only returns the id but adding populate returns all book information
    const userinfo = await Users.findById(id).populate('cart'); 
    const carts = userinfo.cart.reverse()
    res.status(200).json({data:carts})
    }
    catch(err){
        res.status(500).json({messge:"Server Error"})
      }

}




exports.addtoCart = addtoCart
exports.removeFromCart = removeFromCart
exports.getcartbooks = getcartbooks