const mongoose = require('mongoose');

const conn = async () => {  // Removed (req, res) since it's not needed
   try { 
      await  mongoose.connect("mongodb+srv://kushal:kushal27@cluster0.e3erl.mongodb.net/testing");
       console.log("Connected");
   } catch (error) {
    console.log(error)
       console.error("Not Connected:", error.message); // Changed res.status(400).json to console.error
   }
};

module.exports = conn; // Make sure to export the function


