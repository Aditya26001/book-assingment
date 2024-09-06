const express = require("express");
const connectDB = require("./db/index");
const dotenv = require("dotenv");
const errorHandler = require("./utils/errorHandler");
dotenv.config({path:'./.env'});

connectDB();

const app = express();
app.use(express.json());




app.use(errorHandler)

const PORT = process.env.PORT||3000
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
    
})