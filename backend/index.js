const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

// Loading environment variables
require("dotenv").config();

const port = process.env.PORT || 3000;
const mongoUrl = process.env.MONGODB_URL;

// Connecting to MongoDB Database
mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log(`Connected to ${mongoUrl}`);
  })
  .catch((err) => {
    console.log(err);
  });

// checking index page
app.get("/", (req, res) => {
  res.send("Hello anchors.in!");
});

// Defining the API routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const postRoutes = require("./routes/post");
app.use("/api/posts", postRoutes);

// Starting the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
