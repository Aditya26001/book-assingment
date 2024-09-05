const express = require("express");
const connectDB = require("./db/index");
const dotenv = require("dotenv");

dotenv.config({path:'./.env'});
const app = express();

connectDB();