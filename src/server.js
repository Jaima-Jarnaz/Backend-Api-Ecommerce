const app=require("./app")
const connectDatabase=require("./config/db")

// For accessing environment variables in .env file 
const dotenv = require('dotenv');
dotenv.config();

// Database connection
connectDatabase();

const PORT = process.env.PROD_PORT || process.env.LOCAL_PORT;


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
  })
  