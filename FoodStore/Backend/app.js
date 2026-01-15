const express = require('express');
const app = express();
const connDB = require('./conn/conn');
const userRoute = require('./route/user-route');
require('dotenv').config();

app.get('/', (req, res) => {
  res.send('API is alive');
});

app.use(express.json());
app.use('/auth', userRoute);

const start = async () => {
  try {
    await connDB();
    const PORT = process.env.PORT || 8081;

    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(' Failed to start server:', error.message);
  }
};

start();
