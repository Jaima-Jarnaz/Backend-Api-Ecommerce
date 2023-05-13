const express=require('express');

// For accessing environment variables in .env file 
const dotenv = require('dotenv');
dotenv.config();


const app = express()
app.use(express.json()) //Used to parse JSON bodies

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.LOCAL_PORT, () => {
  console.log(`Server is listening on port ${process.env.LOCAL_PORT}`)
})