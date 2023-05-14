const express=require('express');

// For accessing environment variables in .env file 
const dotenv = require('dotenv');
dotenv.config();


const app = express()
app.use(express.json()) //Used to parse JSON bodies

const baseUrl = process.env.NODE_ENV === "production"? process.env.PROD_URL : process.env.BASE_URL;
//routes imports here
const productRoutes = require("./domains/products/route");
//const userRoutes = require("./routes/userRoute");
console.log(productRoutes)

app.use(`${process.env.BASE_URL}/products`, productRoutes);
//app.use(`${api}/user`, userRoutes);



module.exports=app