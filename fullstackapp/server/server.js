require("dotenv").config({ path: "./backend/.env" });
const express = require("express");
const axios = require("axios");
// const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

const userRoutes = require("./routes/userRoutes");

// console.log("MongoDB URI:", process.env.MONGO_URI);

app.use(cors()); // Enable CORS for all requests
app.use(bodyParser.json());
app.use("/api/users", userRoutes);


// Connect to MongoDB
// mongoose
//   .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("Failed to connect to MongoDB", err));

  // Routes
app.get("/", (req, res) => {
    res.send("SoundScape Collage Maker backend is running!");
  });

  app.get("/api/deezer", async (req, res) => {
    try {
      const query = req.query.q || "lofi"; // Default query if none provided
      const response = await axios.get(`https://api.deezer.com/search?q=${query}`);
      
      // Allow requests from frontend
      res.set("Access-Control-Allow-Origin", "*");
  
      res.json(response.data);
    } catch (error) {
      console.error("Error fetching from Deezer:", error.message);
      res.status(500).json({ error: "Error fetching data from Deezer" });
    }
  });
  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Export the Express app
module.exports = app;