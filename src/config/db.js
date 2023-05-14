const mongoose = require("mongoose");

function connectDatabase() {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
    })
    .then((result) => {
      console.log("Database connected : ", result.connection.host);
    }).catch((err)=>{
        console.log("Error occurred", err);

    });
}

module.exports = connectDatabase;