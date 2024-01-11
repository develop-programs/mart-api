// Importing required Imports
const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const cors = require("cors");
const Products = require("./Routes/Products");
const User = require("./Routes/Auth");
const Orders = require("./Routes/Orders");
const CorsOptios = require("../utils/Optios");

// Adding Required Middlewares
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

// Required Variables
const PORT = process.env.PORT || 5000;
const URI = process.env.MONGO_CLOUD_URI
  ? process.env.MONGO_CLOUD_URI
  : process.env.MONGO_URI_LOCAL;

// Creating async function for Database connection
async function connect() {
  try {
    await mongoose.connect(URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

// Calling function for Database connection
connect()
  // if Database connection is successful then start the server
  .then(() => {
    app.use("/products", cors(CorsOptios), Products);
    app.use("/auth", cors(CorsOptios), User);
    app.use("/orders", cors(CorsOptios), Orders);
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  // if Database connection is not successful then log the error
  .catch(() => {
    console.log("MongoDB connection failed");
  });
