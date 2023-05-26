const express=require('express');
const morgan = require('morgan')
const cors = require('cors');
const productRoutes = require("./domains/products/route");


// For accessing environment variables from .env file 
const dotenv = require('dotenv');
dotenv.config();
const baseUrl = process.env.NODE_ENV === "production"? process.env.PROD_URL : process.env.BASE_URL;


const app = express()
app.use(express.json()) //Used to parse JSON bodies

// HTTP request logger middleware for node.js
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

// Handling CORS issue
app.use(cors());



// All routes defined here
app.use('/products',productRoutes)

app.get('',(req,res)=>{
    res.send('hello')
})



module.exports=app