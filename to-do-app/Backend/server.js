const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app= express();
app.use(express.json()); //It parse our data to jason format
app.use(cors());

// variable assigned to sql connection
const db=mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud"
})

// create api
app.get("/",(req, res)=>{
    const sql = "SELECT * FROM student";
    db.query(sql,(err,data)=>{
        if(err) return res.json("Error");
        return res.json(data);
    });
});

//to add data into the task
app.post("/create",(req,res)=>{
    const sql ="INSERT INTO student (`Name`,`Task`) VALUES(?)"; //query to insert data to the database
    //to insert value from the user to values array
    const values=[
        req.body.name,
        req.body.task,
    ]
    //to run db query
    db.query(sql, [values], (err,data)=>{
        if(err) return res.json("Error");
        return res.json(data);
    })
})

// update data 
app.put("/update/:id", (req, res) => {
    const sql = "UPDATE student SET `Name`=?, `Task`=? WHERE ID=?";
    const values = [
        req.body.name,
        req.body.task,
    ];
    const id = req.params.id; // Extract id from req.params

    db.query(sql, [...values, id], (err, data) => {
        if (err) {
            console.error(err); // Log the error for debugging
            return res.json("Error");
        }
        return res.json(data);
    });
});

//delete the task
app.delete("/task/:id", (req, res) => {
    const sql = "DELETE FROM student WHERE ID=?";

    const id = req.params.id; // Extract id from req.params

    db.query(sql, [id], (err, data) => {
        if (err) {
            console.error(err); // Log the error for debugging
            return res.json("Error");
        }
        return res.json(data);
    });
});


app.listen(8081,()=>{
    console.log("listening");
})