const mongoose = require("mongoose");
require('dotenv').config()

const dbConnect = async () => {
  try {
    const dbConnection = mongoose.connect(process.env.DB_CONNECTION_URL);
    if (dbConnection) {
      console.log("Database connection successfull");
    } else {
      console.log("database connection failed");
    }
  } catch (error) {
    console.log("error from db connection error", error);
  }
};

module.exports = { dbConnect };
