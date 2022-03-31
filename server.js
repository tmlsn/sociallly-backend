const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const { authenticateToken } = require("./middlewares/jwt.middleware");

// connect to the database
mongoose.connect(process.env.MONGO_DB_URL);

// create a new express app
const app = express();

// use cors
app.use(cors());

// making our server accept json requests
app.use(express.json());

// tweet routes
const tweetRoutes = require("./routes/tweet.routes");
app.use("/tweets", authenticateToken, tweetRoutes);

// auth routes
const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

// listen to upcoming requests
app.listen(process.env.PORT);
