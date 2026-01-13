
const express = require('express');
const app = express();
const connDB = require('./conn/conn');
const userRoute = require('../Backend/route/user-route');
require('dotenv').config();

app.use(express.json());
app.use('/auth', userRoute);

// Improved Startup Logic
const start = async () => {
    try {
        await connDB(); // Wait for DB first
        
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`✅ Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("❌ Failed to start server:", error.message);
    }
};

start();

