const dotenv = require("dotenv");
dotenv.config();

const app = require("./app");
const connectDatabase = require("./config/db");

// Database connection
connectDatabase();

const PORT = process.env.PROD_PORT || process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
