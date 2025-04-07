const express = require('express');
const app = express();
const list = require("./routes/list");
const connectDB = require("./conn/conn");
const cors = require('cors');

// Add CORS middleware BEFORE your routes
app.use(cors({
    origin: '*',  // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Corrected methods syntax
    allowedHeaders: ['Content-Type', 'Authorization']  // Corrected headers syntax
}));

// Middleware to parse incoming JSON data
app.use(express.json());

// Connect to the database
connectDB();

// Basic test route
app.get("/", (req, res) => {
    res.send("Hello");
});

// Import and use authentication routes
const auth = require("./routes/auth");
app.use("/api/v1", auth);
app.use("/api/v2", list);

app.listen(1000, () => {
    console.log("Server Started on port 1000");
});