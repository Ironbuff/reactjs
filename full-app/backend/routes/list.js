const router = require('express').Router()
//for crud operation we need both user and list 
const User= require("../models/user");
//to get list from modal for crud operation
const List= require("../models/list");
const mongoose =require('mongoose')


//Add task in to-do 
router.post("/addTask",async(req,res)=>{
    try{
        const { title,body,id } =req.body; //since we need to check if user exist to add task in todo-app

    const existingUser= await User.findById(id); //to find wheather user exist

    if(existingUser){
        const list = new List({title, body , user: existingUser});//since we have user we can add the user in add todo task and title
        await list.save().then(()=> res.status(200).json(list)); //it saves the users
        existingUser.list.push( list ); //to update which list updated by which user
        existingUser.save() //to update the list of specific user
    }
    }
    catch(error){
        console.log("error");
    }
})

//update Task
router.put("/updateTask/:id", async (req, res) => { // Corrected the route parameter to use ":id"
    try {
           const {title,body} = req.body; //it loads the title and body from frontend or user
            // Finds a document by its unique ID (from req.params.id) and updates its title and body
            const list = await List.findByIdAndUpdate(req.params.id, { title, body },{new:true});
           res.status(200).json({ message: "Update Successfully" }); // Removed unnecessary save

    } catch (error) {
        console.log(error); // Logging the error
        res.status(500).json({ message: "Error updating task" }); // Added error response
    }
});

// Delete Task
router.delete("/deleteTask/:id", async (req, res) => { 
    try {
        const { id } = req.body; // Extract email from request body
        const existingUser = await User.findByIdAndUpdate(
            id,
            {$pull:{list:req.params.id}}
        ); // Check if the user exists

        if (existingUser) {
            // ✅ Fix: Use `await` properly without `.then()`
            const list = await List.findByIdAndDelete(req.params.id); 

            if (list) {
                res.status(200).json({ message: "Task Deleted" });
            } else {
                res.status(404).json({ message: "Task not found" });
            }
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error deleting task" });
    }
});

//getTask
router.get("/getTasks/:id",async(req,res)=>{
    //-1 shows id generated last
    const list = await List.find({user:req.params.id}).sort({createdAt:-1}); //find all task with user id
    if(list.length !== 0){
        res.status(200).json({ list:list ||[] }) //it will return the task if there is if not it will return an empty array
    }
    else {
        res.status(500).json({message:"Error fetching task"})
    }
})

//getbyid







module.exports = router;//means using router so that it can be export in other files