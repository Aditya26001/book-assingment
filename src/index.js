const express = require("express");
const connectDB = require("./db/index");
const dotenv = require("dotenv");
const errorHandler = require("./utils/errorHandler");
dotenv.config({path:'./.env'});


const app = express();

connectDB();

app.use(errorHandler)