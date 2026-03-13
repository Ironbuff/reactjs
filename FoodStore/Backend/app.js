const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Load environment variables first

const connDB = require("./conn/conn");
const userRoute = require("./route/user-route");
const foodRoute = require("./route/food-route");

const app = express();

// 1. CORS MUST BE THE VERY FIRST MIDDLEWARE
const corsOptions = {
  origin: `${process.env.FRONTEND_URL}`,
};

app.use(cors(corsOptions));
// 2. Body parser comes after CORS
app.use(express.json());

// 3. Routes come last
app.get("/", (req, res) => {
  res.send("API is alive");
});

app.use("/auth", userRoute);
app.use("/food", foodRoute);

const start = async () => {
  try {
    await connDB();
    const PORT = process.env.PORT || 8081;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
  }
};

start();
