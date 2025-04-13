const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser'); // Fixed the case (cookieParser instead of CookieParser)
const userRoutes = require('./route/user'); // Renamed for clarity

const app = express();

// Middleware
app.use(express.json()); // Parse JSON from request
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));//configure cors with credential support
app.use(cookieParser()); // Moved this before routes
app.use('/uploads', express.static(__dirname + '/uploads'));
//✅ This tells Express to serve files from uploads/ directory. So if an image is saved like and also to server all static file
// Routes
app.use('/api/users', userRoutes);

// Handling Unwanted URLs (Fixed the error handling)
app.use((req, res, next) => {
    res.status(404).json({ message: "Couldn't find the address" });
});

// MongoDB Connection
mongoose.connect('mongodb+srv://kushal:kushal@cluster0.2cew4zy.mongodb.net/Blogs')
    .then(() => {
        app.listen(8000, () => {
            console.log("Server is running on port 8000");
        });
    })
    .catch((error) => {
        console.error("MongoDB Connection Error:", error);
    });
