// app.js
const express = require("express");
const mongoose = require("mongoose");
const vehicleRoutes = require("./routes/vehicleRoutes");
require("dotenv").config();
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, please try again later.",
});

const app = express();

// app.use(cors({
//     origin: 'https://nayaraprizecontest.netlify.app',
//     methods: ['GET', 'POST','PUT','PATCH','DELETE'],
//     credentials: true
// }));

app.use(cors());

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(express.json());

const API_VERSION = "v1";

app.use(`/api/${API_VERSION}`, apiLimiter, vehicleRoutes);

// Add after the last `app.use()`
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
