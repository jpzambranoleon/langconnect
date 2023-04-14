const express = require("express");
const cors = require("cors");
const MongooseConnection = require("./utility/mongoose.connection");
const path = require("path");
const helmet = require("helmet");
//const morgan = require("morgan");
require("dotenv").config();

// Create application with express
const app = express();

// Connect to database
MongooseConnection();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
//app.use(morgan("common"));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Backend server is running on ${PORT}`);
});