const express = require("express");
const connectDB = require("./db/index");
const dotenv = require("dotenv");
const errorHandler = require("./utils/errorHandler");
const userRoutes = require('./routes/userRoutes.js')
const bookRoutes = require('./routes/bookRoutes.js')
const transactionRoutes = require('./routes/transactionRoutes.js')
dotenv.config({path:'./.env'});

connectDB();

const app = express();
app.use(express.json());

app.use('/users',userRoutes)
app.use('/books',bookRoutes);
app.use('/transactions',transactionRoutes)

app.use(errorHandler)

const PORT = process.env.PORT||3000
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
    
})